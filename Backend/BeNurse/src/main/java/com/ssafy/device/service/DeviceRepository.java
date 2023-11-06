package com.ssafy.device.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.device.model.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {


	List<Device> findAllByHospitalID(long hospitalID);

}
