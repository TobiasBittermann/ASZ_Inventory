package de.tobi.asz_inventory_api.bwBooking;

import java.time.LocalDateTime;

public class BwBooking {
    public long id;
    public long memberId;
    public long drinkId;
    public int amountDrink;
    public LocalDateTime bookingDate;

    public BwBooking() {
    }

    public BwBooking(BwBooking other) {
        this.id = other.id;
        this.memberId = other.memberId;
        this.drinkId = other.drinkId;
        this.amountDrink = other.amountDrink;
        this.bookingDate = other.bookingDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getMemberId() {
        return memberId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public long getDrinkId() {
        return drinkId;
    }

    public void setDrinkId(long drinkId) {
        this.drinkId = drinkId;
    }

    public int getAmountDrink() {
        return amountDrink;
    }

    public void setAmountDrink(int amountDrink) {
        this.amountDrink = amountDrink;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void updateFrom(BwBooking bwBooking) {
        this.id = bwBooking.id;
        this.memberId = bwBooking.memberId;
        this.drinkId = bwBooking.drinkId;
        this.amountDrink = bwBooking.amountDrink;
        this.bookingDate = bwBooking.bookingDate;
    }
}

