package com.ssafy.oauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ssafy.common.jwt.TokenInfo;
import com.ssafy.common.utils.KakaoTokenResponse;
import com.ssafy.notice.model.Notice;
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
	
	@Autowired OauthService oauthService;

	@GetMapping("")
	@ApiOperation(value = "로그인", notes = "로그인 API")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<TokenInfo> kakaoLogin(@RequestParam("code") String code) {
		try {
		    return ResponseEntity.status(HttpStatus.OK).body(oauthService.kakaoLogin(code));
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@GetMapping("/test")
	public ResponseEntity<Void> test(@RequestHeader("Access-Token") String accessToken){
		log.info(oauthService.getUserEmail(accessToken));
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
}
