package com.ssafy.Schedule.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.ssafy.Schedule.model.Schedule;
import com.ssafy.Schedule.model.ScheduleSearchCondition;
import com.ssafy.Schedule.service.ScheduleRepository;
import com.ssafy.common.utils.APIResponse;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "근무표 API", tags = { "근무표." })
@RestController
@RequestMapping("/api/benurse/Schedule")
public class ScheduleController {

	@Autowired
	ScheduleRepository scheduleRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 근무일정추가 POST
	@PostMapping("")
	@ApiOperation(value = "근무 일정 추가", notes = "간호사, 근무 날짜와 시간, 근무지로 근무 일정을 추가")
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
	        if (updatedSchedule.getWorkplace() != null) {
	            existingSchedule.setWorkplace(updatedSchedule.getWorkplace());
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
	        return new APIResponse<>(HttpStatus.NOT_FOUND);
	    
	}
	
	
	// 근무일정삭제	DELETE
	@DeleteMapping("")
	@ApiOperation(value = "근무 일정 삭제", notes = "근무 일정 ID로 근무 일정 삭제")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Schedule.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Void> deleteScheduleById(@RequestParam("ID") long ID) {
	    Optional<Schedule> schedule = scheduleRepo.findById(ID);

	    if(schedule.isPresent()) {
	    	scheduleRepo.delete(schedule.get());
			return new APIResponse(HttpStatus.OK);
		}
		else
			return new APIResponse(HttpStatus.NOT_FOUND);

	} 
	
	
	// 내 근무일정조회 GET
	@GetMapping("")
	@ApiOperation(value = "내 근무 일정 조회", notes = "설정한 기간 내의 근무 일정 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Schedule> getScheduleById(@RequestHeader("Authorization") String token, @RequestBody ScheduleSearchCondition ssc) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			return new APIResponse(HttpStatus.UNAUTHORIZED);
		}

	    List<Schedule> schedule = scheduleRepo.findByNurseIDAndWorkdateBetween(nurse.getID(), ssc.getStartDate(), ssc.getEndDate());
	    if (schedule.isEmpty()) {
	        return new APIResponse(HttpStatus.NOT_FOUND); // 근무 일정을 찾을 수 없을 경우 404 반환
	    }
	    return new APIResponse(schedule, HttpStatus.OK);
	}
	
	
	// 근무표 조회 GET
	@GetMapping("/all")
	@ApiOperation(value = "근무표 조회", notes = "기간 내의 모든 근무 일정 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Schedule>> getScheduleByDate(@RequestBody ScheduleSearchCondition ssc){	
	    List<Schedule> schedule = scheduleRepo.findAllByworkdateBetween(ssc.getStartDate(), ssc.getEndDate());
	    return new APIResponse(schedule, HttpStatus.OK);

	}	
	
	
	// 근무 일정 검색 GET
	@GetMapping("/search")
	@ApiOperation(value = "근무 일정 검색", notes = "조건(간호사ID, 기간 등)에 맞는 근무 일정 조회")
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<List<Schedule>> getScheduleByCondition(@RequestParam("nurseID") long nurseID, @RequestBody ScheduleSearchCondition ssc) {
	    // 여기서 간호사ID와 기간에 따라 근무 일정을 조회하도록 변경
	    List<Schedule> schedule = scheduleRepo.findByNurseIDAndWorkdateBetween(nurseID, ssc.getStartDate(), ssc.getEndDate());
	    if (schedule.isEmpty()) {
	        return new APIResponse(HttpStatus.NOT_FOUND); // 근무 일정을 찾을 수 없을 경우 404 반환
	    }
	    return new APIResponse(schedule, HttpStatus.OK);
	}
	
}
