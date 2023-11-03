package com.ssafy.emr.patient.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.emr.common.utils.APIResponse;
import com.ssafy.emr.patient.model.CC;
import com.ssafy.emr.patient.model.Patient;
import com.ssafy.emr.patient.service.CCRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "EMR 환자 정보 API", tags = { "CC." })
@RestController
@RequestMapping("/api/emr/cc")
public class CCController {
	@Autowired
	CCRepository ccRepo;
	
	@PostMapping("")
	@ApiOperation(value = "주호소 등록", notes = "<strong>주호소 객체</strong>를 통해 주호소를 등록한다.")
	@ApiResponses({ @ApiResponse(code = 201, message = "등록 성공", response = Patient.class),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> registPatientById(CC cc) {
		ccRepo.save(cc);
		return new APIResponse(HttpStatus.CREATED);
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "주호소 삭제", notes = "<strong>주호소 ID</strong>로 주호소를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public APIResponse<Void> deletePatient(@RequestParam("id") long id) {
		Optional<CC> found = ccRepo.findById(id);
		if (found.isPresent()) {
			ccRepo.delete(found.get());
			return new APIResponse(HttpStatus.OK);
		} else {
			return new APIResponse(HttpStatus.NOT_FOUND);
		}
	}
}
