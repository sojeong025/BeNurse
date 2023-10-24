package com.ssafy.notice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.notice.model.Notice;
import com.ssafy.notice.service.NoticeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "공지 API", tags = { "Notice." })
@RestController
@RequestMapping("/api/benurse/notice")
public class NoticeController {
	
	@Autowired
	NoticeRepository noticeRepo;
	
	@PostMapping("")
	@ApiOperation(value = "공지사항 등록", notes = "공지사항을 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Notice> createNotice(Notice notice) {

	    Notice savedNotice = noticeRepo.save(notice);
	    return new ResponseEntity<>(savedNotice, HttpStatus.OK);
	}
	
}
