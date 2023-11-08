package com.ssafy.Schedule.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class ScheduleResponse {
	private long ID;
	
	private long nurseID;
	
	private String name;
	
	private int annual;

	private long wardID;

	private long hospitalID;
	
	private String worktime;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate workdate;
	
	public ScheduleResponse(Schedule s) {
		this.ID = s.getID();
		this.nurseID = s.getNurseID();
		this.wardID = s.getWardID();
		this.hospitalID = s.getHospitalID();
		this.worktime = s.getWorktime();
		this.workdate = s.getWorkdate();
	}
}
