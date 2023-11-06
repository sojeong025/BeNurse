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
@Table(name = "PATIENT_NFC")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PatientNFC extends NFCResponse{

	@Id
	@Column(name = "ID")
	private String ID;
	
	@Column(name = "PATIENT_ID")
	private long patientID;
}
