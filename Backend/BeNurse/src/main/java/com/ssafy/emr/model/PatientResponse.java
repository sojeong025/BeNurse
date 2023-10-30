package com.ssafy.emr.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientResponse {
	Patient patient;
	List<CC> cc;
}
