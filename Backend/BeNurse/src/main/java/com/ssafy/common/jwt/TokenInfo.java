package com.ssafy.common.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfo {

	/**
	 * 클라이언트에 토큰을 보내기 위한 DTO
	 * grantType은 JWT에 대한 인증타입, Bearer 사용, HTTP헤더에 prefix로 붙여주는 타입
	 */
	private String grantType;
	private String accessToken;
	private String refreshToken;
}
