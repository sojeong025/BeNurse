package com.ssafy.oauth.serivce;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ssafy.common.jwt.JwtTokenProvider;
import com.ssafy.common.jwt.TokenInfo;
import com.ssafy.common.utils.KakaoTokenResponse;
import com.ssafy.common.utils.KakaoUserInfoResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class OauthService {

	/**
	 * 로그인 메서드가 구현된 서비스
	 */

	private final static String KAKAO_AUTH_URI = "https://kauth.kakao.com";
	private final static String KAKAO_API_URI = "https://kapi.kakao.com";

	@Value("${kakao.client.id}")
	private String KAKAO_CLIENT_ID;
	@Value("${kakao.client.secret}")
	private String KAKAO_CLIENT_SECRET;

	@Autowired
	private final NurseRepository nurseRepo;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordEncoder passwordEncoder;

	public TokenInfo kakaoLogin(String kakao_redirect_url, String code) {
		log.info("인가 코드를 이용하여 토큰을 받습니다.");

		String accessToken = "";
		String refreshToken = "";

		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

			MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
			params.add("grant_type", "authorization_code");
			params.add("client_id", KAKAO_CLIENT_ID);
			params.add("client_secret", KAKAO_CLIENT_SECRET);
			params.add("redirect_uri", kakao_redirect_url);
			params.add("code", code);

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

			ResponseEntity<KakaoTokenResponse> response = restTemplate.exchange(
					KAKAO_AUTH_URI + "/oauth/token",
					HttpMethod.POST, 
					request, 
					KakaoTokenResponse.class);

			log.info(response.getBody().toString());
			KakaoTokenResponse token = response.getBody();
			accessToken = token.getAccess_token();
			refreshToken = token.getRefresh_token();
		} catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException("로그인 에러");
		}

		return getKakaoUserInfo(accessToken);
	}

	public TokenInfo getKakaoUserInfo(String accessToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
		ResponseEntity<KakaoUserInfoResponse> response = restTemplate.exchange(KAKAO_API_URI + "/v2/user/me",
				HttpMethod.POST, request, KakaoUserInfoResponse.class);
		log.info(response.getBody().toString());
		KakaoUserInfoResponse kakaoUser = response.getBody();

		Optional<Nurse> user = nurseRepo.findByEmail(kakaoUser.getKakao_account().getEmail());

		String email = kakaoUser.getKakao_account().getEmail();
		if (user.isEmpty()) {
			Nurse newUser = new Nurse().builder()
					.email(email)
					.password(passwordEncoder.encode(email))
					.isAdmin(false)
					.build();
			nurseRepo.save(newUser);
			user = nurseRepo.findByEmail(kakaoUser.getKakao_account().getEmail());
		}
		Authentication authentication;
		try {
			log.info(user.toString());
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, email));
		} catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException("로그인 에러");
		}

		return jwtTokenProvider.generateToken(authentication);
	}
	
	// 더미 데이터 생성
	public TokenInfo createUserInfo(String email) {
			
		Nurse newUser = new Nurse().builder()
				.email(email)
				.password(passwordEncoder.encode(email))
				.isAdmin(false)
				.build();
		nurseRepo.save(newUser);
		Authentication authentication;
		try {
			log.info(newUser.toString());
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, email));
		} catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException("로그인 에러");
		}

		return jwtTokenProvider.generateToken(authentication);
	}
	
	public Nurse getUser(String accessToken) {
		try {
			String email = jwtTokenProvider.getUserEmail(accessToken);
			Optional<Nurse> nurse = nurseRepo.findByEmail(email);
			return nurse.get();
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
