package com.ssafy.nurse.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.common.utils.NameRequest;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;

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
	
	// 간호사 계정 생성은 로그인 과정에서 생성되기 때문에 Post 없음
	
	@GetMapping("/all")
	@ApiOperation(value = "전체 간호사 조회", notes = "모든 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getAllNotice() {
		List<Nurse> nurse = nurseRepo.findAll();
	    return new APIResponse<>(nurse, HttpStatus.OK);
	}

	@GetMapping("")
	@ApiOperation(value = "특정 간호사 조회", notes = "간호사 ID로 특정 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = Nurse.class),
        @ApiResponse(code = 404, message = "간호사를 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@Cacheable(value="nurse", key="#ID")
	public APIResponse<Nurse> getNurse(@RequestParam("ID") long ID) {
		Optional<Nurse> nurse = nurseRepo.findById(ID);
		if(nurse.isPresent())
			return new APIResponse<>(nurse.get(), HttpStatus.OK);
		else
			return new APIResponse<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/name")
	@ApiOperation(value = "간호사 이름 검색", notes = "간호사 이름으로 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getNurseByName(@RequestParam("name") String name) {
		List<Nurse> nurse = nurseRepo.findAllByNameContaining(name);
	    return new APIResponse<>(nurse, HttpStatus.OK);
	}
	
	@GetMapping("/hospital")
	@ApiOperation(value = "간호사 병원 검색", notes = "소속 병원 ID로 간호사를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Nurse>> getNurseByName(@RequestParam("ID") long ID) {
		List<Nurse> nurse = nurseRepo.findAllByHospitalID(ID);
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
		Optional<Nurse> optionNurse = nurseRepo.findById(updatedNurse.getID());
		
	    if (optionNurse.isPresent()) {
	        Nurse existingNurse = optionNurse.get();

	        // 업데이트된 간호사 정보를 저장
	        nurseRepo.save(updatedNurse);

	        return new APIResponse<>(updatedNurse, HttpStatus.OK);
	    } else	
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "간호사 삭제", notes = "간호사 정보를 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
    @CacheEvict(value = "nurse", key="#ID")
	public APIResponse<Void> deleteNurseById(@RequestBody IDRequest req) {
	    Optional<Nurse> nurse = nurseRepo.findById(req.getID());

	    if(nurse.isPresent()) {
	    	nurseRepo.delete(nurse.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			return new APIResponse(HttpStatus.NOT_FOUND);
	} 
}
