package com.ssafy.nurse.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.nurse.model.Nurse;

@Service
public class NurseService {

	@Autowired
	NurseRepository nurseRepo;
	
	@Cacheable(value = "nurse", key = "#ID")
	public Nurse findById(long ID) {
		Optional<Nurse> option = nurseRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "nurse", key="#nurse.ID")
	public Nurse save(Nurse nurse) {
		try {
			if(nurse.getID() == 0)
				throw new NullPointerException();
			Nurse exist = findById(nurse.getID());
			return nurseRepo.save(nurse);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "nurse", key = "#ID")
	public void delete(long ID) {
		try {
			Nurse nurse = findById(ID);
			nurseRepo.delete(nurse);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
}
