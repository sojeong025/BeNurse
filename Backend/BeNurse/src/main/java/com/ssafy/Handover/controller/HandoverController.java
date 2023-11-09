package com.ssafy.Handover.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.Handover.model.Handover;
import com.ssafy.Handover.model.HandoverContent;
import com.ssafy.Handover.model.HandoverList;
import com.ssafy.Handover.request.HandoverPostRequest;
import com.ssafy.Handover.request.HandoverRequest;
import com.ssafy.Handover.request.JournalRequest;
import com.ssafy.Handover.service.HandoverContentRepository;
import com.ssafy.Handover.service.HandoverListRepository;
import com.ssafy.Handover.service.HandoverRepository;
import com.ssafy.Handover.service.HandoverService;
import com.ssafy.Handover.service.HandoverSetRepository;
import com.ssafy.Handover.service.MyHandoverRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "인계장 API", tags = { "인계장." })
@RestController
@RequestMapping("/api/benurse/Handover")
public class HandoverController {

	@Autowired
	HandoverRepository handoverRepo;
	
	@Autowired
	HandoverService handoverServ;
	
	@Autowired
	HandoverContentRepository contentRepo;
	
	@Autowired
	HandoverSetRepository handvoersetRepo;
	
	@Autowired
	HandoverListRepository listRepo;
	
	@Autowired
	MyHandoverRepository myhandoverRepo;
	
	// 인계자 인계장 작성 POST
	@PostMapping("")
	@ApiOperation(value = "인계자 인계장 작성", notes = "인계장을 작성하여 DB에 등록, 등록된 인계장 ID를 반환")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Handover.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Handover> registHandover(@RequestBody HandoverPostRequest req) {		
		// 인계장 생성
		Handover handover = new Handover();
		handover.setPatientID(req.getHandover().getPatientID());
		
		// 데이터베이스에 저장
	    Handover savedHandover = handoverRepo.save(handover);
	    
	    // 인계장 묶음과 연결
	    HandoverList newList = new HandoverList();
	    newList.setHandoverID(savedHandover.getID());
	    newList.setSetID(req.getSetID());
		listRepo.save(newList);

	    return new APIResponse<>(savedHandover, HttpStatus.OK);
	}

	// 인계자 인계장 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "인계자 인계장 수정", notes = "인계장을 수정하여 DB에 등록, 등록된 인계장 ID를 반환")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverPostRequest.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverPostRequest> updateHandoverById(@RequestBody HandoverPostRequest req) {
		try {
			// 기존에 작성된 내용들 삭제
			contentRepo.deleteAllByHandoverID(req.getHandover().getID());
			
			// 특이사항 저장
		    for(String s : req.getHandover().getSpecial()) {
		    	HandoverContent content = new HandoverContent();
		    	content.setCategory("special");
		    	content.setContent(s);
		    	content.setHandoverID(req.getHandover().getID());
		    	contentRepo.save(content);
		    }
		    
		    // 주호소 저장
		    for(String s : req.getHandover().getCc()) {
		    	HandoverContent content = new HandoverContent();
		    	content.setCategory("cc");
		    	content.setContent(s);
		    	content.setHandoverID(req.getHandover().getID());
		    	contentRepo.save(content);
		    }
		    
		    // 기타사항 저장
		    for(String s : req.getHandover().getEtc()) {
		    	HandoverContent content = new HandoverContent();
		    	content.setCategory("etc");
		    	content.setContent(s);
		    	content.setHandoverID(req.getHandover().getID());
		    	contentRepo.save(content);
		    }
		    
		    // 간호일지 저장
		    for(JournalRequest j : req.getHandover().getJournals()) {
		    	HandoverContent content = new HandoverContent();
		    	content.setCategory("journal");
		    	content.setContent(j.getComment());
		    	content.setHandoverID(req.getHandover().getID());
		    	content.setJournalID(j.getJournalID());
		    	contentRepo.save(content);
		    }
		    
	        return new APIResponse<>(req, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}
	
	// 인수자 인계장 조회 GET
	@GetMapping("")
	@ApiOperation(value = "인수자 인계장 조회", notes = "인계장 ID를 통해 인계장 내용 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverRequest.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverRequest> getHandoverById(@RequestParam("ID") long ID) {
	    try {
	    	HandoverRequest resp = new HandoverRequest();
	    	Handover handover = handoverServ.findById(ID);
	    	resp.setID(handover.getID());
	    	resp.setPatientID(handover.getPatientID());
	    	resp.setSpecial(new ArrayList<>());
	    	resp.setCc(new ArrayList<>());
	    	resp.setEtc(new ArrayList<>());
	    	resp.setJournals(new ArrayList<>());
	    	List<HandoverContent> contents = contentRepo.findAllByHandoverID(handover.getID());
	    	for(HandoverContent content : contents) {
	    		switch (content.getCategory()){
	    		case "special":
	    			resp.getSpecial().add(content.getContent());
	    			break;
	    		case "cc":
	    			resp.getCc().add(content.getContent());
	    			break;
	    		case "etc":
	    			resp.getEtc().add(content.getContent());
	    			break;
	    		case "journal":
	    			JournalRequest journal = new JournalRequest();
	    			journal.setJournalID(content.getJournalID());
	    			journal.setComment(content.getContent());
	    			resp.getJournals().add(journal);
	    			break;
	    		}
	    	}
	    	return new APIResponse<>(resp, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
	
	// 인계장 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "인계장 삭제", notes = "인계장을 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Handover.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteHandoverById(@RequestBody IDRequest req) {
		try {
	    	handoverServ.delete(req.getID());
			return new APIResponse<>(HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	} 
} 
