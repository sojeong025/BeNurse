package com.ssafy.Handover.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.Handover.model.HandoverSet;
import com.ssafy.Handover.model.MyHandover;
import com.ssafy.Handover.model.ResponseSet;
import com.ssafy.Handover.service.HandoverSetRepository;
import com.ssafy.Handover.service.MyHandoverRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "내 인계장 API", tags = { "내 인계장." })
@RestController
@RequestMapping("/api/benurse/myhandover")
@Slf4j
public class MyHandoverController {

	@Autowired
	MyHandoverRepository myhoRepo;
	
	@Autowired
	HandoverSetRepository setRepo;
	
	@Autowired
	OauthService oauthService;
	
	
	// 내 인계장 등록 POST
	@PostMapping("")
	@ApiOperation(value = "내 인계장 등록", notes = "내 인계장을 등록한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = MyHandover.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<MyHandover> registMyHandover(@RequestParam("setID") long SetID, @RequestParam("take_id_list") List<Long> takeIDs) {

		for(long takeID : takeIDs) {
			MyHandover handoversheet = new MyHandover();
			handoversheet.setHandoverSetID(SetID);
			handoversheet.setTakeID(takeID);
			handoversheet.setReaded(false);
			myhoRepo.save(handoversheet);
		}
	    return new APIResponse<>(HttpStatus.OK);
	}
	
	// 내가 받은 인계장 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "내 인계장 조회", notes = "내가 받은 모든 인계장을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = MyHandover.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<ResponseSet>> getAllMyHandover(@RequestHeader("access-Token") String token) {
		Nurse user = oauthService.getUser(token);
		List<MyHandover> myhandover = myhoRepo.findAllByTakeID(user.getID());
		
		List<ResponseSet> resp = new ArrayList<>();
		for(MyHandover mh : myhandover) {
			ResponseSet rs = new ResponseSet();
			HandoverSet set = setRepo.findById(mh.getHandoverSetID()).get();
			rs.setHandoverSetID(set.getID());
			rs.setGiveID(set.getGiveID());
			rs.setTakeID(mh.getTakeID());
			rs.setTime(set.getTime());
			rs.setReaded(mh.isReaded());
			resp.add(rs);
		}
		
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
}
