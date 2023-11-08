package com.ssafy.device.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.device.model.DeviceHistory;
import com.ssafy.device.service.BeaconRepository;
import com.ssafy.device.service.DeviceHistoryRepository;
import com.ssafy.emr.model.PatientResponse;
import com.ssafy.emr.service.EMRService;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "장비 사용 API", tags = { "장비 사용 기록." })
@RestController
@RequestMapping("/api/benurse/device-history")
@Slf4j
public class DeviceHistroyController {
	
	@Autowired
	DeviceHistoryRepository dhRepo;
	
	@Autowired
	OauthService oauthService;
	
	@Autowired
	BeaconRepository beaconRepo;
	
	@Autowired
	EMRService emrService;
	
	// 장비 사용 내역 등록 POST
	@PostMapping("")
	@ApiOperation(value = "장비 사용 내역 등록", notes = "장비 사용 내역을 등록한다.\n장비 ID, 환자 ID, 비콘 ID만 입력")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = DeviceHistory.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<DeviceHistory> registDeviceHistory(@RequestHeader("Authorization") String token, @RequestBody DeviceHistory deviceHistory) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		try {
			APIResponse<PatientResponse> pr = emrService.getPatientById(deviceHistory.getPatientID());
			
			deviceHistory.setNurseID(nurse.getID());
			deviceHistory.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
			deviceHistory.setPatientName(pr.getResponseData().getPatient().getName());
			
			log.info(deviceHistory.toString());
			DeviceHistory savedDeviceHistory = dhRepo.save(deviceHistory);
		    return new APIResponse<>(savedDeviceHistory, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// 장비 사용 내역 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "장비 사용 내역 전체 조회", notes = "모든 장비 사용 내역을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = DeviceHistory.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<DeviceHistory>> getAllDevice(@RequestParam("DeviceID") String deviceID) {
		LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
		log.info(now.minusDays(3).toString());	
		log.info(now.toString());
		List<DeviceHistory> deviceHistory = dhRepo.findAllByDeviceIDAndTimeBetweenOrderByIDDesc(deviceID, now.minusDays(3), now);
	    return new APIResponse<>(deviceHistory, HttpStatus.OK);
	}
}
