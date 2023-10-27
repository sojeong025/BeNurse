package com.ssafy.Handover.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.Handover.model.Handover;

public interface HandoverRepository extends JpaRepository<Handover, Long> {

}
