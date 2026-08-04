package de.tobi.asz_inventory_api.bwAccountBooking;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BwAccountBooking {
    private long id;
    private long supplierId;
    private BigDecimal amount;
    private String invoiceNumber;
    private LocalDateTime date;
    private String note;

    public BwAccountBooking(){}

    public BwAccountBooking(BwAccountBooking other){
        this.id = other.id;
        this.supplierId = other.supplierId;
        this.amount = other.amount;
        this.invoiceNumber = other.invoiceNumber;
        this.date = other.date;
        this.note = other.note;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(long supplierId) {
        this.supplierId = supplierId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void updateFrom(BwAccountBooking booking){
        this.id = booking.id;
        this.supplierId = booking.supplierId;
        this.amount = booking.amount;
        this.invoiceNumber = booking.invoiceNumber;
        this.date = booking.date;
        this.note = booking.note;
    }
}
