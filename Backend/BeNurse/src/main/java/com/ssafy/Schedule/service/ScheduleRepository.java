package com.ssafy.Schedule.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Schedule.model.Schedule;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
