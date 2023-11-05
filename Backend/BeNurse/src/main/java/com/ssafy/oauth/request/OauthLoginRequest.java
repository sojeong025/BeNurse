package com.ssafy.oauth.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OauthLoginRequest {
	private String kakao_redirect_url;
	private String code;
}
