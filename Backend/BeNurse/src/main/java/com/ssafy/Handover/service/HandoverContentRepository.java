package com.ssafy.Handover.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.Handover.model.HandoverContent;

@Repository
public interface HandoverContentRepository extends JpaRepository<HandoverContent, Long>{

	List<HandoverContent> findAllByHandoverID(long id);
	@Transactional
	void deleteAllByHandoverID(long id);

}
