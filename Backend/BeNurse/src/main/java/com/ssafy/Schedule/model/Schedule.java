package com.ssafy.Schedule.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

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
public class Schedule implements Serializable{
	
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
	@JsonSerialize(using = LocalDateSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate workdate;
	
	
}
