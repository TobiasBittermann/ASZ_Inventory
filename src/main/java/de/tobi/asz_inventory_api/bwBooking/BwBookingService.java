package de.tobi.asz_inventory_api.bwBooking;

import de.tobi.asz_inventory_api.bwDeposit.BwDeposit;
import de.tobi.asz_inventory_api.drink.Drink;
import de.tobi.asz_inventory_api.drink.DrinkCsvRepository;
import de.tobi.asz_inventory_api.member.Member;
import de.tobi.asz_inventory_api.member.MemberCsvRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.accept.MediaTypeFileExtensionResolver;

import java.io.IOException;
import java.util.List;

@Service
public class BwBookingService {
    private final BwBookingCsvRepository repository;
    private final MemberCsvRepository memberRepository;
    private final DrinkCsvRepository drinkRepository;
    private final String filePath;
    private final String memberFilePath;
    private final String drinkFilePath;


    public BwBookingService(BwBookingCsvRepository repository,
                            MemberCsvRepository memberRepository,
                            DrinkCsvRepository drinkRepository,
                            @Value("CSV/bwbookings.csv") String filePath,
                            @Value("CSV/members.csv") String memberFilePath,
                            @Value("CSV/drinks.csv") String drinkFilePath) {
        this.repository = repository;
        this.memberRepository = memberRepository;
        this.drinkRepository = drinkRepository;
        this.filePath = filePath;
        this.memberFilePath = memberFilePath;
        this.drinkFilePath = drinkFilePath;
    }

    public List<BwBooking> getAllBwBookings() throws IOException {
        return repository.getAllBwBookings(filePath);
    }

    public void addBwBooking(BwBooking booking) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        long nextId = bookings.stream()
                .mapToLong(BwBooking::getId)
                .max()
                .orElse(0) + 1;

        booking.setId(nextId);

        repository.addBwBooking(bookings, booking);
        repository.saveBwBooking(filePath, bookings);

        changeBalance(booking, 0, "add");
    }

    public void updateBwBooking(long id, BwBooking booking) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        BwBooking oldBooking = bookings.stream().filter(b -> b.getId() == id).findAny().orElseThrow();


        booking.setId(id);

        repository.updateBwBooking(bookings, booking);
        repository.saveBwBooking(filePath, bookings);

        changeBalance(booking, oldBooking.getAmountDrink(), "update");

    }

    public void deleteBwBooking(long id) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        repository.deleteBwBooking(bookings, id);
        repository.saveBwBooking(filePath, bookings);

        BwBooking booking = bookings.stream().filter(b -> b.getId() == id).findAny().orElseThrow();
        changeBalance(booking,0,"delete");

    }


    private void changeBalance(BwBooking booking, double oldAmountDrinks, String actionType) throws IOException {
        List<Member> members = memberRepository.getAllMembers(memberFilePath);
        List<Drink> drinks = drinkRepository.getAllDrinks(drinkFilePath);

        Member member = members.stream().filter(m -> m.getId() == booking.getMemberId()).findAny().orElseThrow();
        Drink drink = drinks.stream().filter(d -> d.getId() == booking.getDrinkId()).findAny().orElseThrow();

        double price = booking.getAmountDrink() * drink.getSellingPrice();

        switch (actionType) {
            case "add":
                break;
            case "update":
                price = price - (oldAmountDrinks * drink.getSellingPrice());
                break;
            case "delete":
                price = -price;
                break;
        }

        member.setBalance(member.getBalance() - price);

        memberRepository.updateMember(members, member);
        memberRepository.saveMembers(memberFilePath, members);
    }
}
