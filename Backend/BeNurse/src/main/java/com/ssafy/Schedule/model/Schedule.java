package com.ssafy.Schedule.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "SCHEDULE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Schedule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "NURSE_ID")
	private long nurseID;

	@Column(name = "WARD_ID")
	private long wardID;

	@Column(name = "HOSPITAL_ID")
	private long hospitalID;
	
	@Column(name = "WORK_TIME")
	private String worktime;
	
	@Column(name = "WORK_DATE")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate workdate;
	
	
}
