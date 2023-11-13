package com.ssafy.Handover.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.ssafy.Handover.model.Handover;
import com.ssafy.Handover.model.HandoverContent;
import com.ssafy.Handover.model.HandoverList;
import com.ssafy.Handover.model.HandoverSet;
import com.ssafy.Handover.model.MyHandover;
import com.ssafy.Handover.request.HandoverRequest;
import com.ssafy.Handover.request.JournalRequest;
import com.ssafy.Handover.response.HandoverResponse;
import com.ssafy.Handover.response.HandoverSetResponse;
import com.ssafy.Handover.service.HandoverContentRepository;
import com.ssafy.Handover.service.HandoverListRepository;
import com.ssafy.Handover.service.HandoverRepository;
import com.ssafy.Handover.service.HandoverService;
import com.ssafy.Handover.service.HandoverSetRepository;
import com.ssafy.Handover.service.HandoverSetService;
import com.ssafy.Handover.service.MyHandoverRepository;
import com.ssafy.Handover.service.MyHandoverService;
import com.ssafy.PatientWard.model.PatientWard;
import com.ssafy.PatientWard.service.PatientWardRepository;
import com.ssafy.PatientWard.service.PatientWardService;
import com.ssafy.Schedule.model.Schedule;
import com.ssafy.Schedule.service.ScheduleRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.emr.model.Patient;
import com.ssafy.emr.model.PatientResponse;
import com.ssafy.emr.service.EMRService;
import com.ssafy.hospital.model.Ward;
import com.ssafy.hospital.service.WardService;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "인계장 묶음 API", tags = { "인계장 묶음." })
@RestController
@RequestMapping("/api/benurse/HandoverSet")
@Slf4j
public class HandoverSetController {
	
	@Autowired
	HandoverSetRepository setRepo;
	
	@Autowired
	HandoverSetService setServ;
	
	@Autowired
	HandoverListRepository listRepo;
	
	@Autowired
	HandoverRepository handoverRepo;
	
	@Autowired
	HandoverService handoverServ;
	
	@Autowired
	MyHandoverRepository myhoRepo;
	
	@Autowired
	MyHandoverService myhoServ;
	
	@Autowired
	HandoverContentRepository contentRepo;
	
	@Autowired
	ScheduleRepository scheduleRepo;
	
	@Autowired
	EMRService emrService;
	
	@Autowired
	WardService wardServ;
	
	@Autowired
	PatientWardService pwServ;
	
	@Autowired
	OauthService oauthService;
	
	
	// 인계장 묶음 생성 POST
	@PostMapping("")
	@ApiOperation(value = "인계장 묶음 생성", notes = "인계장 묶음 생성")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverSet> registHandover(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		HandoverSet handoverSet = new HandoverSet();
		handoverSet.setGiveID(nurse.getID());
		// 생성 시간
		handoverSet.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
		// 데이터베이스에 저장
	    HandoverSet savedHandoverSet = setRepo.save(handoverSet);
	    log.info(savedHandoverSet.toString());
	    return new APIResponse<>(savedHandoverSet, HttpStatus.OK);
	}
	
