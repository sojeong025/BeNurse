package com.ssafy.PatientWard.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.PatientWard.model.PatientWard;

@Service
public class PatientWardService {

	@Autowired
	PatientWardRepository pwRepo;
	
	@Cacheable(value = "patientWard", key = "#ID")
	public PatientWard findById(long ID) {
		Optional<PatientWard> option = pwRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "patientWard", key="#patientWard.ID")
	public PatientWard save(PatientWard patientWard) {
		try {
			if(patientWard.getID() == 0)
				throw new NullPointerException();
			PatientWard exist = findById(patientWard.getID());
			return pwRepo.save(patientWard);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "patientWard", key = "#ID")
	public void delete(long ID) {
		try {
			PatientWard patientWard = findById(ID);
			pwRepo.delete(patientWard);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
}
