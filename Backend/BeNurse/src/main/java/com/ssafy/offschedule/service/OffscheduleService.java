package com.ssafy.offschedule.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.Schedule.model.Schedule;
import com.ssafy.offschedule.model.Offschedule;

@Service
public class OffscheduleService {

	@Autowired
	OffscheduleRepository osRepo;
	
	@Cacheable(value = "offschedule", key = "#ID")
	public Offschedule findById(long ID) {
		Optional<Offschedule> option = osRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "offschedule", key="#schedule.ID")
	public Offschedule save(Offschedule offschedule) {
		try {
			if(offschedule.getID() == 0)
				throw new NullPointerException();
			Offschedule exist = findById(offschedule.getID());
			return osRepo.save(offschedule);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "offschedule", key = "#ID")
	public void delete(long ID) {
		try {
			Offschedule offschedule = findById(ID);
			osRepo.delete(offschedule);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
}
