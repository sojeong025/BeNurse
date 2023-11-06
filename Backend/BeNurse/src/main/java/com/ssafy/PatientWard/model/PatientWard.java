package com.ssafy.PatientWard.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.common.converter.BooleanToYNConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "PATIENT_WARD")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PatientWard {

	@Id
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "WARD_ID")
	private long wardID;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;
	
	@Column(name = "IS_HOSPITALIZED")
	@Convert(converter = BooleanToYNConverter.class)
	private boolean isHospitalized;
}
