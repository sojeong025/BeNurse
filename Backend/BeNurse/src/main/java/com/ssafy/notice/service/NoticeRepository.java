package com.ssafy.notice.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.notice.model.Notice;


@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

	List<Notice> findAllByHospitalID(long hospitalID);

	List<Notice> findAllByHospitalIDOrderByIDDesc(long hospitalID);

}
