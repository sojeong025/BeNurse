package com.ssafy.Schedule.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.ssafy.Schedule.model.Schedule;
import com.ssafy.Schedule.model.ScheduleResponse;
import com.ssafy.Schedule.service.ScheduleRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.common.utils.IDRequest;
import com.ssafy.hospital.service.HospitalRepository;
import com.ssafy.hospital.service.WardRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "근무표 API", tags = { "근무표." })
@RestController
@RequestMapping("/api/benurse/Schedule")
@Slf4j
public class ScheduleController {

	@Autowired
	ScheduleRepository scheduleRepo;
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@Autowired
	WardRepository wardRepo;
	
	@Autowired
	OauthService oauthService;
	
	@Autowired
	NurseRepository nurseRepo;
	
	// 근무일정추가 POST <- 작성자가 권한이 있는지 확인.
	@PostMapping("")
	@ApiOperation(value = "근무 일정 추가", notes = "병원, 병동, 간호사, 근무 날짜와 시간, 근무지로 근무 일정을 추가")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Schedule.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Schedule> registSchedule(@RequestBody Schedule schedule) {
		
		Schedule savedSchedule = scheduleRepo.save(schedule);
		return new APIResponse<>(savedSchedule, HttpStatus.OK);
	}
	
	
	// 근무일정수정 PUT
	@PutMapping("")
	@ApiOperation(value = "근무 일정 수정", notes = "근무 일정 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무 일정을 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> updateScheduleById(@RequestBody Schedule updatedSchedule){
		Optional<Schedule> optionSchedule = scheduleRepo.findById(updatedSchedule.getID());
		
	    if (optionSchedule.isPresent()) {
	    	Schedule existingSchedule = optionSchedule.get();

	        // 기존 근무일정 정보를 업데이트
	        if (updatedSchedule.getHospitalID() != 0) {
	            existingSchedule.setHospitalID(updatedSchedule.getHospitalID());
	        }
	        if (updatedSchedule.getWardID() != 0) {
	            existingSchedule.setWardID(updatedSchedule.getWardID());
	        }
	        if (updatedSchedule.getWorktime() != null) {
	            existingSchedule.setWorktime(updatedSchedule.getWorktime());
	        }
	        if (updatedSchedule.getWorkdate() != null) {
	            existingSchedule.setWorkdate(updatedSchedule.getWorkdate());
	        }
	        // 업데이트된 근무일정을 저장
	        Schedule updated = scheduleRepo.save(existingSchedule);

	        return new APIResponse<>(HttpStatus.OK);
	    } else	
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    
	}
	
	
	// 근무일정삭제	DELETE
	@DeleteMapping("")
	@ApiOperation(value = "근무 일정 삭제", notes = "근무 일정 ID로 근무 일정 삭제")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Schedule.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteScheduleById(@RequestBody IDRequest req) {
	    Optional<Schedule> schedule = scheduleRepo.findById(req.getID());

	    if(schedule.isPresent()) {
	    	scheduleRepo.delete(schedule.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);

	} 
	
	
	// 내 근무일정조회 GET
	@GetMapping("")
	@ApiOperation(value = "내 근무 일정 조회", notes = "설정한 기간 내의 근무 일정 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = ScheduleResponse.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Schedule>> getScheduleById(
			@RequestHeader("Authorization") String token, 
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
	) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}

	    List<Schedule> schedule = scheduleRepo.findByNurseIDAndWorkdateBetween(nurse.getID(), startDate, endDate);
	    if (schedule.isEmpty()) {
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND); // 근무 일정을 찾을 수 없을 경우 404 반환
	    }
	    
	    List<ScheduleResponse> resp = new ArrayList<>();
	    for(Schedule s : schedule) {
	    	try {
	    		ScheduleResponse sr = new ScheduleResponse(s);
	    		Nurse n = nurseRepo.findById(sr.getNurseID()).get();
	    		sr.setName(n.getName());
	    		sr.setAnnual(n.getAnnual());
	    		resp.add(sr);
	    	}catch (Exception e) {
	    		log.error("Not valid Nurse id (id : "+s.getNurseID()+")");
			}
	    }
	    
	    return new APIResponse(resp, HttpStatus.OK);
	}
	
	
	// 근무표 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "근무표 조회", notes = "소속 병원의 기간 내의 모든 근무 일정 조회 (Off 제외)")
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = ScheduleResponse.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<ScheduleResponse>> getScheduleByDate(
			@RequestHeader("Authorization") String token, 
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
	){
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}

	    List<Schedule> schedule = scheduleRepo.findByHospitalIDAndWorkdateBetweenAndWorktimeNotAndNurseIDNot(nurse.getHospitalID(), startDate, endDate, "O", nurse.getID());

	    List<ScheduleResponse> resp = new ArrayList<>();
	    for(Schedule s : schedule) {
	    	try {
	    		ScheduleResponse sr = new ScheduleResponse(s);
	    		Nurse n = nurseRepo.findById(sr.getNurseID()).get();
	    		sr.setName(n.getName());
	    		sr.setAnnual(n.getAnnual());
	    		resp.add(sr);
	    	}catch (Exception e) {
	    		log.error("Not valid Nurse id (id : "+s.getNurseID()+")");
			}
	    }
	    
	    return new APIResponse(resp, HttpStatus.OK);

	}	
	
	
	// 근무 일정 검색 GET
	@GetMapping("/search")
	@ApiOperation(value = "근무 일정 검색", notes = "조건(간호사ID, 기간 등)에 맞는 근무 일정 조회")
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = ScheduleResponse.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<ScheduleResponse>> getScheduleByCondition(
			@RequestParam("ID") long ID,
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
	) {
	    // 여기서 간호사ID와 기간에 따라 근무 일정을 조회하도록 변경
	    List<Schedule> schedule = scheduleRepo.findByNurseIDAndWorkdateBetween(ID, startDate, endDate);
	    if (schedule.isEmpty()) {
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND); // 근무 일정을 찾을 수 없을 경우 404 반환
	    }

	    List<ScheduleResponse> resp = new ArrayList<>();
	    for(Schedule s : schedule) {
	    	try {
	    		ScheduleResponse sr = new ScheduleResponse(s);
	    		Nurse n = nurseRepo.findById(sr.getNurseID()).get();
	    		sr.setName(n.getName());
	    		sr.setAnnual(n.getAnnual());
	    		resp.add(sr);
	    	}catch (Exception e) {
	    		log.error("Not valid Nurse id (id : "+s.getNurseID()+")");
			}
	    }
	    return new APIResponse(resp, HttpStatus.OK);
	}
	
}
