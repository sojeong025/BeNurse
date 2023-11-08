package com.ssafy.Handover.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.Handover.model.MyHandover;

@Service
public class MyHandoverService {
	@Autowired
	MyHandoverRepository myHandoverRepo;
	
	@Cacheable(value = "myHandover", key = "#ID")
	public MyHandover findById(long ID) {
		Optional<MyHandover> option = myHandoverRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "myHandover", key="#myHandover.ID")
	public MyHandover save(MyHandover myHandover) {
		try {
			if(myHandover.getID() == 0)
				throw new NullPointerException();
			MyHandover exist = findById(myHandover.getID());
			return myHandoverRepo.save(myHandover);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "myHandover", key = "#ID")
	public void delete(long ID) {
		try {
			MyHandover myHandover = findById(ID);
			myHandoverRepo.delete(myHandover);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
