package com.ssafy.Schedule.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.Handover.model.HandoverSet;

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
public class ScheduleSearchCondition {
	
    @DateTimeFormat(pattern = "yyyy-MM-dd") 
    private LocalDate startDate;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd") 
    private LocalDate endDate;
}
