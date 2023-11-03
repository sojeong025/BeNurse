package com.ssafy.notice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ssafy.notice.model.Notice;

@Service
public class NoticeService {
	
	@Autowired
	NoticeRepository noticeRepo;

	@Cacheable(value="notice")
	public List<Notice> findAll(){
		return noticeRepo.findAll();
	}
	
	
	public Optional<Notice> findById(long ID) {
		return noticeRepo.findById(ID);
	}
}
