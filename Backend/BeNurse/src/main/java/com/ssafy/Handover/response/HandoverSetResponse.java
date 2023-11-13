package com.ssafy.Handover.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HandoverSetResponse {
	private long handoverSetID;
	private String giveWorkTime;
	private LocalDateTime updatedAt;
}
