package com.ssafy.Handover.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.ssafy.common.converter.BooleanToYNConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "HANDOVER")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Handover {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "PATIENT_ID")
	private long patientID;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH-mm-ss")
	private LocalDateTime time;
	
	@Column(name = "ISPUBLISH")
	@Convert(converter = BooleanToYNConverter.class)
	private boolean ispublish;
	
	@Column(name = "SPECIAL")
	private String special;
	
	@Column(name = "ETC")
	private String etc;
	
	@Column(name = "CC")
	private String cc;
}
