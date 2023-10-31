package com.ssafy.emr.service;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.emr.model.Journal;

@Service
public class EMRService {
	
	private final String EMR_URL="http://k9e105.p.ssafy.io:9003/api/emr";
	
	public ResponseEntity<Void> registJournalById(Journal journal){
		HttpEntity<Journal> request = new HttpEntity<>(journal);
		RestTemplate rt = new RestTemplate();
		
		return rt.exchange(
				EMR_URL+"",
				HttpMethod.POST,
				request,
				Void.class);
	}
	
	public ResponseEntity<List<Journal>> getAllJournal(){
		HttpEntity<Void> request = new HttpEntity<>(null);
		RestTemplate rt = new RestTemplate();
		
		return rt.exchange(
				EMR_URL+"/journal/all",
				HttpMethod.GET,
				request,
				new ParameterizedTypeReference<List<Journal>>() {}
				);
	}
	
	public ResponseEntity<Void> updateJournal(Journal journal){
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		try {
		String json = new ObjectMapper().writeValueAsString(journal);
		
		HttpEntity<String> request = new HttpEntity<>(json, headers);
		RestTemplate rt = new RestTemplate();
		
		return rt.exchange(
				EMR_URL+"/journal",
				HttpMethod.PUT,
				request,
				Void.class
				);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
}
