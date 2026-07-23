package de.tobi.asz_inventory_api.model;

/**
 * Represents a member with basic personal data and an account balance.
 */
public class Member {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private double balance;

    /**
     * Creates an empty member.
     */
    public Member() {
    }

    /**
     * Creates a copy of an existing member.
     *
     * @param other the member to copy values from
     */
    public Member(Member other) {
        this.id = other.id;
        this.firstName = other.firstName;
        this.lastName = other.lastName;
        this.email = other.email;
        this.balance = other.balance;
    }

    /**
     * Returns the member id.
     *
     * @return the member id
     */
    public long getId() {
        return id;
    }

    /**
     * Sets the member id.
     *
     * @param id the new member id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Returns the first name.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name.
     *
     * @param firstName the new first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Returns the last name.
     *
     * @return the last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name.
     *
     * @param lastName the new last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Returns the email address.
     *
     * @return the email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address.
     *
     * @param email the new email address
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns the current balance.
     *
     * @return the current balance
     */
    public double getBalance() {
        return balance;
    }

    /**
     * Sets the current balance.
     *
     * @param balance the new balance
     */
    public void setBalance(double balance) {
        this.balance = balance;
    }

    /**
     * Updates this member with the values from another member.
     *
     * @param member the member to copy values from
     */
    public void updateFrom(Member member) {
        this.firstName = member.firstName;
        this.lastName = member.lastName;
        this.email = member.email;
        this.balance = member.balance;
    }
}
