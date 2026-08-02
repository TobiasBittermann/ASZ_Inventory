package de.tobi.asz_inventory_api.bwBooking;

import de.tobi.asz_inventory_api.bwDeposit.BwDeposit;
import de.tobi.asz_inventory_api.drink.Drink;
import de.tobi.asz_inventory_api.drink.DrinkCsvRepository;
import de.tobi.asz_inventory_api.drink.DrinkService;
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
                            @Value("${app.bwbookings.csv-path}") String filePath,
                            @Value("${app.members.csv-path}") String memberFilePath,
                            @Value("${app.drinks.csv-path}") String drinkFilePath) {
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

        changeBalance(booking, false);
        changeAmountDrinks(booking, false);
    }

    public void updateBwBooking(long id, BwBooking booking) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        BwBooking oldBooking = bookings.stream().filter(b -> b.getId() == id).findAny().orElseThrow();

        changeAmountDrinks(oldBooking, true);
        changeBalance(oldBooking, true);

        booking.setId(id);

        repository.updateBwBooking(bookings, booking);
        repository.saveBwBooking(filePath, bookings);

        changeAmountDrinks(booking, false);
        changeBalance(booking, false);
    }

    public void deleteBwBooking(long id) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        BwBooking booking = bookings.stream().filter(b -> b.getId() == id).findAny().orElseThrow();

        repository.deleteBwBooking(bookings, id);
        repository.saveBwBooking(filePath, bookings);

        changeBalance(booking, true);
        changeAmountDrinks(booking, true);
    }


    private void changeBalance(BwBooking booking, boolean x) throws IOException {
        List<Member> members = memberRepository.getAllMembers(memberFilePath);
        List<Drink> drinks = drinkRepository.getAllDrinks(drinkFilePath);

        Member member = members.stream().filter(m -> m.getId() == booking.getMemberId()).findAny().orElseThrow();
        Drink drink = drinks.stream().filter(d -> d.getId() == booking.getDrinkId()).findAny().orElseThrow();

        double price = booking.getBookingCost();

        if (x){
            price = -price;
        }

        member.setBalance(member.getBalance() - price);

        memberRepository.updateMember(members, member);
        memberRepository.saveMembers(memberFilePath, members);
    }

    private void changeAmountDrinks(BwBooking booking, boolean x) throws IOException {
        List<Drink> drinks = drinkRepository.getAllDrinks(drinkFilePath);

        Drink drink = drinks.stream().filter(d -> d.getId() == booking.getDrinkId()).findAny().orElseThrow();

        int amount = booking.getAmountDrink();

        if (x) {
            amount = -amount;
        }

        drink.setAmount(drink.getAmount() - amount);

        drinkRepository.updateDrink(drinks, drink);
        drinkRepository.saveDrinks(drinkFilePath, drinks);
    }
}
