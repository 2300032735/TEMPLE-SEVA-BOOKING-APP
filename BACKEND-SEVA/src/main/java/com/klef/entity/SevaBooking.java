package com.klef.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seva_booking_table")
public class SevaBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int id;

    @Column(name = "devotee_name", nullable = false, length = 50)
    private String devoteeName;

    @Column(name = "temple_name", nullable = false, length = 100)
    private String templeName;

    @Column(name = "seva_type", nullable = false, length = 50)
    private String sevaType;

    @Column(name = "booking_date", nullable = false, length = 20)
    private String bookingDate;

    @Column(name = "time_slot", nullable = false, length = 20)
    private String timeSlot;

    @Column(name = "contact_number", nullable = false, unique = true, length = 20)
    private String contactNumber;

    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "amount", nullable = false)
    private double amount;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getDevoteeName() { return devoteeName; }
    public void setDevoteeName(String devoteeName) { this.devoteeName = devoteeName; }

    public String getTempleName() { return templeName; }
    public void setTempleName(String templeName) { this.templeName = templeName; }

    public String getSevaType() { return sevaType; }
    public void setSevaType(String sevaType) { this.sevaType = sevaType; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
