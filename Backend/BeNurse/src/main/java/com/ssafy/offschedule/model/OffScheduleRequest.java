package com.ssafy.offschedule.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OffScheduleRequest {
	private List<String> date;
	private String content;
}
