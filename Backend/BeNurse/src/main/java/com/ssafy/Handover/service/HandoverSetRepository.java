package com.ssafy.Handover.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.Handover.model.HandoverSet;

@Repository
public interface HandoverSetRepository extends JpaRepository<HandoverSet, Long>  {
	List<HandoverSet> findAllByGiveID(long giveID);
	
	@Query("SELECT h FROM HandoverSet h WHERE h.ID NOT IN (SELECT DISTINCT l.setID FROM HandoverList l) AND h.ID NOT IN (SELECT DISTINCT m.setID FROM MyHandover m)")
	List<HandoverSet> findEmptySets();

//	List<HandoverSet> findAllByGiveIDOrderByHandoversetID(long id);

	List<HandoverSet> findAllByGiveIDOrderByID(long id);
}
