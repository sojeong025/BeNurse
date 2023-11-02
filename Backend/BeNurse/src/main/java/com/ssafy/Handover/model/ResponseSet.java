package com.ssafy.Handover.model;

import java.time.LocalDateTime;

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
public class ResponseSet {

	private long handoverSetID;

	private long takeID;

	private boolean readed;

	private long giveID;

	private LocalDateTime time;
}
