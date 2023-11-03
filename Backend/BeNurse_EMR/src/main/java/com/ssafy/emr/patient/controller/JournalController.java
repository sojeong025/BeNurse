package com.ssafy.emr.patient.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.emr.common.utils.APIResponse;
import com.ssafy.emr.patient.model.Journal;
import com.ssafy.emr.patient.service.JournalRepository;
import com.ssafy.emr.patient.utils.JournalSearchCondition;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "EMR 간호일지 정보 API", tags = { "Journal." })
@RestController
@RequestMapping("/api/emr/journal")
@Slf4j
public class JournalController {
	@Autowired
	JournalRepository journalRepo;
	
	@PostMapping("")
	@ApiOperation(value = "간호일지 정보 등록", notes = "<strong>간호일지 객체</strong>를 통해 간호일지 정보를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> registJournalById(Journal journal) {
		log.info(journal.toString());
		journal.setDatetime(LocalDateTime.now());
		journalRepo.save(journal);
		return new APIResponse(HttpStatus.CREATED);
	}
	
	@GetMapping("")
	@ApiOperation(value = "간호일지 정보 조회", notes = "<strong>간호일지 ID</strong>를 통해 간호일지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Journal.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Journal> getJournalById(@RequestParam("id") long id) {
		Optional<Journal> journal = journalRepo.findById(id);
		if (journal.isPresent())
			return new APIResponse(journal.get(), HttpStatus.OK);
		else
			return new APIResponse(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/all")
	@ApiOperation(value = "모든 간호일지 조회", notes = "모든 간호일지 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Journal>> getAllJournal() {
		List<Journal> journals = journalRepo.findAll();
		return new APIResponse(journals, HttpStatus.OK);
	}
	
	@GetMapping("/search")
	@ApiOperation(value = "간호일지 검색", notes = "조건에 따른 간호일지 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Journal>> searchJournal(JournalSearchCondition search){
		List<Journal> resp;
		
		if(search.getCategory() == null)
			resp = journalRepo.findAllByDatetimeGreaterThanEqualAndDatetimeLessThanEqualAndPatientID(search.getTime().minusDays(1), search.getTime(), search.getPatientID());
		else
			resp = journalRepo.findAllByDatetimeGreaterThanEqualAndDatetimeLessThanEqualAndPatientIDAndCategory(search.getTime().minusDays(1), search.getTime(), search.getPatientID(), search.getCategory());
		return new APIResponse(resp, HttpStatus.OK);
	}
	
	@PutMapping("")
	@ApiOperation(value = "간호일지 정보 수정", notes = "간호일지 정보를 수정한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<Void> updateJournal(Journal journal){
		Optional<Journal> found = journalRepo.findById(journal.getID());
		if(found.isPresent()) {
			journalRepo.save(journal);
			return new APIResponse(HttpStatus.OK);
		}
		else {
			return new APIResponse(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "간호일지 정보 삭제", notes = "<strong>간호일지 ID</strong>로 간호일지 정보를 삭제한다.")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<Void> deleteJournal(@RequestParam("id") long id){
		Optional<Journal> found = journalRepo.findById(id);
		if(found.isPresent()) {
			journalRepo.delete(found.get());
			return new APIResponse(HttpStatus.OK);
		}
		else {
			return new APIResponse(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/patient")
	@ApiOperation(value = "환자 간호일지 삭제", notes = "<strong>환자 ID</strong>로 환자에 대한 간호일지들을 삭제한다.")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<Void> deleteJournalByPatientID(@RequestParam("id") long patient_id){
		List<Journal> found = journalRepo.findAllByPatientID(patient_id);
		for(Journal j : found) {
			journalRepo.delete(j);
		}
		return new APIResponse(HttpStatus.OK);
	}
}
