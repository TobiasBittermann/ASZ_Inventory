package de.tobi.asz_inventory_api.bwBooking;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.accept.MediaTypeFileExtensionResolver;

import java.io.IOException;
import java.util.List;

@Service
public class BwBookingService {
    private final BwBookingCsvRepository repository;
    private final MediaTypeFileExtensionResolver mediaTypeFileExtensionResolver;
    private String filePath;

    public BwBookingService(BwBookingCsvRepository repository, @Value("CSV/bwbookings,csv") String filePath, MediaTypeFileExtensionResolver mediaTypeFileExtensionResolver) {
        this.repository = repository;
        this.filePath = filePath;
        this.mediaTypeFileExtensionResolver = mediaTypeFileExtensionResolver;
    }

    public List<BwBooking> getAllBwBookings() throws IOException {
        return repository.getAllBwBookings(filePath);
    }

    public void addBwBooking(BwBooking booking) throws IOException {
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        long nextId = bookings.stream()
                .mapToLong(BwBooking::getDrinkId)
                .max()
                .orElse(0) + 1;

        booking.setId(nextId);

        repository.addBwBooking(bookings, booking);
        repository.saveBwBooking(filePath,bookings);
    }

    public void updateBwBooking(long id, BwBooking booking) throws IOException{
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        booking.setId(id);

        repository.updateBwBooking(bookings, booking);
        repository.saveBwBooking(filePath, bookings);
    }

    public void deleteBwBooking(long id) throws IOException{
        List<BwBooking> bookings = repository.getAllBwBookings(filePath);

        repository.deleteBwBooking(bookings, id);
        repository.saveBwBooking(filePath, bookings);
    }

}
