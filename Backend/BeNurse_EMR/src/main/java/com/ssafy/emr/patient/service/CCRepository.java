package com.ssafy.emr.patient.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.emr.patient.model.CC;

@Repository
public interface CCRepository extends JpaRepository<CC, Long>{
	List<CC> findAllByPatientID(Long patientID);
}
