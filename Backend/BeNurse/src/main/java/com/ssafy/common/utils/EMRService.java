package com.ssafy.common.utils;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.emr.model.Journal;

@FeignClient(name="EMRClient", url="k9e105.p.ssafy.io:9003/api/emr")
public interface EMRService {

	@GetMapping(value="/journal")
	ResponseEntity<Journal> getJournalByID(@RequestParam("id") long id);
	
	@PostMapping(value="/journal")
	ResponseEntity<Void> registJournalById(@RequestBody Journal journal);

	@GetMapping(value="/journal/all")
	ResponseEntity<List<Journal>> getAllJournal();
}
