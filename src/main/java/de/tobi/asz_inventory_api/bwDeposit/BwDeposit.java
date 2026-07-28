package de.tobi.asz_inventory_api.bwDeposit;

import java.time.LocalDateTime;

public class BwDeposit {
    private long id;
    private long memberId;
    private double deposit;
    private LocalDateTime depositDate;
    private String description;

    public BwDeposit() {
    }

    public BwDeposit(BwDeposit other){
        this.id = other.id;
        this.memberId = other.memberId;
        this.deposit = other.deposit;
        this.depositDate = other.depositDate;
        this.description = other.description;
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

    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(double deposit) {
        this.deposit = deposit;
    }

    public LocalDateTime getDepositDate() {
        return depositDate;
    }

    public void setDepositDate(LocalDateTime depositDate) {
        this.depositDate = depositDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void updateFrom(BwDeposit bwDeposit){
        this.id = bwDeposit.id;
        this.memberId = bwDeposit.memberId;
        this.deposit = bwDeposit.deposit;
        this.depositDate = bwDeposit.depositDate;
        this.description = bwDeposit.description;
    }
}
