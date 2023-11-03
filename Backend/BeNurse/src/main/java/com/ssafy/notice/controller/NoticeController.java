package com.ssafy.notice.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.notice.model.Notice;
import com.ssafy.notice.service.NoticeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "공지 API", tags = { "공지사항." })
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
	public APIResponse<Notice> registNotice(Notice notice) {

		notice.setTime(LocalDateTime.now());
		
	    Notice savedNotice = noticeRepo.save(notice);
	    return new APIResponse<>(savedNotice, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	@ApiOperation(value = "전체 공지사항 조회", notes = "모든 공지사항을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@Cacheable(value="notice")
	public APIResponse<List<Notice>> getAllNotice() {
		List<Notice> notice = noticeRepo.findAll();
	    return new APIResponse<>(notice, HttpStatus.OK);
	}

	@GetMapping("")
	@ApiOperation(value = "특정 공지사항 조회", notes = "공지사항 ID로 특정 게시글 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Notice.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	@Cacheable(value="notice", key="#ID")
	public APIResponse<Notice> getNoticeById(@RequestParam("ID") long ID) {
	    Optional<Notice> notice = noticeRepo.findById(ID);

	    if (notice.isPresent())
	        return new APIResponse(notice.get(), HttpStatus.OK);
	    else
	        return new APIResponse(HttpStatus.NOT_FOUND);
	}

	@PutMapping("")
	@ApiOperation(value = "공지사항 수정", notes = "공지사항 내용 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Notice.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	@CachePut(value = "notice", key = "#updatedNotice.ID")
	public APIResponse<Notice> updateNoticeById(Notice updatedNotice){
		Optional<Notice> optionNotice = noticeRepo.findById(updatedNotice.getID());
		
	    if (optionNotice.isPresent()) {
	        Notice existingNotice = optionNotice.get();

	        // 기존 공지사항 정보를 업데이트
	        if (updatedNotice.getTitle() != null) {
	        	existingNotice.setTitle(updatedNotice.getTitle());
	        }
	        if (updatedNotice.getContent() != null) {
	        	existingNotice.setContent(updatedNotice.getContent());
	        }

	        // 업데이트된 공지사항을 저장
	        noticeRepo.save(existingNotice);

	        return new APIResponse<>(existingNotice, HttpStatus.OK);
	    } else	
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	    
	}
	
	@DeleteMapping("")
	@ApiOperation(value = "공지사항 삭제", notes = "공지사항을 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
    @CacheEvict(value = "notice", key="#ID")
	public APIResponse<Void> deleteNoticeById(@RequestParam("ID") long ID) {
	    Optional<Notice> notice = noticeRepo.findById(ID);

	    if(notice.isPresent()) {
	    	noticeRepo.delete(notice.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			return new APIResponse(HttpStatus.NOT_FOUND);
	} 
}
