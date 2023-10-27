package com.ssafy.hospital.model;

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
@Table(name = "HOSPITAL")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Hospital {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "DEVICEURL")
	private String deviceURL;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "TEL")
	private String tel;
	
	@Column(name = "ADDRESS")
	private String address;
	
	@Column(name = "EMR")
	private String emr;
}
