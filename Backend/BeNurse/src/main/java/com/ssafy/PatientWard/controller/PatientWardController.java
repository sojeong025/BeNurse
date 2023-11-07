package com.ssafy.PatientWard.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.PatientWard.model.PatientWard;
import com.ssafy.PatientWard.service.PatientWardRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.hospital.model.Ward;
import com.ssafy.hospital.service.WardRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "환자병실 API", tags = { "환자병실." })
@RestController
@RequestMapping("/api/benurse/pward")
public class PatientWardController {

	@Autowired
	PatientWardRepository pwRepo;

	@Autowired
	WardRepository wardRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 환자 병동 등록 POST
	@PostMapping("")
	@ApiOperation(value = "환자 병동 등록", notes = "환자의 병동을 등록합니다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = PatientWard.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<PatientWard> registDevice(@RequestBody PatientWard patientWard) {
		
		patientWard.setHospitalized(true);
		
		PatientWard savedPatientWard = pwRepo.save(patientWard);
		return new APIResponse<>(savedPatientWard, HttpStatus.OK);
	}
	
	// 환자 병동 정보 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "환자 병동 정보 수정", notes = "환자 병동 정보 수정합니다.") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = PatientWard.class),
	    @ApiResponse(code = 404, message = "환자정보를 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<PatientWard> updatePatientWardByDeviceId(@RequestBody PatientWard patientWard){
		PatientWard savedPatientWard = pwRepo.save(patientWard);
		return new APIResponse<>(savedPatientWard, HttpStatus.OK);
	}
	
	// 병동 환자 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "병동 환자 조회", notes = "병원 내 모든 환자의 병동 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = PatientWard.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<PatientWard>> PatientWard(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<PatientWard> patientWard = pwRepo.findAllByHospitalIDAndIsHospitalized(nurse.getHospitalID(),true);
	    return new APIResponse<>(patientWard, HttpStatus.OK);
	}
	
	// 병동 환자 검색
	@GetMapping("/search")
	@ApiOperation(value = "병동 환자 검색", notes = "병동 이름으로 해당 병동의 환자 ID를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = PatientWard.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<PatientWard>> PatientWardSearch(@RequestHeader("Authorization") String token, @RequestParam("wardName") String name) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		List<Ward> wardList = wardRepo.findAllByHospitalIDAndNameContaining(nurse.getHospitalID(), name);
		
		
		List<PatientWard> patientWard = new ArrayList<>();
		for(Ward w : wardList) {
			List<PatientWard> pwList = pwRepo.findAllByHospitalIDAndWardIDAndIsHospitalized(nurse.getHospitalID(), w.getID(), true);
			for(PatientWard pw : pwList)
				patientWard.add(pw);
		}
		return new APIResponse<>(patientWard, HttpStatus.OK);
	}
	
	// 환자 입원 정보 조회
	@GetMapping("")
	@ApiOperation(value = "환자 병동 조회", notes = "환자 ID로 해당 환자의 병동을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = PatientWard.class),
        @ApiResponse(code = 404, message = "결과 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<PatientWard> getPatientWard(@RequestParam("patientID") long ID) {
		try {
			Optional<PatientWard> patient = pwRepo.findById(ID);
			return new APIResponse<>(patient.get(), HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
}
