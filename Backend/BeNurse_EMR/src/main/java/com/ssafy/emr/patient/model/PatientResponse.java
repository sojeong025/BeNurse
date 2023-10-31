package com.ssafy.emr.patient.model;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class PatientResponse implements Serializable{
	Patient patient;
	List<CC> cc;
}
