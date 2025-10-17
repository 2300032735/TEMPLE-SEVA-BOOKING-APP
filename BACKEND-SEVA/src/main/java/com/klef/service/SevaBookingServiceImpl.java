package com.klef.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.entity.SevaBooking;
import com.klef.repository.SevaBookingRepository;

@Service
public class SevaBookingServiceImpl implements SevaBookingService {

    @Autowired
    private SevaBookingRepository sevaBookingRepository;

    @Override
    public SevaBooking addSevaBooking(SevaBooking sevaBooking) {
        return sevaBookingRepository.save(sevaBooking);
    }

    @Override
    public List<SevaBooking> getAllSevaBookings() {
        return sevaBookingRepository.findAll();
    }

    @Override
    public SevaBooking getSevaBookingById(int id) {
        Optional<SevaBooking> opt = sevaBookingRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public SevaBooking updateSevaBooking(SevaBooking sevaBooking) {
        return sevaBookingRepository.save(sevaBooking);
    }

    @Override
    public void deleteSevaBookingById(int id) {
        sevaBookingRepository.deleteById(id);
    }
}
