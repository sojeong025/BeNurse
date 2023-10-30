package com.ssafy.common.utils;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoUserInfoResponse {
	private long id;
	
	private String connected_at;
	
	private KakaoAccount kakao_account;
}
