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
@Table(name = "BEACON")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Beacon {

	@Id
	@Column(name = "ID")
	private long ID;
	
	@Column(name = "INFO")
	private String info;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "FLOOR")
	private long floor;
	
	@Column(name = "HOSPITAL_ID")
	private long hospitalID;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime time;
}
