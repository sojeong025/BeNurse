package com.ssafy.Handover.response;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MyHandoverResponse {
	private long giveID;
	private List<Long> takeIDs;
	private long handoverSetID;
	private String giveWorkTime;
	private boolean readed;
	private LocalDate time;
}