	// 인계장 묶음 수정 PUT
	@PutMapping("")
	@ApiOperation(value = "인계장 묶음 수정", notes = "인계장 묶음 수정")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<HandoverSet> updateHandoverSetById(@RequestBody HandoverSet updatedHandoverSet) {
		try {
			// 업데이트된 인계장을 저장
			HandoverSet savedHandoverSet = setServ.save(updatedHandoverSet);
	        return new APIResponse<>(savedHandoverSet, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}

	// 인수자 인계장 조회 GET [인계자 ID]
	@GetMapping("/tempsave")
	@ApiOperation(value = "임시저장 인계장 묶음 조회", notes = "액세스 토큰을 통해 임시저장한 인계장 묶음 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverSetResponse.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<HandoverSetResponse>> getHandoverSetByGiveId(@RequestHeader("Authorization") String token) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		List<HandoverSetResponse> resp = new ArrayList<>();
		List<HandoverSet> setList = setRepo.findAllByGiveID(nurse.getID());
		for(HandoverSet set : setList){
			try {
				// 임시저장된 목록인지 확인
				List<MyHandover> exist = myhoRepo.findAllBySetID(set.getID());
				if(exist.size() == 0) {
					HandoverSetResponse temp =  new HandoverSetResponse();
					temp.setHandoverSetID(set.getID());

					Optional<Schedule> work = scheduleRepo.findByNurseIDAndWorkdate(set.getGiveID(), set.getTime().toLocalDate());
					if(work.isEmpty()) {
						log.error("not found schedule (" + set.getGiveID() +", " + set.getTime().toLocalDate() + ")");
						continue;
					}
					String worktime = work.get().getWorktime();
					temp.setGiveWorkTime(worktime);
					temp.setUpdatedAt(set.getTime());
					resp.add(temp);
				}
			}
			catch (Exception e) {
				log.error("not found set (id:" + set.getID() + ")");
			}
		}

		return new APIResponse<>(resp, HttpStatus.OK);
	}
	
	
	// 인계장 묶음 삭제 DELETE
	@DeleteMapping("")
	@ApiOperation(value = "인계장 묶음 삭제", notes = "인계장 묶음을 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = HandoverSet.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteHandoverSetById(@RequestBody IDRequest req) {
		try {
	    	setServ.delete(req.getID());
			return new APIResponse<>(HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}  

	// 인수자 인계장 조회 GET [인계자 ID]
	@GetMapping("/details")
	@ApiOperation(value = "인계장 묶음 내역 조회", notes = "인계장 묶음 ID를 통해 인계장 묶음에 포함된 인계장 조회\n환자 ID를 같이 보내면 해당 환자에 대한 인수인계만 나옵니다.") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = HandoverResponse.class),
	    @ApiResponse(code = 404, message = "인계장을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<HandoverResponse>> getDetail(
			@RequestHeader("Authorization") String token,
			@RequestParam("ID") long ID,
			@RequestParam(name = "patientID", required = false, defaultValue = "0") long patientID){

		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		// 읽음 여부 갱신
		try {
			HandoverSet handoverSet = setServ.findById(ID);
	    	Optional<MyHandover> optionmh = myhoRepo.findBySetIDAndTakeIDAndReaded(ID, nurse.getID(), false);
	    	
	    	//
	    	if(optionmh.isPresent()) {
	    		MyHandover mh = optionmh.get();
	    		if(mh.getTakeID() == nurse.getID()) {
	    			mh.setReaded(true);
	    			myhoServ.save(mh);
	    		}
	    	}
	    }catch (Exception e) {
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
		
		List<HandoverList> list = listRepo.findAllBySetID(ID);
		List<HandoverResponse> resp = new ArrayList<>();
		for(HandoverList l : list) {
			try {
				HandoverResponse r = new HandoverResponse();
				Handover handover = handoverServ.findById(l.getHandoverID());
				if(patientID != 0 && handover.getPatientID() != patientID)
					throw new Exception();
				
				APIResponse<PatientResponse> emrResp = emrService.getPatientById(handover.getPatientID());
				PatientWard pw= pwServ.findById(handover.getPatientID());
		    	Ward ward = wardServ.findById(pw.getWardID());
		    	Patient patient = emrResp.getResponseData().getPatient();
				
		    	r.setID(handover.getID());
		    	r.setPatientID(handover.getPatientID());
		    	r.setPatientName(patient.getName());
		    	r.setAge(patient.getAge());
		    	r.setGender(patient.getGender());
		    	r.setImg(patient.getImg());
		    	r.setWardName(ward.getName());
		    	
		    	
		    	r.setSpecial(new ArrayList<>());
		    	r.setCc(new ArrayList<>());
		    	r.setEtc(new ArrayList<>());
		    	r.setJournals(new ArrayList<>());
		    	List<HandoverContent> contents = contentRepo.findAllByHandoverID(handover.getID());
		    	for(HandoverContent content : contents) {
		    		switch (content.getCategory()){
		    		case "special":
		    			r.getSpecial().add(content.getContent());
		    			break;
		    		case "cc":
		    			r.getCc().add(content.getContent());
		    			break;
		    		case "etc":
		    			r.getEtc().add(content.getContent());
		    			break;
		    		case "journal":
		    			JournalRequest journal = new JournalRequest();
		    			journal.setJournalID(content.getJournalID());
		    			journal.setComment(content.getContent());
		    			r.getJournals().add(journal);
		    			break;
		    		}
		    	}
				
				resp.add(r);
			}catch (Exception e) {
				log.error("not found handover (id:"+ l.getHandoverID() +") or patient not match");
			}
		}
		return new APIResponse<>(resp, HttpStatus.OK);
	}
}
