package com.ssafy.device.model;

import java.time.LocalDateTime;

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
@Table(name = "DEVICE_HISTORY")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DeviceHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "PATIENT_ID")
	private long patientID;
	
	@Column(name = "BEACON_ID")
	private String beaconID;
	
	@Column(name = "DEVICE_ID")
	private String deviceID;
	
	@Column(name = "NURSE_ID")
	private long nurseID;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime time;
}
