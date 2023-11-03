package com.ssafy.emr.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.emr.model.CC;
import com.ssafy.emr.model.Journal;
import com.ssafy.emr.model.Patient;
import com.ssafy.emr.model.PatientResponse;
import com.ssafy.emr.utils.JournalSearchCondition;

@FeignClient(name="EMRClient", url="k9e105.p.ssafy.io:9003/api/emr")
public interface EMRService {

	/* 간호일지 Journal 6ea */
	
	// 간호일지 정보 조회 GET
	@GetMapping(value="/journal")
	APIResponse<Journal> getJournalByID(@RequestParam("id") long id);

	// 간호일지 정보 등록 POST
	@PostMapping(value="/journal", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	APIResponse<Void> registJournalById(@RequestBody Journal journal);

	// 모든 간호일지 조회 GET
	@GetMapping(value="/journal/all")
	APIResponse<List<Journal>> getAllJournal();
	
	// 환자 간호일지 삭제 DELETE
	@DeleteMapping(value="/journal/patient")
	APIResponse<Void> deleteJournalByPatientID(@RequestParam("id") long patient_id);

	// 간호일지 정보 수정 PUT
	@PutMapping(value="/journal", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	APIResponse<Void> updateJournal(Journal journal);

	// 간호일지 삭제 DELETE
	@DeleteMapping(value="/journal")
	APIResponse<Void> deleteJournal(@RequestParam("id") long id);
	
	// 간호일지 검색 GET
	@GetMapping(value="/journal/search")
	APIResponse<List<Journal>> searchJournal(@SpringQueryMap JournalSearchCondition search);

	/* 주호소 CC 2ea */
	
	// 주호소 등록 POST
	@PostMapping(value="/cc", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	APIResponse<Void> registPatientById(CC cc);
	
	// 주호소 삭제 DELETE
	@DeleteMapping(value="/cc")
	APIResponse<Void> deleteCc(@RequestParam("id") long id);

//	/* 환자 등록 Patient 6ea */
	
	// 환자 정보 등록 POST
	@PostMapping(value="/patient", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	APIResponse<Void> registPatientById(@RequestBody Patient patient);

	// 환자 정보 조회 GET
	@GetMapping(value="/patient")
	APIResponse<PatientResponse> getPatientById(@RequestParam("id") long id);

	// 모든 환자 조회 GET
	@GetMapping(value="/patient/all")
	APIResponse<List<PatientResponse>> getAllPatient();
	
	// 환자 검색 GET
	@GetMapping(value="/patient/search")
	APIResponse<List<PatientResponse>> searchPatient(@RequestParam("name") String name);

	// 환자 정보 수정 PUT
	@PutMapping(value="/patient", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	APIResponse<Void> updatePatient(Patient patient);

	// 환자 정보 삭제 DELETE
	@DeleteMapping(value="/patient")
	APIResponse<Void> deletePatient(@RequestParam("id") long id);


}	
