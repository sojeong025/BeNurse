package com.ssafy.device.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.device.model.Device;
import com.ssafy.device.service.DeviceRepository;

@Service
public class DeviceService {
	
	@Autowired
	DeviceRepository deviceRepo;
	
	@Cacheable(value = "device", key = "#ID")
	public Device findById(String ID) {
		Optional<Device> option = deviceRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "device", key="#device.ID")
	public Device save(Device device) {
		try {
			if(device.getID() == null)
				throw new NullPointerException();
			Device exist = findById(device.getID());
			return deviceRepo.save(device);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "device", key = "#ID")
	public void delete(String ID) {
		try {
			Device device = findById(ID);
			deviceRepo.delete(device);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
}
