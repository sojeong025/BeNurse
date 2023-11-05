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
	@Column(name = "DEVICE_ID")
	private long deviceID;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;

	@Column(name = "DEVICEIMG")
	private String deviceImg;
	
	@Column(name = "DEVICE_INFO")
	private String deviceInfo;
	
	@Column(name = "AS_TEL")
	private String asTel;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime time;
}
