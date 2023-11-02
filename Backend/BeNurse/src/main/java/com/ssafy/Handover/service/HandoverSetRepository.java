package com.ssafy.Handover.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Handover.model.HandoverSet;

@Repository
public interface HandoverSetRepository extends JpaRepository<HandoverSet, Long>  {
	List<HandoverSet> findByGiveID(long giveID);
}
