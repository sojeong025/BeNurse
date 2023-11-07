package com.ssafy.offschedule.model;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OffScheduleRequest {
	private long ID;
	private long nurseID;
	private List<String> offdate;
	private String reason;
}
