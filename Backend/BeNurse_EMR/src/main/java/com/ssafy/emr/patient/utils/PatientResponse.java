package com.ssafy.emr.patient.utils;

import java.util.List;

import com.ssafy.emr.patient.model.CC;
import com.ssafy.emr.patient.model.Patient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class PatientResponse {
	Patient patient;
	List<CC> cc;
}
