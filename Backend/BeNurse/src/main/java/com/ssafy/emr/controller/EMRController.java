package com.ssafy.emr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.EMRService;
import com.ssafy.emr.model.CC;
import com.ssafy.emr.model.Journal;
import com.ssafy.emr.model.Patient;
import com.ssafy.emr.model.PatientResponse;
import com.ssafy.emr.utils.JournalSearchCondition;

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
	
	/* 간호일지 Journal */
	
	// 모든 간호일지 조회 GET
	@GetMapping("/journal/all")
	@ApiOperation(value = "모든 간호일지 조회", notes = "모든 간호일지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<Journal>> getAllJournal() {
		return emrService.getAllJournal();
	}
	
	// 간호일지 정보 조회 GET
	@GetMapping("/journal")
	@ApiOperation(value = "간호일지 정보 조회", notes = "<strong>간호일지 ID</strong>를 통해 간호일지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Journal.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Journal> getJournalByID(@RequestParam("id") long id){
		return emrService.getJournalByID(id);
	}
	
	// 간호일지 정보 등록 POST
	@PostMapping("/journal")
	@ApiOperation(value = "간호일지 정보 등록", notes = "<strong>간호일지 객체</strong>를 통해 간호일지 정보를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Void> registJournalById(Journal journal) {
		log.info(journal.toString());
		return emrService.registJournalById(journal);
	}

	// 환자 간호일지 삭제 DELETE
	@DeleteMapping("/journal/patient")
	@ApiOperation(value = "환자 간호일지 삭제", notes = "<strong>환자 ID</strong>로 환자에 대한 간호일지들을 삭제한다.")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> deleteJournalByPatientID(@RequestParam("id") long patient_id){
		return emrService.deleteJournalByPatientID(patient_id);
	}

	// 간호일지 정보 수정 PUT
	@PutMapping("/journal")
	@ApiOperation(value = "간호일지 정보 수정", notes = "간호일지 정보를 수정한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> updateJournal(Journal journal){
		return emrService.updateJournal(journal);
	}

	// 간호일지 삭제 DELETE
	@DeleteMapping("/journal")
	@ApiOperation(value = "간호일지 정보 삭제", notes = "<strong>간호일지 ID</strong>로 간호일지 정보를 삭제한다.")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> deleteJournal(@RequestParam("id") long id){
		return emrService.deleteJournal(id);
	}
	
	// 간호일지 검색 GET
	@GetMapping("/journal/search")
	@ApiOperation(value = "간호일지 검색", notes = "조건에 따른 간호일지 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<Journal>> searchJournal(JournalSearchCondition search){
		return emrService.searchJournal(search);
	}
	

	/* 주호소 CC */
	
	// 주호소 등록 POST
	@PostMapping("/cc")
	@ApiOperation(value = "주호소 등록", notes = "<strong>주호소 객체</strong>를 통해 주호소를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공"),
		@ApiResponse(code = 500, message = "서버 오류") 
	})
	public ResponseEntity<Void> registPatientById(CC cc) {
		return emrService.registPatientById(cc);
	}

	// 주호소 삭제 DELETE
	@DeleteMapping("/cc")
	@ApiOperation(value = "주호소 삭제", notes = "<strong>주호소 ID</strong>로 주호소를 삭제한다.")
		@ApiResponses({ @ApiResponse(code = 200, message = "성공"), 
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류") 
	})
	public ResponseEntity<Void> deleteCc(@RequestParam("id") long id) {
		return emrService.deleteCc(id);
	}

	/* 환자 등록 Patient */
	
	// 환자 정보 등록 POST
	@PostMapping("/patient")
	@ApiOperation(value = "환자 정보 등록", notes = "<strong>환자 객체</strong>를 통해 환자 정보를 등록한다.")
	@ApiResponses({ 
		@ApiResponse(code = 201, message = "등록 성공", response = Patient.class),
		@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Void> registPatientById(Patient patient) {
		return emrService.registPatientById(patient);
	}

	// 환자 정보 조회 GET
	@GetMapping("/patient")
	@ApiOperation(value = "환자 정보 조회", notes = "<strong>환자 ID</strong>를 통해 환자 정보를 조회한다.")
	@ApiResponses({ 
		@ApiResponse(code = 200, message = "성공", response = Patient.class),
		@ApiResponse(code = 404, message = "결과 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<PatientResponse> getPatientById(@RequestParam("id") long id) {
		return emrService.getPatientById(id);
	}

	// 모든 환자 조회 GET
	@GetMapping("/patient/all")
	@ApiOperation(value = "모든 환자 조회", notes = "모든 환자 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = List.class),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<PatientResponse>> getAllPatient() {
		return emrService.getAllPatient();
	}

	// 환자 검색 GET
	@GetMapping("/patient/search")
	@ApiOperation(value = "환자 검색", notes = "이름으로 환자 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<PatientResponse>> searchPatient(String name){
		return emrService.searchPatient(name);
	}

	// 환자 정보 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "환자 정보 수정", notes = "환자 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Void> updatePatient(Patient patient) {
		return emrService.updatePatient(patient);
	}

	// 환자 정보 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "환자 정보 삭제", notes = "<strong>환자 ID</strong>로 환자 정보를 삭제한다.")
	@ApiResponses({ 
		@ApiResponse(code = 200, message = "성공"), 
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Void> deletePatient(@RequestParam("id") long id) {
		return emrService.deletePatient(id);
	}

}
