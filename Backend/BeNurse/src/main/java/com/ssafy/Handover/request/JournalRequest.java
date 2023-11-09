package com.ssafy.Handover.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JournalRequest {
	private long journalID;
	private String comment;
}
