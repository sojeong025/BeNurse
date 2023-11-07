package com.ssafy.emr.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.PatientWard.model.PatientWard;
import com.ssafy.PatientWard.service.PatientWardRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.emr.model.CC;
import com.ssafy.emr.model.Journal;
import com.ssafy.emr.model.Patient;
import com.ssafy.emr.model.PatientResponse;
import com.ssafy.emr.model.PatientWardResponse;
import com.ssafy.emr.service.EMRService;
import com.ssafy.emr.utils.JournalSearchCondition;
import com.ssafy.hospital.model.Hospital;
import com.ssafy.hospital.service.HospitalRepository;
import com.ssafy.hospital.service.WardRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;


@CrossOrigin(origins = "*")
@Api(value = "EMR API", tags = { "EMR." })
@RestController
@RequestMapping("/api/benurse/emr")
@Slf4j
public class EMRController {

	@Autowired
	EMRService emrService;
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@Autowired
	WardRepository wardRepo;
	
	@Autowired
	PatientWardRepository pwRepo;
	
	/* 간호일지 Journal */
	
	// 모든 간호일지 조회 GET
	@GetMapping("/journal/all")
	@ApiOperation(value = "모든 간호일지 조회", notes = "모든 간호일지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Journal>> getAllJournal() {
		APIResponse<List<Journal>> journals = emrService.getAllJournal();

		return journals;
		//return emrService.getAllJournal();
	}
	
	// 간호일지 정보 조회 GET
	@GetMapping("/journal")
	@ApiOperation(value = "간호일지 정보 조회", notes = "<strong>간호일지 ID</strong>를 통해 간호일지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Journal.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Journal> getJournalByID(@RequestParam("id") long id){
		return emrService.getJournalByID(id);
	}
	
	// 간호일지 정보 등록 POST
	@PostMapping("/journal")
	@ApiOperation(value = "간호일지 정보 등록", notes = "<strong>간호일지 객체</strong>를 통해 간호일지 정보를 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 201, message = "등록 성공", response = Journal.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> registJournalById(@RequestBody Journal journal) {
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
	public APIResponse<Void> deleteJournalByPatientID(@RequestParam("id") long patient_id){
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
	public APIResponse<Void> updateJournal(@RequestBody Journal journal){
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
	public APIResponse<Void> deleteJournal(@RequestParam("id") long id){
		return emrService.deleteJournal(id);
	}
	
	// 간호일지 검색 POST
	@PostMapping("/journal/search")
	@ApiOperation(value = "간호일지 검색", notes = "조건에 따른 간호일지 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Journal>> searchJournal(@RequestBody JournalSearchCondition search){
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
	public APIResponse<Void> registPatientById(@RequestBody CC cc) {
		return emrService.registPatientById(cc);
	}

	// 주호소 삭제 DELETE
	@DeleteMapping("/cc")
	@ApiOperation(value = "주호소 삭제", notes = "<strong>주호소 ID</strong>로 주호소를 삭제한다.")
		@ApiResponses({ @ApiResponse(code = 200, message = "성공"), 
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류") 
	})
	public APIResponse<Void> deleteCc(@RequestParam("id") long id) {
		return emrService.deleteCc(id);
	}

	/* 환자 등록 Patient */
	
	// 환자 정보 등록 POST
	@PostMapping("/patient")
	@ApiOperation(value = "환자 정보 등록", notes = "<strong>환자 객체</strong>를 통해 환자 정보를 등록한다.")
	@ApiResponses({ 
		@ApiResponse(code = 201, message = "등록 성공", response = Patient.class),
		@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> registPatientById(@RequestBody Patient patient) {
		return emrService.registPatientById(patient);
	}

	// 환자 정보 조회 GET
	@GetMapping("/patient")
	@ApiOperation(value = "환자 정보 조회", notes = "<strong>환자 ID</strong>를 통해 환자 정보를 조회한다.")
	@ApiResponses({ 
		@ApiResponse(code = 200, message = "성공", response = PatientWardResponse.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<PatientWardResponse> getPatientById(@RequestParam("id") long id) {
		PatientWardResponse pwr = new PatientWardResponse();
		try {
			// EMR에서 환자 조회
			APIResponse<PatientResponse> pr = emrService.getPatientById(id);
			pwr.setPatient(pr.getResponseData());
			
			// 환자 병동 정보 조회
			PatientWard pw = pwRepo.findById(pwr.getPatient().getPatient().getID()).get();
			pwr.setHospital(hospitalRepo.findById(pw.getHospitalID()).get());
			pwr.setWard(wardRepo.findById(pw.getWardID()).get());
			return new APIResponse(pwr, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 모든 환자 조회 GET
	@GetMapping("/patient/all")
	@ApiOperation(value = "모든 환자 조회", notes = "모든 환자 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = List.class),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<List<PatientResponse>> getAllPatient() {
		return emrService.getAllPatient();
	}

	// 환자 검색 GET
	@GetMapping("/patient/search")
	@ApiOperation(value = "환자 검색", notes = "이름으로 환자 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<PatientWardResponse>> searchPatient(String name){
		List<PatientWardResponse> pwrlist = new ArrayList<>();
		try {
			// EMR에서 환자 검색
			APIResponse<List<PatientResponse>> prlist = emrService.searchPatient(name);
			
			for(PatientResponse pr : prlist.getResponseData()) {
				PatientWardResponse pwr = new PatientWardResponse();
				pwr.setPatient(pr);
			
				try {
					// 환자 병동 정보 조회
					PatientWard pw = pwRepo.findById(pwr.getPatient().getPatient().getID()).get();
					pwr.setHospital(hospitalRepo.findById(pw.getHospitalID()).get());
					pwr.setWard(wardRepo.findById(pw.getWardID()).get());
					pwrlist.add(pwr);
				}catch (Exception e) {
					log.error("not valid patient (id:"+pwr.getPatient().getPatient().getID()+")");
				}
			}
			return new APIResponse(pwrlist, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 환자 정보 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "환자 정보 수정", notes = "환자 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> updatePatient(@RequestBody Patient patient) {
		return emrService.updatePatient(patient);
	}

	// 환자 정보 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "환자 정보 삭제", notes = "<strong>환자 ID</strong>로 환자 정보를 삭제한다.")
	@ApiResponses({ 
		@ApiResponse(code = 200, message = "성공"), 
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> deletePatient(@RequestParam("id") long id) {
		return emrService.deletePatient(id);
	}

}
