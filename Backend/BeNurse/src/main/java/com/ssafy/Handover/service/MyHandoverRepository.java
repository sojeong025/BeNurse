package com.ssafy.Handover.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.Handover.model.MyHandover;

@Repository
public interface MyHandoverRepository extends JpaRepository<MyHandover, Long> {
	List<MyHandover> findAllByTakeID(long id);
	Optional<MyHandover> findBySetIDAndTakeIDAndReaded(long setID, long takeID, boolean b);
	List<MyHandover> findAllBySetID(long ID);
	List<MyHandover> findAllByTakeIDOrderBySetID(long id);


}
