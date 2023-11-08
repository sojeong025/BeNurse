package com.ssafy.device.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.device.model.NFC;

@Service
public class NFCService {

	@Autowired
	NFCRepository nfcRepo;
	
	@Cacheable(value = "nfc", key = "#ID")
	public NFC findById(String ID) {
		Optional<NFC> option = nfcRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "nfc", key="#nfc.ID")
	public NFC save(NFC nfc) {
		try {
			if(nfc.getID() == null)
				throw new NullPointerException();
			NFC exist = findById(nfc.getID());
			return nfcRepo.save(nfc);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "nfc", key = "#ID")
	public void delete(String ID) {
		try {
			NFC nfc = findById(ID);
			nfcRepo.delete(nfc);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
}
