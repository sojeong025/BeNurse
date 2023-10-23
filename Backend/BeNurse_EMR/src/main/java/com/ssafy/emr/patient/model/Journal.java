package com.ssafy.emr.patient.model;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;

import org.springframework.format.annotation.DateTimeFormat;

public class Journal {

	@Column(name = "PATIENTID")
	private long patientID;
	
	@Column(name = "WRITERID")
	private long writerID;
	
	@Column(name = "CONTENT")
	private String content;
	
	@Column(name = "DATE")
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date date;
	
	@Column(name = "TIME")
	private Time time;
	
	@Column(name = "CATEGORY")
	private String category;
}
