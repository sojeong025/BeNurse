package com.ssafy.Handover.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.Handover.model.Handover;
import com.ssafy.Handover.model.HandoverList;
import com.ssafy.Handover.model.HandoverSet;
import com.ssafy.Handover.model.MyHandover;
import com.ssafy.Handover.service.HandoverListRepository;
import com.ssafy.Handover.service.HandoverRepository;
import com.ssafy.Handover.service.HandoverSetRepository;
import com.ssafy.Handover.service.MyHandoverRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "인계장 묶음 API", tags = { "인계장 묶음." })
@RestController
@RequestMapping("/api/benurse/HandoverSet")
public class HandoverSetController {
	
	@Autowired
	HandoverSetRepository setRepo;
	
	@Autowired
	HandoverListRepository listRepo;
	
	@Autowired
	HandoverRepository handoverRepo;
	
	@Autowired
	MyHandoverRepository myhoRepo;
	
	@Autowired
	OauthService oauthService;
	
	
	// 인계장 묶음 생성 POST
	@PostMapping("/")
	@ApiOperation(value = "인계장 묶음 생성", notes = "인계장 묶음 생성")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverSet> registHandover(HandoverSet handoverSet) {
	    // 데이터베이스에 저장
	    HandoverSet savedHandoverSet = setRepo.save(handoverSet);

	    return new APIResponse<>(savedHandoverSet, HttpStatus.OK);
	}
	
	// 인계장 묶음 수정 PUT
	@PutMapping("/")
	@ApiOperation(value = "인계장 묶음 수정", notes = "인계장 묶음 수정")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverSet> updateHandoverSetById(HandoverSet updatedHandoverSet) {
		Optional<HandoverSet> optionHandoverSet = setRepo.findById(updatedHandoverSet.getID());
		
	    if (optionHandoverSet.isPresent()) {
	        updatedHandoverSet.setTime(LocalDateTime.now());
	        
	        // 업데이트된 인계장을 저장
	        setRepo.save(updatedHandoverSet);

	        return new APIResponse<>(updatedHandoverSet, HttpStatus.OK);
	    } else	
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	}
	
	// 인수자 인계장 조회 GET [묶음 ID]
	@GetMapping("/set")
	@ApiOperation(value = "인계장 묶음 조회 [묶음 ID]", notes = "인계장 묶음 ID를 통해 인계장 묶음 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverSet> getHandoverSetById(@RequestParam("ID") long ID, @RequestHeader("Authorizations") String token) {
		Nurse user = oauthService.getUser(token);
		Optional<HandoverSet> handoverSet = setRepo.findById(ID);

	    if (handoverSet.isPresent()) {
	    	Optional<MyHandover> optionmh = myhoRepo.findBySetIDAndTakeIDAndReaded(ID, user.getID(),"N");
	    	//
	    	if(optionmh.isPresent()) {
	    		MyHandover mh = optionmh.get();
	    		mh.setReaded(true);
	    		myhoRepo.save(mh);
	    	}
	        return new APIResponse<>(handoverSet.get(), HttpStatus.OK);
	    }else
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	}
	
	// 인수자 인계장 조회 GET [인계자 ID]
	@GetMapping("/take")
	@ApiOperation(value = "인계장 묶음 조회 [인계자 ID]", notes = "인계자 ID를 통해 인계장 묶음 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<HandoverSet>> getHandoverSetByGiveId(@RequestParam("GIVE_ID") long giveID) {
	    List<HandoverSet> handoverSet = setRepo.findAllByGiveID(giveID);

        return new APIResponse<>(handoverSet, HttpStatus.OK);
	}
	
	
	// 인계장 묶음 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "인계장 묶음 삭제", notes = "인계장 묶음을 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
    @CacheEvict(value = "handoverSet", key="#ID")
	public APIResponse<Void> deleteHandoverSetById(@RequestParam("ID") long ID) {
	    Optional<HandoverSet> handoverSet = setRepo.findById(ID);

	    if(handoverSet.isPresent()) {
	    	List<HandoverList> list = listRepo.findAllBySetID(ID);
	    	for(HandoverList l : list) {
	    		Optional<Handover> handover = handoverRepo.findById(l.getHandoverID());
	    		if(handover.isPresent())
	    			handoverRepo.delete(handover.get());
	    		listRepo.delete(l);
	    	}

	    	setRepo.delete(handoverSet.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			return new APIResponse(HttpStatus.NOT_FOUND);
	}  

	// 인수자 인계장 조회 GET [인계자 ID]
	@GetMapping("/details")
	@ApiOperation(value = "인계장 묶음 내역 조회", notes = "인계장 묶음 ID를 통해 인계장 묶음에 포함된 인계장 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Handover>> getDetail(@RequestParam("set_ID") long id){
		List<HandoverList> list = listRepo.findAllBySetID(id);
		List<Handover> resp = new ArrayList<>();
		for(HandoverList l : list) {
			Optional<Handover> handover = handoverRepo.findById(l.getHandoverID());
			if(handover.isPresent())
				resp.add(handover.get());
		}
		return new APIResponse<>(resp, HttpStatus.OK);
	}
}
