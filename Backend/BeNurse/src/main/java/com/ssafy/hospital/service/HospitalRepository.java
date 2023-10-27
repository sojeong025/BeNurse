package com.ssafy.hospital.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hospital.model.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}
