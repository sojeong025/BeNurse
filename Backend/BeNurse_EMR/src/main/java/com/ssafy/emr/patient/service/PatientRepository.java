package com.ssafy.emr.patient.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.emr.patient.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

}
