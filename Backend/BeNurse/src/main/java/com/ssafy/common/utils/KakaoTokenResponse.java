package com.ssafy.common.utils;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoTokenResponse {

	private String access_token;
	
	private String token_type;
	
	private String refresh_token;
	
	private String id_token;
	
	private long expires_in;
	
	private String scope;
	
	private long refresh_token_expires_in;
}
