package com.ssafy.device.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "DEVICE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Device {

	@Id
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;

	@Column(name = "IMG")
	private String img;
	
	@Column(name = "INFO")
	private String info;
	
	@Column(name = "AS_TEL")
	private String asTel;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime time;
}
