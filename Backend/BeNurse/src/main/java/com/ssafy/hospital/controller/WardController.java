package com.ssafy.hospital.controller;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.common.utils.NameRequest;
import com.ssafy.hospital.model.Hospital;
import com.ssafy.hospital.model.Ward;
import com.ssafy.hospital.service.HospitalRepository;
import com.ssafy.hospital.service.WardRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "병동 API", tags = { "병동." })
@RestController
@RequestMapping("/api/benurse/ward")
public class WardController {
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@Autowired
	WardRepository wardRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 병동 정보 조회 GET
	@GetMapping("")
	@ApiOperation(value = "병동 정보 조회", notes = "병동 ID로 특정 병동 정보 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Ward.class),
	    @ApiResponse(code = 404, message = "병원을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Hospital> getHospitalById(@RequestParam("ID") long ID) {
	    Optional<Hospital> hospital = hospitalRepo.findById(ID);

	    if (hospital.isPresent())
	        return new APIResponse<>(hospital.get(), HttpStatus.OK);
	    else
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/all")
	@ApiOperation(value = "병동 정보 전체 조회", notes = "소속 병원 내 모든 병동 정보 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Ward.class),
	    @ApiResponse(code = 404, message = "병원을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Ward>> getAllWardByHospitalId(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
	    Optional<Hospital> hospital = hospitalRepo.findById(nurse.getHospitalID());

	    if (hospital.isPresent()) {
	    	List<Ward> wards = wardRepo.findAllByHospitalID(nurse.getHospitalID());
	        return new APIResponse<>(wards, HttpStatus.OK);
	    }
	    else
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("")
	@ApiOperation(value = "병동 등록", notes = "사용자의 병원에 병동 정보를 등록")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Ward.class),
		@ApiResponse(code = 401, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	
	public APIResponse<Ward> registHospital(@RequestHeader("Authorization") String token, @RequestBody NameRequest req) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		// 사용자 병원으로 병원 ID 등록
		Ward ward = new Ward();
		ward.setHospitalID(nurse.getHospitalID());
		ward.setName(req.getName());
	    
		Ward savedWard = wardRepo.save(ward);
	    return new APIResponse<>(savedWard, HttpStatus.OK);
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "병동 삭제", notes = "병동 삭제")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Ward.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteHospitalById(@RequestBody IDRequest req) {
	    Optional<Hospital> hospital = hospitalRepo.findById(req.getID());

	    if(hospital.isPresent()) {
	    	hospitalRepo.delete(hospital.get());
			return new APIResponse<>(HttpStatus.OK);
		}
		else
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);

	}
}
