package com.ssafy.nurse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.hospital.service.HospitalService;
import com.ssafy.hospital.service.WardService;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.response.MyNurseResponse;
import com.ssafy.nurse.service.NurseRepository;
import com.ssafy.nurse.service.NurseService;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "간호사 API", tags = { "간호사." })
@RestController
@RequestMapping("/api/benurse/nurse")
public class NurseController {

	@Autowired
	NurseRepository nurseRepo;
	
	@Autowired
	OauthService oauthService;
	
	@Autowired
	NurseService nurseServ;
	
	@Autowired
	HospitalService hospitalServ;
	
	@Autowired
	WardService wardServ;
	
	// 간호사 계정 생성은 로그인 과정에서 생성되기 때문에 Post 없음
	
	@GetMapping("/all")
	@ApiOperation(value = "전체 간호사 조회", notes = "소속 병원 내의 모든 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = Nurse.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getAllNotice(@RequestHeader("Authorization") String token) {

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<Nurse> nurselist = nurseRepo.findAllByHospitalID(nurse.getHospitalID());
	    return new APIResponse<>(nurselist, HttpStatus.OK);
	}

	@GetMapping("")
	@ApiOperation(value = "특정 간호사 조회", notes = "간호사 ID로 특정 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = Nurse.class),
        @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<Nurse> getNurse(@RequestParam("ID") long ID) {
		
		try {
			Nurse nurse = nurseServ.findById(ID);
			return new APIResponse<>(nurse, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND); 
		}
	}
	
	@GetMapping("/name")
	@ApiOperation(value = "이름으로 간호사 검색", notes = "간호사 이름으로 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getNurseByName(@RequestParam("name") String name) {
		List<Nurse> nurse = nurseRepo.findAllByNameContaining(name);
	    return new APIResponse<>(nurse, HttpStatus.OK);
	}
	

	@GetMapping("/me")
	@ApiOperation(value = "내 간호사 정보 조회", notes = "서비스 토큰으로 사용자 조회")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = MyNurseResponse.class),
		@ApiResponse(code = 404, message = "인증 오류"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<MyNurseResponse> getUser(@RequestHeader("Authorization") String token){
		try {
			Nurse user = oauthService.getUser(token);
			
			MyNurseResponse me = new MyNurseResponse(user);
			me.setHospitalName(hospitalServ.findById(me.getHospitalID()).getName());
			me.setWardName(wardServ.findById(me.getWardID()).getName());
			
			return new APIResponse(me, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@GetMapping("/hospital")
	@ApiOperation(value = "병원 ID로 간호사 검색", notes = "소속 병원 ID로 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getNurseByHospital(@RequestParam("ID") long ID) {
		List<Nurse> nurse = nurseRepo.findAllByHospitalID(ID);
	    return new APIResponse<>(nurse, HttpStatus.OK);
	}
	
	
	@GetMapping("/ward")
	@ApiOperation(value = "병동 ID로 간호사 검색", notes = "소속 병동 ID로 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getNurseByWard(@RequestParam("ID") long ID) {
		List<Nurse> nurse = nurseRepo.findAllByWardID(ID);
	    return new APIResponse<>(nurse, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	@ApiOperation(value = "간호사 수정", notes = "간호사 정보 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Nurse.class),
	    @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	@CachePut(value = "nurse", key = "#updatedNurse.ID")
	public APIResponse<Nurse> updateNurseById(@RequestBody Nurse updatedNurse){		
	    try {
	        nurseServ.save(updatedNurse);
	        return new APIResponse<>(updatedNurse, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "간호사 삭제", notes = "간호사 정보를 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteNurseById(@RequestBody IDRequest req) {
	    try {
	    	nurseServ.delete(req.getID());
			return new APIResponse(HttpStatus.OK);
		}catch (Exception e) {
	    	e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	} 
}
