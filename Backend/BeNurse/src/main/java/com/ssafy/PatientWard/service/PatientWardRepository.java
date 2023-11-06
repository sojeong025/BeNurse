package com.ssafy.PatientWard.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.PatientWard.model.PatientWard;

public interface PatientWardRepository extends JpaRepository<PatientWard, Long> {

	List<PatientWard> findAllByHospitalIDAndIsHospitalized(long hospitalID, boolean isHospitalized);

}
