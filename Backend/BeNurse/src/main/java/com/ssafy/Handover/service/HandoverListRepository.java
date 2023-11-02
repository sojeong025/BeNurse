package com.ssafy.Handover.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Handover.model.HandoverList;

@Repository
public interface HandoverListRepository extends JpaRepository<HandoverList, Long> {
	List<HandoverList> findAllBySetID(long SetID);
	List<HandoverList> findAllByHandoverID(long HandoverID);
}
