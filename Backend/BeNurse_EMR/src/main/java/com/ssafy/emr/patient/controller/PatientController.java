package com.ssafy.emr.patient.controller;

import java.util.ArrayList;
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
import com.ssafy.emr.patient.model.CC;
import com.ssafy.emr.patient.model.Journal;
import com.ssafy.emr.patient.model.Patient;
import com.ssafy.emr.patient.model.PatientResponse;
import com.ssafy.emr.patient.service.CCRepository;
import com.ssafy.emr.patient.service.JournalRepository;
import com.ssafy.emr.patient.service.PatientRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "EMR 환자 정보 API", tags = { "Patient." })
@RestController
@RequestMapping("/api/emr/patient")
public class PatientController {
	@Autowired
	PatientRepository patientRepo;
	@Autowired
	CCRepository ccRepo;
	@Autowired
	JournalRepository journalRepo;

	@PostMapping("")
	@ApiOperation(value = "환자 정보 등록", notes = "<strong>환자 객체</strong>를 통해 환자 정보를 등록한다.")
	@ApiResponses({ @ApiResponse(code = 201, message = "등록 성공", response = Patient.class),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> registPatientById(Patient patient) {
		patientRepo.save(patient);
		return new APIResponse(HttpStatus.CREATED);
	}

	@GetMapping("")
	@ApiOperation(value = "환자 정보 조회", notes = "<strong>환자 ID</strong>를 통해 환자 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = Patient.class),
			@ApiResponse(code = 404, message = "결과 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<PatientResponse> getPatientById(@RequestParam("id") long id) {
		Optional<Patient> patient = patientRepo.findById(id);
		if (patient.isPresent()) {
			PatientResponse resp = new PatientResponse();
			resp.setPatient(patient.get());
			resp.setCc(ccRepo.findAllByPatientID(resp.getPatient().getID()));			
			return new APIResponse(resp, HttpStatus.OK);
		}
		else
			return new APIResponse(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/all")
	@ApiOperation(value = "모든 환자 조회", notes = "모든 환자 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = List.class),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<List<PatientResponse>> getAllPatient() {
		List<Patient> patients = patientRepo.findAll();
		List<PatientResponse> resp = new ArrayList<>();
		for(Patient p : patients) {
			PatientResponse r = new PatientResponse();
			r.setPatient(p);
			r.setCc(ccRepo.findAllByPatientID(p.getID()));
			resp.add(r);
		}
		return new APIResponse(resp, HttpStatus.OK);
	}

	@GetMapping("/search")
	@ApiOperation(value = "환자 검색", notes = "이름으로 환자 정보를 검색한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = List.class),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<PatientResponse>> searchPatient(String name){
		List<Patient> patients = patientRepo.findAllByName(name);
		List<PatientResponse> resp = new ArrayList<>();
		for(Patient p : patients) {
			PatientResponse r = new PatientResponse();
			r.setPatient(p);
			r.setCc(ccRepo.findAllByPatientID(p.getID()));
			resp.add(r);
		}
		return new APIResponse(resp, HttpStatus.OK);
	}

	@PutMapping("")
	@ApiOperation(value = "환자 정보 수정", notes = "환자 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> updatePatient(Patient patient) {
		Optional<Patient> found = patientRepo.findById(patient.getID());
		if (found.isPresent()) {
			patientRepo.save(patient);
			return new APIResponse(HttpStatus.OK);
		} else {
			return new APIResponse(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("")
	@ApiOperation(value = "환자 정보 삭제", notes = "<strong>환자 ID</strong>로 환자 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> deletePatient(@RequestParam("id") long id) {
		Optional<Patient> found = patientRepo.findById(id);
		if (found.isPresent()) {
			List<Journal> journal = journalRepo.findAllByPatientID(id);
			for(Journal j : journal)
				journalRepo.delete(j);
			
			List<CC> cc = ccRepo.findAllByPatientID(id);
			for(CC c : cc)
				ccRepo.delete(c);			
			patientRepo.delete(found.get());
			return new APIResponse(HttpStatus.OK);
		} else {
			return new APIResponse(HttpStatus.NOT_FOUND);
		}
	}
}
