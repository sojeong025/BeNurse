package com.ssafy.emr.model;

import com.ssafy.hospital.model.Hospital;
import com.ssafy.hospital.model.Ward;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PatientWardResponse {
		private PatientResponse patient;
		private Hospital hospital;
		private Ward ward;
}
