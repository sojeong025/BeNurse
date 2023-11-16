package com.ssafy.nurse.controller;

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
import com.ssafy.nurse.request.DummyRequest;
import com.ssafy.nurse.request.NurseRequest;
import com.ssafy.nurse.response.NurseResponse;
import com.ssafy.nurse.service.NurseRepository;
import com.ssafy.nurse.service.NurseService;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "간호사 API", tags = { "간호사." })
@RestController
@RequestMapping("/api/benurse/nurse")
@Slf4j
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
	
	@PostMapping("/dummy")
	@ApiOperation(value = "더미 간호사 생성", notes = "이메일로 간호사 계정을 생성한다.(이메일은 검증하지 않기 때문에 아무 String 값이면 됩니다.)") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = Nurse.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<Nurse> createDummyNurse(@RequestBody DummyRequest req){
		oauthService.createUserInfo(req.getEmail());
		Optional<Nurse> option =  nurseRepo.findByEmail(req.getEmail());
		if(option.isPresent()) { 
			Nurse nurse = option.get();
			nurse.setAnnual(req.getAnnual());
			nurse.setHospitalID(req.getHospitalID());
			nurse.setName(req.getName());
			nurse.setWardID(req.getWardID());
			log.info(nurse.toString());
			nurseRepo.save(nurse);
			return new APIResponse<>(nurse, HttpStatus.CREATED);
		}
		else
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/all")
	@ApiOperation(value = "전체 간호사 조회", notes = "소속 병원 내의 모든 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = NurseResponse.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<NurseResponse>> getAllNotice(@RequestHeader("Authorization") String token) {

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<Nurse> nurselist = nurseRepo.findAllByHospitalID(nurse.getHospitalID());
		List<NurseResponse> resp = new ArrayList<>();
		for(Nurse n : nurselist) {
			try {
				NurseResponse nur = new NurseResponse(n);
				nur.setHospitalName(hospitalServ.findById(nur.getHospitalID()).getName());
				nur.setWardName(wardServ.findById(nur.getWardID()).getName());
				resp.add(nur);
			}catch (Exception e) {
				log.error("not found nurse (id:"+n.getID()+")");
			}

		}
	    return new APIResponse<>(resp, HttpStatus.OK);
	}

	@GetMapping("")
	@ApiOperation(value = "특정 간호사 조회", notes = "간호사 ID로 특정 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = NurseResponse.class),
        @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<NurseResponse> getNurse(@RequestParam("ID") long ID) {
		
		try {
			Nurse nurse = nurseServ.findById(ID);

			NurseResponse resp = new NurseResponse(nurse);
			resp.setHospitalName(hospitalServ.findById(resp.getHospitalID()).getName());
			resp.setWardName(wardServ.findById(resp.getWardID()).getName());
			return new APIResponse<>(resp, HttpStatus.OK);
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
	public APIResponse<List<NurseResponse>> getNurseByName(@RequestParam("name") String name) {
		List<Nurse> nurse = nurseRepo.findAllByNameContaining(name);
		List<NurseResponse> resp = new ArrayList<>();
		for(Nurse n : nurse) {
			try {
				NurseResponse nur = new NurseResponse(n);
				nur.setHospitalName(hospitalServ.findById(nur.getHospitalID()).getName());
				nur.setWardName(wardServ.findById(nur.getWardID()).getName());
				resp.add(nur);
			}catch (Exception e) {
				log.error("not found nurse (id:"+n.getID()+")");
			}

		}
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
	

	@GetMapping("/me")
	@ApiOperation(value = "내 간호사 정보 조회", notes = "서비스 토큰으로 사용자 조회")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = NurseResponse.class),
		@ApiResponse(code = 404, message = "인증 오류"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<NurseResponse> getUser(@RequestHeader("Authorization") String token){
		try {
			Nurse user = oauthService.getUser(token);
			
			NurseResponse me = new NurseResponse(user);
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
	public APIResponse<List<NurseResponse>> getNurseByHospital(@RequestParam("ID") long ID) {
		List<Nurse> nurse = nurseRepo.findAllByHospitalID(ID);
		List<NurseResponse> resp = new ArrayList<>();
		for(Nurse n : nurse) {
			try {
				NurseResponse nur = new NurseResponse(n);
				nur.setHospitalName(hospitalServ.findById(nur.getHospitalID()).getName());
				nur.setWardName(wardServ.findById(nur.getWardID()).getName());
				resp.add(nur);
			}catch (Exception e) {
				log.error("not found nurse (id:"+n.getID()+")");
			}
		}
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
	
	
	@GetMapping("/ward")
	@ApiOperation(value = "병동 ID로 간호사 검색", notes = "소속 병동 ID로 간호사를 조회한다.\n(본인 제외)") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<NurseResponse>> getNurseByWard(@RequestHeader("Authorization") String token, @RequestParam("ID") long ID) {

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<Nurse> nurselist = nurseRepo.findAllByWardID(ID);
		List<NurseResponse> resp = new ArrayList<>();
		for(Nurse n : nurselist) {
			if(n.getID() == nurse.getID())
				continue;
			try {
				NurseResponse nur = new NurseResponse(n);
				nur.setHospitalName(hospitalServ.findById(nur.getHospitalID()).getName());
				nur.setWardName(wardServ.findById(nur.getWardID()).getName());
				resp.add(nur);
			}catch (Exception e) {
				log.error("not found nurse (id:"+n.getID()+")");
			}

		}
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	@ApiOperation(value = "간호사 수정", notes = "간호사 정보 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Nurse.class),
	    @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Nurse> updateNurseById(@RequestHeader("Authorization") String token, @RequestBody Nurse updatedNurse){	

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		if(!nurse.isAdmin())
			throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
			
	    try {
	        nurseServ.save(updatedNurse);
	        return new APIResponse<>(updatedNurse, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PutMapping("/updateall")
	@ApiOperation(value = "간호사 단체 수정", notes = "간호사 리스트를 받아 단체로 정보 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공"),
	    @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<String> updateNurseById(@RequestHeader("Authorization") String token, @RequestBody List<NurseRequest> updatedNurseList){
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		if(!nurse.isAdmin())
			throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
		
		int updated = 0;
		String failed = "";
		for(NurseRequest nurseReq : updatedNurseList) {
		    try {
		    	Nurse updatedNurse = nurseReq.makeNurse();
		        nurseServ.save(updatedNurse);
		        updated++;
		    }catch (Exception e) {
		    	log.error("not found nurse (id:"+ nurseReq.getID() + ")");
		    	if(failed.length() > 0)
		    		failed += ", ";
		    	failed += nurseReq.getID();
		    }
		}
		String resp = updated + " updated, ["+ failed + "] failed";
        return new APIResponse<>(resp, HttpStatus.OK);
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
