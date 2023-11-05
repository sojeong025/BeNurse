package com.ssafy.device.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.device.model.DeviceHistory;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistory, Long> {

}
