package com.ssafy.Handover.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.Handover.model.Handover;

@Service
public class HandoverService {
	
	@Autowired
	HandoverRepository handoverRepo;
	
	@Autowired
	HandoverListRepository listRepo;
	
	@Autowired
	HandoverContentRepository contentRepo;
	
	@Cacheable(value = "handover", key = "#ID")
	public Handover findById(long ID) {
		Optional<Handover> option = handoverRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CacheEvict(value = "handover", key = "#ID")
	public void delete(long ID) {
		try {
			Handover handover = findById(ID);
			contentRepo.deleteAllByHandoverID(ID);
			listRepo.deleteByHandoverID(ID);
			handoverRepo.delete(handover);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
