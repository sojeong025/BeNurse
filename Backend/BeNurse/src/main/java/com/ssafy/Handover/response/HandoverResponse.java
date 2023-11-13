package com.ssafy.Handover.response;

import java.util.List;

import com.ssafy.Handover.request.JournalRequest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HandoverResponse {
	private long ID;
	private long patientID;
	private String patientName;
	private String wardName;
	private int age;
	private String gender;
	private List<String> special;
	private List<String> cc;
	private List<String> etc;
	private List<JournalRequest> journals;
}
