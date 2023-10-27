package com.ssafy.oauth.serivce;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.common.jwt.JwtTokenProvider;
import com.ssafy.common.jwt.TokenInfo;
import com.ssafy.nurse.service.NurseRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OauthService {
	
	/**
	 * 로그인 메서드가 구현된 서비스
	 */
	
	private final NurseRepository nurseRepo;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	
	@Transactional
	public TokenInfo login(String ID) {
		// 1. Login ID를 기반으로 Authentication 객체 생성
		// 이 때 authentication은 인증 여부를 확인하는 authenticated 값이 false
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(ID, ID);
		
		// 2. 실제 검증이 이루어지는 부분
		// authenticate 메서드가 실행될 때 CustomuserDetailsService에서 만든 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		
		// 3. 인증 정보를 기반으로 JWT 토큰 생성
		TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
		
		return tokenInfo;
	}
}
