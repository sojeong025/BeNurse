package com.ssafy.emr.model;


import java.io.Serializable;
import java.time.LocalDateTime;

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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Journal implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "PATIENTID")
	private long patientID;
	
	@Column(name = "WRITERID")
	private long writerID;
	
	@Column(name = "CONTENT")
	private String content;
	
	@Column(name = "DATETIME")
	private LocalDateTime datetime;

	@Column(name = "CATEGORY")
	private String category;
	
	@Column(name = "NAME")
	private String name;
}
