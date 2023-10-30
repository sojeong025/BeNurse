package com.ssafy.Schedule.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Schedule.model.Schedule;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	List<Schedule> findAllByworkdateBetween(Date startDate, Date endDate);
	List<Schedule> findByNurseIDAndWorkdateBetween(long nurseID, Date startDate, Date endDate);
}
