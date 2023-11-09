package com.ssafy.Handover.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HandoverRequest {
	private long ID;
	private long patientID;
	private List<String> special;
	private List<String> cc;
	private List<String> etc;
	private List<JournalRequest> journals;
}
