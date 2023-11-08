package com.ssafy.hospital.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.hospital.model.Ward;

@Service
public class WardService {
	
	@Autowired
	WardRepository wardRepo;
	
	@Cacheable(value = "ward", key = "#ID")
	public Ward findById(long ID) {
		Optional<Ward> option = wardRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "ward", key="#ward.ID")
	public Ward save(Ward ward) {
		try {
			if(ward.getID() == 0)
				throw new NullPointerException();
			Ward exist = findById(ward.getID());
			return wardRepo.save(ward);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "ward", key = "#ID")
	public void delete(long ID) {
		try {
			Ward ward = findById(ID);
			wardRepo.delete(ward);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
