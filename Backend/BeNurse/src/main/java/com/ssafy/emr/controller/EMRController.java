package com.ssafy.emr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.UserClient;
import com.ssafy.emr.model.Journal;
import com.ssafy.emr.service.EMRService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;


@CrossOrigin(origins = "*")
@Api(value = "EMR API", tags = { "EMR." })
@RestController
@RequestMapping("/api/benurse/EMR")
@Slf4j
public class EMRController {

	@Autowired
	EMRService emrService;
	
	@Autowired
	UserClient userClient;
	
	@PostMapping("")
	@ApiOperation(value = "간호일지 정보 등록", notes = "<strong>간호일지 객체</strong>를 통해 간호일지 정보를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Void> registJournalById(Journal journal) {
		return emrService.registJournalById(journal);
	}
	
	//
	@GetMapping("/journal/all")
	@ApiOperation(value = "간호일지 정보 등록", notes = "<strong>간호일지 객체</strong>를 통해 간호일지 정보를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<Journal>> getAllJournal() {
		return emrService.getAllJournal();
	}
	
	@GetMapping("/journal")
	public ResponseEntity<Journal> test(@RequestParam("id") long id){
		log.info(String.valueOf(id));
		
		
		return ResponseEntity.status(HttpStatus.OK).body(userClient.getJournalByID(id));
	}
}
