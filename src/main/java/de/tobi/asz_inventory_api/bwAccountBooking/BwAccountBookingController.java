package de.tobi.asz_inventory_api.bwAccountBooking;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class BwAccountBookingController {

    private final BwAccountBookingService bookingService;

    public BwAccountBookingController(BwAccountBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("CSV/bwaccountbookings")
    public List<BwAccountBooking> getAllBwAccountBookings() throws IOException {
        return bookingService.getAllBwAccountBookings();
    }

    @PostMapping("CSV/bwaccountbookings")
    public void addBwAccountBooking(@RequestBody BwAccountBooking booking) throws IOException {
        bookingService.addBwAccountBooking(booking);
    }

    @PutMapping("CSV/bwaccountbookings/{id}")
    public void updateBwAccountBooking(@PathVariable long id, @RequestBody BwAccountBooking booking) throws IOException {
        bookingService.updateBwAccountBooking(id, booking);
    }

    @DeleteMapping("CSV/bwaccountbookings/{id}")
    public void deleteBwAccountBooking(@PathVariable long id) throws IOException {
        bookingService.deleteBwAccountBooking(id);
    }
}
