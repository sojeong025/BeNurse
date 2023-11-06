package com.ssafy.device.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.device.model.NFC;

public interface NFCRepository extends JpaRepository<NFC, String> {

}
