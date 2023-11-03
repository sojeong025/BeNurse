package com.ssafy.invite.controller;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.invite.model.Invite;
import com.ssafy.invite.service.InviteRedisRepository;
import com.ssafy.notice.model.Notice;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
	@ApiOperation(value = "초대코드 발급", notes = "초대코드를 생성, 발급한다. 초대 받을 사람의 이름이 필요 \n{\n\t\"name\" : \"이름\"\n}")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = String.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<String> getInviteCode(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> body) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}
		
		// 초대 코드 생성
		String invCode = generateInviteCode();
		
		// 중복 체크
		Optional<Invite> check = invRepo.findById(invCode);
		while(check.isPresent()) {
			invCode = generateInviteCode();
			check = invRepo.findById(invCode);
		}
		log.info(invCode);
		Invite inv = new Invite(invCode, nurse.getHospitalID(), nurse.getWardID(), (String)body.get("name"));
		
	    invRepo.save(inv);
	    return new APIResponse<>(inv.getInviteCode(), HttpStatus.OK);
	}
	
	@PostMapping("/auth")
	@ApiOperation(value = "초대 코드 인증", notes = "초대 코드로 병원 소속을 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = String.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> authInviteCode(@RequestHeader("Authorization") String token, @RequestBody Map<String,Object> body) {

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
			Optional<Invite> found = invRepo.findById((String)body.get("code"));
			Invite info = found.get();
			user.setHospitalID(info.getHospitalID());
			user.setWardID(info.getWardID());
			user.setName(info.getName());
			nurseRepo.save(user);
			return new APIResponse(HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/check")
	@ApiOperation(value = "초대 코드 내용 확인(디버그용)", notes = "초대 코드에 등록된 내역을 확인한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Invite> checkInviteCode(@RequestBody Map<String, Object> body) {
		// 초대코드 조회
		try {
			Invite invite = invRepo.findById((String)body.get("code")).get();
			
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
