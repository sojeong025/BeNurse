package com.ssafy.emr.common.utils;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class APIResponse<T> {
	T responseData;
	HttpStatus status;
	
	public APIResponse(HttpStatus status){
		this.status = status;
	}
}
