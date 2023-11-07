package com.ssafy.emr.patient.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.ssafy.emr.common.converter.BooleanToYNConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "PATIENT")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;

	@Column(name = "NAME")
	private String name;

	@Column(name = "AGE")
	private int age;

	@Column(name = "GENDER")
	private String gender;

	@Column(name = "IMG")
	private String img;

	@Column(name = "DISEASE")
	private String disease;

	@Column(name = "SURGERY")
	private String surgery;

	@Column(name = "HOSPITALIZATION")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate hospitalization;

	@Column(name = "DISCHARGE")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate discharge;

	@Column(name = "HISTORY")
	private String history;

	@Column(name = "MEDICINE")
	private String medicine;

	@Column(name = "DRINKING")
	@Convert(converter = BooleanToYNConverter.class)
	private boolean drinking;

	@Column(name = "SMOKING")
	@Convert(converter = BooleanToYNConverter.class)
	private boolean smoking;

	@Column(name = "ALERGY")
	private String alergy;

	@Column(name = "SELFMEDICINE")
	private String selfmedicine;
	
	@Column(name = "CC_MAIN")
	private String ccMain;

}
