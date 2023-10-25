package com.ssafy.emr.patient.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.emr.patient.model.Journal;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long>{
	List<Journal> findAllByDatetimeGreaterThanEqualAndDatetimeLessThanEqualAndPatientIDAndCategory(LocalDateTime from, LocalDateTime to, long patientId, String category);
	List<Journal> findAllByDatetimeGreaterThanEqualAndDatetimeLessThanEqualAndPatientID(LocalDateTime from, LocalDateTime to, long patientID);
	List<Journal> findAllByPatientID(long patientID);
}
