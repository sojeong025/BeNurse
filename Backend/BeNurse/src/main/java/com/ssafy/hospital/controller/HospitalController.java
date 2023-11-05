package com.ssafy.hospital.controller;

import java.util.Optional;

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

import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.hospital.model.Hospital;
import com.ssafy.hospital.service.HospitalRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "병원등록 API", tags = { "병원등록." })
@RestController
@RequestMapping("/api/benurse/Hospital")
public class HospitalController {

	@Autowired
	HospitalRepository hospitalRepo;
	
	// 병원 정보 조회 GET
	@GetMapping("")
	@ApiOperation(value = "병원 정보 조회", notes = "병원 ID로 특정 병원 정보 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Hospital.class),
	    @ApiResponse(code = 404, message = "병원을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Hospital> getHospitalById(@RequestParam("ID") long ID) {
	    Optional<Hospital> hospital = hospitalRepo.findById(ID);

	    if (hospital.isPresent())
	        return new APIResponse<>(hospital.get(), HttpStatus.OK);
	    else
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	}
	
	// 병원 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "병원 삭제", notes = "병원 삭제")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Hospital.class),
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
			return new APIResponse<>(HttpStatus.NOT_FOUND);

	}
	
	// 병원 정보 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "병원 정보 수정", notes = "병원 정보 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Hospital.class),
	    @ApiResponse(code = 404, message = "병원을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> updateHospitalById(@RequestBody Hospital updatedHospital){
		Optional<Hospital> optionHospital = hospitalRepo.findById(updatedHospital.getID());
		
	    if (optionHospital.isPresent()) {
	        Hospital existingHospital = optionHospital.get();

	        // 기존 병원 정보를 업데이트
	        if (updatedHospital.getName() != null) {
	        	existingHospital.setName(updatedHospital.getName());
	        }
	        if (updatedHospital.getTel() != null) {
	        	existingHospital.setTel(updatedHospital.getTel());
	        }
	        if (updatedHospital.getAddress() != null) {
	        	existingHospital.setAddress(updatedHospital.getAddress());
	        }
	        if (updatedHospital.getEmr() != null) {
	        	existingHospital.setEmr(updatedHospital.getEmr());
	        }

	        // 업데이트된 병원 정보를 저장
	        hospitalRepo.save(existingHospital);

	        return new APIResponse<>(HttpStatus.OK);
	    } else	
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	    
	}
	
	@PostMapping("")
	@ApiOperation(value = "병원 등록", notes = "서비스에 병원 정보를 등록")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Hospital.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Hospital> registHospital(@RequestBody Hospital hospital) {

		
	    Hospital savedHospital = hospitalRepo.save(hospital);
	    return new APIResponse<>(savedHospital, HttpStatus.OK);
	}
}
