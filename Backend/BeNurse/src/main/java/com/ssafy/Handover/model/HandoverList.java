package com.ssafy.Handover.model;

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
@Table(name = "HANDOVERLIST")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class HandoverList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "SET_ID")
	private long setID;
	
	@Column(name = "HANDOVER_ID")
	private long handoverID;
}
