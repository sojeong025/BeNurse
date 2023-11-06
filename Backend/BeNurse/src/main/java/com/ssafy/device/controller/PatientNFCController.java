package com.ssafy.device.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.device.model.NFC;
import com.ssafy.device.model.PatientNFC;
import com.ssafy.device.service.NFCRepository;
import com.ssafy.device.service.PatientNFCRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "환자NFC API", tags = { "환자NFC." })
@RestController
@RequestMapping("/api/benurse/pnfc")
public class PatientNFCController {

	@Autowired
	NFCRepository nfcRepo;
	
	@Autowired
	PatientNFCRepository pnfcRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 환자 NFC 등록 POST
	@PostMapping("")
	@ApiOperation(value = "환자 NFC 등록", notes = "환자 NFC 등록 합니다")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = PatientNFC.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<PatientNFC> registNFC(@RequestHeader("Authorization") String token, @RequestBody PatientNFC patientnfc) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}
		
		if(!nurse.isAdmin())
			return new APIResponse(HttpStatus.UNAUTHORIZED);

		NFC nfc = new NFC();
		nfc.setID(patientnfc.getID());
		nfc.setDevice(false);
		nfcRepo.save(nfc);
		
		PatientNFC savedPNFC = pnfcRepo.save(patientnfc);
		return new APIResponse<>(savedPNFC, HttpStatus.OK);
	}
}
