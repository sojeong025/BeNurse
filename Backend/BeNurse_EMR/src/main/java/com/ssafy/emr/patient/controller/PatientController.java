package com.ssafy.emr.patient.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.emr.patient.model.Patient;
import com.ssafy.emr.patient.service.PatientRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "EMR 환자 정보 API", tags = { "Patient." })
@RestController
@RequestMapping("/api/v1/Patient")
public class PatientController {
	@Autowired
	PatientRepository patientRepo;
	
	@GetMapping("")
	@ApiOperation(value = "환자 정보 조회", notes = "<strong>환자 ID</strong>를 통해 환자 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Patient.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Patient> getPatientById(@RequestParam("id") long id) {
		Optional<Patient> patient = patientRepo.findById(id);
		if (patient.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(patient.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("/all")
	@ApiOperation(value = "모든 환자 조회", notes = "모든 환자 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Patient>> getAllPatient() {
		List<Patient> patients = patientRepo.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(patients);
	}
}
