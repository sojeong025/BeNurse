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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.hospital.model.Hospital;
import com.ssafy.notice.model.Notice;
import com.ssafy.notice.service.NoticeRepository;
import com.ssafy.notice.service.NoticeService;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

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
	
	@Autowired
	NoticeService noticeServ;
	
	@Autowired
	OauthService oauthService;
	
	// 공지사항 등록 POST
	@PostMapping("")
	@ApiOperation(value = "공지사항 등록", notes = "공지사항을 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Notice> registNotice(@RequestHeader("Authorization") String token, @RequestBody Notice notice) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		notice.setHospitalID(nurse.getHospitalID());
		notice.setWriterName(nurse.getName());
		notice.setWriterID(nurse.getID());
		notice.setTime(LocalDateTime.now());
		
	    Notice savedNotice = noticeRepo.save(notice);
	    return new APIResponse<>(savedNotice, HttpStatus.OK);
	}
	
	// 전체 공지사항 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "전체 공지사항 조회", notes = "모든 공지사항을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<Notice>> getAllNotice(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<Notice> notice = noticeRepo.findAllByHospitalID(nurse.getHospitalID());
	    return new APIResponse<>(notice, HttpStatus.OK);
	}

	// 특정 공지사항 조회 GET
	@GetMapping("")
	@ApiOperation(value = "특정 공지사항 조회", notes = "공지사항 ID로 특정 게시글 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Notice.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Notice> getNoticeById(@RequestParam("ID") long ID) {
		try {
			Notice notice = noticeServ.findById(ID);
			return new APIResponse<>(notice, HttpStatus.CREATED);
		}catch (Exception e) {
			e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND); 
		}
	}

	// 공지사항 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "공지사항 수정", notes = "공지사항 내용 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Notice.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Notice> updateNoticeById(@RequestBody Notice updatedNotice){
		try {
			// 업데이트된 공지사항을 저장
			Notice savedNotice = noticeServ.save(updatedNotice);
	        return new APIResponse<>(savedNotice, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}
	
	// 공지사항 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "공지사항 삭제", notes = "공지사항을 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Notice.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteNoticeById(@RequestBody IDRequest req) {
		 try {
		    	noticeServ.delete(req.getID());
				return new APIResponse<>(HttpStatus.OK);
		    }catch (Exception e) {
		    	e.printStackTrace();
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		    }
	} 
}
