package com.ssafy.nurse.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "NOTICE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Nurse {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;
	
	@Column(name = "WARD_ID")
	private long wardID;
	
	@Column(name = "ANNUAL")
	private int annual;
}
