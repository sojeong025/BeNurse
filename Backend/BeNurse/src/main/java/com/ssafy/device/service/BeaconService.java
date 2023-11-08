package com.ssafy.device.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.device.model.Beacon;

@Service
public class BeaconService {
	@Autowired
	BeaconRepository beaconRepo;
	
	@Cacheable(value = "beacon", key = "#ID")
	public Beacon findById(String ID) {
		Optional<Beacon> option = beaconRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "beacon", key="#beacon.ID")
	public Beacon save(Beacon beacon) {
		try {
			if(beacon.getID() == null)
				throw new NullPointerException();
			Beacon exist = findById(beacon.getID());
			return beaconRepo.save(beacon);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "beacon", key = "#ID")
	public void delete(String ID) {
		try {
			Beacon beacon = findById(ID);
			beaconRepo.delete(beacon);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
