package com.ssafy.device.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.device.model.Beacon;

public interface BeaconRepository extends JpaRepository<Beacon, String> {
	List<Beacon> findAllByHospitalID(long hospitalID);

}
