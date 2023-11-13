package com.ssafy.Handover.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.Handover.model.HandoverSet;
import com.ssafy.Handover.model.MyHandover;
import com.ssafy.Handover.model.ResponseSet;
import com.ssafy.Handover.request.MyHandoverPostRequest;
import com.ssafy.Handover.response.MyHandoverResponse;
import com.ssafy.Handover.service.HandoverSetRepository;
import com.ssafy.Handover.service.HandoverSetService;
import com.ssafy.Handover.service.MyHandoverRepository;
import com.ssafy.Handover.service.MyHandoverService;
import com.ssafy.Schedule.model.Schedule;
import com.ssafy.Schedule.service.ScheduleRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseService;
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
	MyHandoverService myhoServ;
	
	@Autowired
	HandoverSetRepository setRepo;
	
	@Autowired
	HandoverSetService setServ;
	
	@Autowired
	ScheduleRepository scheduleRepo;
	
	@Autowired
	NurseService nurseServ; 
	
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
	public APIResponse<MyHandover> registMyHandover(@RequestBody MyHandoverPostRequest req) {

		try {
			HandoverSet set = setServ.findById(req.getSetID());
			set.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
			setServ.save(set);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		for(long takeID : req.getTakeIDs()) {
			MyHandover handoversheet = new MyHandover();
			handoversheet.setSetID(req.getSetID());
			handoversheet.setTakeID(takeID);
			handoversheet.setReaded(false);
			myhoRepo.save(handoversheet);
		}
	    return new APIResponse<>(HttpStatus.OK);
	}
	
	// 내가 받은 인계장 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "내가 받은 인계장 목록 조회", notes = "내가 받은 모든 인계장을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = MyHandoverResponse.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<MyHandoverResponse>> getAllMyHandover(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<MyHandover> myhandover = myhoRepo.findAllByTakeID(nurse.getID());
		
		List<MyHandoverResponse> resp = new ArrayList<>();
		for(MyHandover mh : myhandover) {
			try {
				log.info(mh.toString());
				MyHandoverResponse mr = new MyHandoverResponse();
				HandoverSet set = setServ.findById(mh.getSetID());
				log.info(set.toString());
				mr.setHandoverSetID(set.getID());
				mr.setGiveID(set.getGiveID());
				mr.setGiveName(nurseServ.findById(set.getGiveID()).getName());
				mr.setTakeIDs(new ArrayList<>());
				mr.setTakeNames(new ArrayList<>());
				List<MyHandover> mhlist = myhoRepo.findAllBySetID(set.getID());
				for(MyHandover m : mhlist) {
					mr.getTakeIDs().add(m.getTakeID());
					mr.getTakeNames().add(nurseServ.findById(m.getTakeID()).getName());
				}
				mr.setTime(set.getTime().toLocalDate());
				
				Optional<Schedule> work = scheduleRepo.findByNurseIDAndWorkdate(set.getGiveID(), set.getTime().toLocalDate());
				if(work.isEmpty()) {
					log.error("not found schedule (" + set.getGiveID() +", " + set.getTime().toLocalDate() + ")");
					continue;
				}
				String worktime = work.get().getWorktime();
				
				mr.setGiveWorkTime(worktime);
				mr.setReaded(mh.isReaded());
				
				resp.add(mr);
			}catch (Exception e) {
				e.printStackTrace();
				log.error("not found myHandoverSet (id:"+mh.getSetID()+")");
			}
		}
		
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
	
	// 내가 쓴 인계장 조회 GET
	@GetMapping("/send")
	@ApiOperation(value = "내가 쓴 인계장 목록 조회", notes = "내가 쓴 모든 인계장을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = MyHandoverResponse.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public APIResponse<List<MyHandoverResponse>> getAllMySendHandover(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<HandoverSet> handoverSet = setRepo.findAllByGiveID(nurse.getID());
		
		List<MyHandoverResponse> resp = new ArrayList<>();
		for(HandoverSet set : handoverSet) {
			try {
				List<MyHandover> exist = myhoRepo.findAllBySetID(set.getID());
				if(exist.size() == 0)
					throw new Exception();
				
				log.info(set.toString());
				MyHandoverResponse mr = new MyHandoverResponse();
				
				mr.setHandoverSetID(set.getID());
				mr.setGiveID(set.getGiveID());
				mr.setGiveName(nurseServ.findById(set.getGiveID()).getName());
				mr.setTakeIDs(new ArrayList<>());
				mr.setTakeNames(new ArrayList<>());
				List<MyHandover> mhlist = myhoRepo.findAllBySetID(set.getID());
				for(MyHandover m : mhlist) {
					mr.getTakeIDs().add(m.getTakeID());
					mr.getTakeNames().add(nurseServ.findById(m.getTakeID()).getName());
				}
				mr.setTime(set.getTime().toLocalDate());
				
				Optional<Schedule> work = scheduleRepo.findByNurseIDAndWorkdate(set.getGiveID(), set.getTime().toLocalDate());
				if(work.isEmpty()) {
					log.error("not found schedule (" + set.getGiveID() +", " + set.getTime().toLocalDate() + ")");
					continue;
				}
				String worktime = work.get().getWorktime();
				
				mr.setGiveWorkTime(worktime);
				mr.setReaded(false);
				
				resp.add(mr);
			}catch (Exception e) {
				e.printStackTrace();
				log.error("not found HandoverSet (id:"+set.getID()+") or not sended");
			}
		}
		
	    return new APIResponse<>(resp, HttpStatus.OK);
	}
}
