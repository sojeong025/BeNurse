package com.ssafy.Schedule.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.Schedule.model.Schedule;
import com.ssafy.Schedule.service.ScheduleRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "근무표 API", tags = { "Schedule." })
@RestController
@RequestMapping("/api/benurse/Schedule")
public class ScheduleController {

	@Autowired
	ScheduleRepository scheduleRepo;
	
	@PostMapping("")
	@ApiOperation(value = "근무 일정 추가", notes = "간호사, 근무 날짜와 시간, 근무지로 근무 일정을 추가")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Schedule.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Schedule> registSchedule(Schedule schedule) {
		
		Schedule savedSchedule = scheduleRepo.save(schedule);
		return new ResponseEntity<>(savedSchedule, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	@ApiOperation(value = "근무 일정 수정", notes = "근무 일정 수정") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무 일정을 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Void> updateScheduleById(@RequestBody Schedule updatedSchedule){
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

	        return new ResponseEntity<>(HttpStatus.OK);
	    } else	
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    
	}
	
	@DeleteMapping("/{id}")
	@ApiOperation(value = "근무 일정 삭제", notes = "근무 일정 ID로 근무 일정 삭제")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Schedule.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Void> deleteScheduleById(@RequestParam("ID") long ID) {
	    Optional<Schedule> schedule = scheduleRepo.findById(ID);

	    if(schedule.isPresent()) {
	    	scheduleRepo.delete(schedule.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

	} 
	
//	@GetMapping("/{id}")
//	@ApiOperation(value = "내 근무 일정 조회", notes = "설정한 기간 내의 근무 일정 조회") 
//	@ApiResponses({
//	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
//	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
//	    @ApiResponse(code = 500, message = "서버 오류")
//	})
//	public ResponseEntity<Schedule> getScheduleById(@RequestParam("ID") long ID) {
//	    Optional<Schedule> schedule = scheduleRepo.findById(ID);
//
//	    if (schedule.isPresent())
//	        return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
//	    else
//	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	}	
	
	@GetMapping("/{id}")
	@ApiOperation(value = "근무표 조회", notes = "기간 내의 모든 근무 일정 조회") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Schedule.class),
	    @ApiResponse(code = 404, message = "근무를 찾을 수 없음."),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Schedule> getScheduleById(
			@RequestParam("start_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
		    @RequestParam("end_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
		    )
	{	
	    Optional<Schedule> schedule = scheduleRepo.findById(ID);

	    if (schedule.isPresent())
	        return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
	    else
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}	
	
}
