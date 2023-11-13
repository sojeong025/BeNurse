package com.ssafy.common.schedule;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ssafy.Handover.model.HandoverSet;
import com.ssafy.Handover.service.HandoverSetRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ScheduledService {
	@Autowired
	HandoverSetRepository handoverSetRepo;
	
	
	@Scheduled(cron = "0 0 13 * * *", zone = "Asia/Seoul")
	public void removeEmptySet() {
		List<HandoverSet> sets = handoverSetRepo.findEmptySets();
		for(HandoverSet set : sets) {
			log.info("DELETE : " + set.toString());
			handoverSetRepo.delete(set);
		}
	}
}
