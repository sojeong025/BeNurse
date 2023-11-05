package com.ssafy.device.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.device.model.Beacon;
import com.ssafy.device.model.DeviceHistory;
import com.ssafy.device.service.BeaconRepository;
import com.ssafy.device.service.DeviceHistoryRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "장비 사용 API", tags = { "장비를 사용합니다." })
@RestController
@RequestMapping("/api/benurse/device-history")
public class DeviceHistroyController {
	
	@Autowired
	DeviceHistoryRepository dhRepo;
	
	@Autowired
	OauthService oauthService;
	
	@Autowired
	BeaconRepository beaconRepo;
	
	// 장비 사용 내역 등록 POST
//	@PostMapping("")
//	@ApiOperation(value = "장비 사용 내역 등록", notes = "장비 사용 내역을 등록한다.")
//	@ApiResponses({
//		@ApiResponse(code = 200, message = "성공", response = DeviceHistory.class),
//		@ApiResponse(code = 404, message = "결과 없음"),
//		@ApiResponse(code = 500, message = "서버 오류")
//	})
//	public APIResponse<DeviceHistory> registDeviceHistory(@RequestHeader("Authorization") String token, @RequestBody DeviceHistory deviceHistory) {
//		Nurse nurse;
//		// 사용자 조회
//		try {
//			nurse = oauthService.getUser(token);
//		}catch (Exception e) {
//			e.printStackTrace();
//			return new APIResponse(HttpStatus.UNAUTHORIZED);
//		}
//		
//		deviceHistory.setLocation(Beacon.builder().location());
//		deviceHistory.setFloor(0);
//		deviceHistory.setNurseID(nurse.getID());
//		deviceHistory.setTime(LocalDateTime.now());
//		
//		DeviceHistory savedDeviceHistory = dhRepo.save(deviceHistory);
//	    return new APIResponse<>(savedDeviceHistory, HttpStatus.OK);
//	}
}
