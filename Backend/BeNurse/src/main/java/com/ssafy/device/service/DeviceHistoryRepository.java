package com.ssafy.device.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.device.model.Device;
import com.ssafy.device.model.DeviceHistory;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistory, Long> {

	List<DeviceHistory> findAllByDeviceID(String deviceID);
	List<DeviceHistory> findAllByDeviceIDAndTimeBetween(String deviceID, LocalDateTime start, LocalDateTime end);
	
}
