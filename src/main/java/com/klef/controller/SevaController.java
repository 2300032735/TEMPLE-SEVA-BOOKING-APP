package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.entity.SevaBooking;
import com.klef.service.SevaBookingService;

@RestController
@RequestMapping("/sevaapi") 
@CrossOrigin(origins = "*") // allow requests from any frontend
public class SevaController {

    @Autowired
    private SevaBookingService sevaBookingService;

    // Root endpoint
    @GetMapping("/")
    public String home() {
        return "Seva Booking API is running!";
    }

    // Add a new SevaBooking
    @PostMapping("/add")
    public ResponseEntity<SevaBooking> addSevaBooking(@RequestBody SevaBooking sevaBooking) {
        SevaBooking savedBooking = sevaBookingService.addSevaBooking(sevaBooking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    // Get all SevaBookings
    @GetMapping("/all")
    public ResponseEntity<List<SevaBooking>> getAllSevaBookings() {
        List<SevaBooking> bookings = sevaBookingService.getAllSevaBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Get SevaBooking by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSevaBookingById(@PathVariable int id) {
        SevaBooking booking = sevaBookingService.getSevaBookingById(id);
        if (booking != null) {
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("SevaBooking with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Update SevaBooking
    @PutMapping("/update")
    public ResponseEntity<?> updateSevaBooking(@RequestBody SevaBooking sevaBooking) {
        SevaBooking existing = sevaBookingService.getSevaBookingById(sevaBooking.getId());
        if (existing != null) {
            SevaBooking updatedBooking = sevaBookingService.updateSevaBooking(sevaBooking);
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. SevaBooking with ID " + sevaBooking.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete SevaBooking
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSevaBooking(@PathVariable int id) {
        SevaBooking existing = sevaBookingService.getSevaBookingById(id);
        if (existing != null) {
            sevaBookingService.deleteSevaBookingById(id);
            return new ResponseEntity<>("SevaBooking with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. SevaBooking with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
