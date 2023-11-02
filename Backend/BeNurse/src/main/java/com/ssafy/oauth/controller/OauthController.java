package com.ssafy.oauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.jwt.TokenInfo;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "로그인 API", tags = { "로그인." })
@RestController
@RequestMapping("/api/benurse/oauth")
@Slf4j
public class OauthController {

	@Autowired
	OauthService oauthService;

	@GetMapping("")
	@ApiOperation(value = "로그인", notes = "카카오 인가 코드를 전달받아 사용자 인증 후 서비스 토큰을 발급(카카오 토큰과는 다른겁니다.)")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = TokenInfo.class),
		@ApiResponse(code = 404, message = "인증 오류"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<TokenInfo> kakaoLogin(@RequestParam("redirectUri") String kakao_redirect_url, @RequestParam("code") String code) {
		try {
			return new APIResponse(oauthService.kakaoLogin(kakao_redirect_url, code), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}
	}

	@GetMapping("/test/user")
	@ApiOperation(value = "사용자 정보", notes = "서비스 토큰으로 사용자 조회(디버그용)")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Nurse.class),
		@ApiResponse(code = 404, message = "인증 오류"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Nurse> getUser(@RequestHeader("Access-Token") String accessToken){
		try {
			Nurse user = oauthService.getUser(accessToken);
			return new APIResponse(user, HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}
	}
}
