package com.ssafy.device.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.device.model.PatientNFC;

public interface PatientNFCRepository extends JpaRepository<PatientNFC, String> {

}
