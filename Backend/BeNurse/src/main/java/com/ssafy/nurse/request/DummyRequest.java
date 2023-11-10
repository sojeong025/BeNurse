package com.ssafy.nurse.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DummyRequest {
	private String name;
	private String email;
	private int annual;
	private long hospitalID;
	private long wardID;
}
