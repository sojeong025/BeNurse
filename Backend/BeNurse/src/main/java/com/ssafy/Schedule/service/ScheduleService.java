package com.ssafy.Schedule.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.Schedule.model.Schedule;

@Service
public class ScheduleService {
	
	@Autowired
	ScheduleRepository scheduleRepo;
	
	@Cacheable(value = "schedule", key = "#ID")
	public Schedule findById(long ID) {
		Optional<Schedule> option = scheduleRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "schedule", key="#schedule.ID")
	public Schedule save(Schedule schedule) {
		try {
			if(schedule.getID() == 0)
				throw new NullPointerException();
			Schedule exist = findById(schedule.getID());
			return scheduleRepo.save(schedule);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "schedule", key = "#ID")
	public void delete(long ID) {
		try {
			Schedule schedule = findById(ID);
			scheduleRepo.delete(schedule);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
