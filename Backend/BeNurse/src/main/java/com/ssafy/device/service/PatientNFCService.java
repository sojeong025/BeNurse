package com.ssafy.device.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.device.model.PatientNFC;

@Service
public class PatientNFCService {

	@Autowired
	PatientNFCRepository pnRepo;
	
	@Cacheable(value = "patientNFC", key = "#ID")
	public PatientNFC findById(String ID) {
		Optional<PatientNFC> option = pnRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "patientNFC", key="#patientNFC.ID")
	public PatientNFC save(PatientNFC patientNFC) {
		try {
			if(patientNFC.getID() == null)
				throw new NullPointerException();
			PatientNFC exist = findById(patientNFC.getID());
			return pnRepo.save(patientNFC);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "patientNFC", key = "#ID")
	public void delete(String ID) {
		try {
			PatientNFC patientNFC = findById(ID);
			pnRepo.delete(patientNFC);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
}
