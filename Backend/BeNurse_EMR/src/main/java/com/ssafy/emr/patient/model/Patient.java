package com.ssafy.emr.patient.model;

import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
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
@Table(name = "BADGE")
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
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date hospitalization;
	
	@Column(name = "LEAVE")
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date leave;
	
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
	
	
}
