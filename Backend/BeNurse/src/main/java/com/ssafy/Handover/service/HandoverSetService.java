package com.ssafy.Handover.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.Handover.model.HandoverSet;

@Service
public class HandoverSetService {
	@Autowired
	HandoverSetRepository handoverSetRepo;
	
	@Cacheable(value = "handoverSet", key = "#ID")
	public HandoverSet findById(long ID) {
		Optional<HandoverSet> option = handoverSetRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "handoverSet", key="#handoverSet.ID")
	public HandoverSet save(HandoverSet handoverSet) {
		try {
			if(handoverSet.getID() == 0)
				throw new NullPointerException();
			HandoverSet exist = findById(handoverSet.getID());
			return handoverSetRepo.save(handoverSet);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "handoverSet", key = "#ID")
	public void delete(long ID) {
		try {
			HandoverSet handoverSet = findById(ID);
			handoverSetRepo.delete(handoverSet);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
