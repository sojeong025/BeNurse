package com.ssafy.offschedule.model;

import java.time.LocalDate;
import java.util.List;

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
@Table(name = "OFFSCHEDULE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Offschedule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "NURSE_ID")
	private long nurseID;
	
	@Column(name = "OFF_DATE")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate offdate;
	
	@Column(name = "REASON")
	private String reason;
}
