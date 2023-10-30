package com.ssafy.common.utils;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoAccount{
	private String has_email;
	private String email_needs_agreement;
	private String is_email_valid;
	private String email;
}