package com.ssafy.device.model;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "DEVICE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Device extends NFCResponse{

	@Id
	@Column(name = "ID")
	private String ID;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;

	@Column(name = "IMG")
	private String img;
	
	@Column(name = "AS_TEL")
	private String asTel;
}
