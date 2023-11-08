package com.ssafy.hospital.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.hospital.model.Hospital;

@Service
public class HospitalService {
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@Cacheable(value = "hospital", key = "#ID")
	public Hospital findById(long ID) {
		Optional<Hospital> option = hospitalRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "hospital", key="#hospital.ID")
	public Hospital save(Hospital hospital) {
		try {
			Hospital exist = findById(hospital.getID());
			if(hospital.getID() == 0)
				throw new NullPointerException();
			return hospitalRepo.save(hospital);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "hospital", key = "#ID")
	public void delete(long ID) {
		try {
			Hospital hospital = findById(ID);
			hospitalRepo.delete(hospital);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
