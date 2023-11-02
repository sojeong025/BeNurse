package com.ssafy.invite.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.invite.model.Invite;
import com.ssafy.invite.service.InviteRedisRepository;
import com.ssafy.notice.model.Notice;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "초대 API", tags = { "초대." })
@RestController
@RequestMapping("/api/benurse/invite")
@Slf4j
public class InviteController {
	
	@Autowired
	InviteRedisRepository invRepo;
	@Autowired
	OauthService oauthService;
	@Autowired
	NurseRepository nurseRepo;
	
	@PostMapping("")
	@ApiOperation(value = "초대코드 발급", notes = "병원 ID, 소속 ID가 등록된 초대코드를 생성, 발급한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<String> getInviteCode(@RequestParam("hospitalID") long hospitalID,  @RequestParam("groupID") long groupID) {

		// 초대 코드 생성
		String invCode = generateInviteCode();
		
		// 중복 체크
		Optional<Invite> check = invRepo.findById(invCode);
		while(check.isPresent()) {
			invCode = generateInviteCode();
			check = invRepo.findById(invCode);
		}
		log.info(invCode);
		Invite inv = new Invite(invCode, hospitalID, groupID);
		
	    invRepo.save(inv);
	    return new APIResponse<>(inv.getInviteCode(), HttpStatus.OK);
	}
	
	@GetMapping("")
	@ApiOperation(value = "초대 코드 인증", notes = "초대 코드로 병원을 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> authInviteCode(@RequestHeader("Access-Token") String token, @RequestParam("code") String code) {

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}
		Nurse user = nurse;
		// 초대코드 조회
		try {
			Optional<Invite> found = invRepo.findById(code);
			user.setHospitalID(found.get().getHospitalID());
			nurseRepo.save(user);
			return new APIResponse(HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/check")
	@ApiOperation(value = "초대 코드 확인(디버그용)", notes = "초대 코드에 등록된 내역을 확인한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Invite> checkInviteCode(@RequestParam("code") String code) {
		// 초대코드 조회
		try {
			Invite invite = invRepo.findById(code).get();
			
			return new APIResponse(invite, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.BAD_REQUEST);
		}
	}
	
	private String generateInviteCode() {
		UUID uuid = UUID.randomUUID();
		String code = uuid.toString().substring(0, 8);
		return code;
	}
}
