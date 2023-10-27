package com.ssafy.Handover.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Handover.model.Handover;

@Repository
public interface HandoverRepository extends JpaRepository<Handover, Long> {

}
