package com.ssafy.nurse.response;

import com.ssafy.nurse.model.Nurse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NurseResponse {
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
	
	public NurseResponse(Nurse nurse) {
		this.ID = nurse.getID();
		this.name = nurse.getName();
		this.hospitalID = nurse.getHospitalID();
		this.wardID = nurse.getWardID();
		this.annual = nurse.getAnnual();
		this.grade = nurse.getGrade();
		this.email = nurse.getEmail();
		this.password = nurse.getPassword();
		this.isAdmin = nurse.isAdmin();
	}
}
