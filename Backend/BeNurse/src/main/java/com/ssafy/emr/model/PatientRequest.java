package com.ssafy.emr.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PatientRequest {

	private long ID;
	private String name;
	private int age;
	private String gender;
	private String img;
	private String disease;
	private String surgery;
	private LocalDate hospitalization;
	private LocalDate discharge;
	private String history;
	private String medicine;
	private boolean drinking;
	private boolean smoking;
	private String alergy;
	private String selfmedicine;
	
	private long hospitalID;
	private long wardID;
}
