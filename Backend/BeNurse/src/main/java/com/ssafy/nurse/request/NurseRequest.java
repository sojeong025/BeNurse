package com.ssafy.nurse.request;

import com.ssafy.nurse.model.Nurse;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NurseRequest {
	private long ID;
	
	private String name;
	
	private long hospitalID;
	
	private long wardID;
	
	private int annual;
	
	private String grade;
	
	private String email;
	
	private String password;
	
	private boolean isAdmin;
	
	private String hospitalName;
	
	private String wardName;

	public Nurse makeNurse() {
		return Nurse.builder()
		.hospitalID(hospitalID)
		.annual(annual)
		.email(email)
		.grade(grade)
		.ID(ID)
		.isAdmin(isAdmin)
		.name(name)
		.password(password)
		.wardID(wardID)
		.build();
	}
}
