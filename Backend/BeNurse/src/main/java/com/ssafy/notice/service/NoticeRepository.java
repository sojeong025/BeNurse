package com.ssafy.notice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.notice.model.Notice;


@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

}
