package com.ssafy.Handover.model;

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
@Table(name = "MYHANDOVER")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MyHandover {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HANDOVERSET_ID")
	private long handoverSetID;
	
	@Column(name = "GIVE_ID")
	private long giveID;
	
	@Column(name = "TAKE_ID")
	private long takeID;
	
	@Column(name = "READED")
	private boolean readed;
	
	@Column(name = "TIME")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime time;
}
