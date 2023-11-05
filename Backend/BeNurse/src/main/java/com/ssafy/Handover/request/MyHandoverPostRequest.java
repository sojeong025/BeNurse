package com.ssafy.Handover.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MyHandoverPostRequest {
	private long SetID;
	List<Long> takeIDs;
}
