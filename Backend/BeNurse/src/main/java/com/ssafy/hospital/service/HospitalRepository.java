package com.ssafy.hospital.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hospital.model.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}
