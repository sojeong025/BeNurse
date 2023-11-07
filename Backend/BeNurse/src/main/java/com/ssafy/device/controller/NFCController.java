package com.ssafy.device.controller;

import java.util.List;
import java.util.Optional;

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
import com.ssafy.device.model.Device;
import com.ssafy.device.model.DeviceHistory;
import com.ssafy.device.model.NFC;
import com.ssafy.device.model.NFCResponse;
import com.ssafy.device.model.PatientNFC;
import com.ssafy.device.service.DeviceHistoryRepository;
import com.ssafy.device.service.DeviceRepository;
import com.ssafy.device.service.NFCRepository;
import com.ssafy.device.service.PatientNFCRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "NFC API", tags = { "NFC." })
@RestController
@RequestMapping("/api/benurse/nfc")
public class NFCController {

	@Autowired
	NFCRepository nfcRepo;
	
	@Autowired
	PatientNFCRepository pnfcRepo;
	
	@Autowired
	DeviceRepository deviceRepo;
	
	@Autowired
	DeviceHistoryRepository dhRepo;
	
	@Autowired
	OauthService oauthService;
	
	// NFC 조회 GET
	@GetMapping("")
	@ApiOperation(value = "특정 NFC 조회", notes = "NFC ID로 특정 장비 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = NFCResponse.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<NFCResponse> getNFCById( @RequestParam("ID") String ID) {
		Optional<NFC> nfc = nfcRepo.findById(ID);

	    if (nfc.isPresent()) {
	    	NFCResponse resp;
	    	if(nfc.get().isDevice()) {
	    		resp = deviceRepo.findById(ID).get();
	    		resp.setDevice(true);
	    	}else {
				resp = pnfcRepo.findById(ID).get();
				resp.setDevice(false);
	    	}
	        return new APIResponse(resp, HttpStatus.OK);
	    }
	    else
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}
	
	// NFC 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "NFC 삭제", notes = "NFC를 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = NFC.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
    public APIResponse<Void> deleteNFCById(@RequestHeader("Authorization") String token, @RequestParam("ID") String ID) {
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
		
		Optional<NFC> nfc = nfcRepo.findById(ID);
	    if(nfc.isPresent()) {
	    	if(nfc.get().isDevice()) {
	    		Optional<Device> device = deviceRepo.findById(ID);
	    		if(device.isPresent()) {
		    		List<DeviceHistory> list = dhRepo.findAllByDeviceID(ID);
			    	for(DeviceHistory l : list) {
			    		dhRepo.delete(l);
			    	}
	    		}
	    		deviceRepo.delete(device.get());
	    	}
	    	else {
	    		Optional<PatientNFC> pnfc = pnfcRepo.findById(ID);
	    		if(pnfc.isPresent()) {
	    			pnfcRepo.delete(pnfc.get());
	    		}
	    	}
	    		
	    	nfcRepo.delete(nfc.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	} 

}
