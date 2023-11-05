package com.ssafy.device.controller;

import java.time.LocalDateTime;
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

import com.ssafy.common.utils.APIResponse;
import com.ssafy.device.model.Device;
import com.ssafy.device.service.DeviceRepository;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "장비 API", tags = { "장비." })
@RestController
@RequestMapping("/api/benurse/device")
public class DeviceController {

	@Autowired
	DeviceRepository deviceRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 장비 등록 POST
	@PostMapping("")
	@ApiOperation(value = "장비 등록", notes = "장비 등록(pk, 제품명, 제품 사진, 제품 설명, 담당 A/S 연락처)")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Device.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Device> registOffschedule(@RequestBody Device device) {
		device.setTime(LocalDateTime.now());
		
		Device savedDevice = deviceRepo.save(device);
		return new APIResponse<>(savedDevice, HttpStatus.OK);
	}
	
	// 장비 정보 수정 PUT
		@PutMapping("")
		@ApiOperation(value = "장비 정보 수정", notes = "등록된 장비의 내용을 수정합니다.") 
		@ApiResponses({
		    @ApiResponse(code = 200, message = "성공", response = Device.class),
		    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
		    @ApiResponse(code = 500, message = "서버 오류")
		})
		public APIResponse<Device> updateDeviceByDeviceId(@RequestBody Device updatedDevice){
			Optional<Device> optionDevice = deviceRepo.findById(updatedDevice.getDeviceID());
			
		    if (optionDevice.isPresent()) {
		        Device existingDevice = optionDevice.get();

		        deviceRepo.save(existingDevice);

		        return new APIResponse<>(existingDevice, HttpStatus.OK);
		    } else	
		        return new APIResponse<>(HttpStatus.NOT_FOUND);
		    
		}
		
		// 장비 삭제 DELETE
		@DeleteMapping("")
		@ApiOperation(value = "장비 삭제", notes = "장비를 삭제한다.")
		@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = Device.class),
			@ApiResponse(code = 404, message = "결과 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
		})
	    public APIResponse<Void> deleteDeviceByDeviceId(@RequestParam("DeviceID") long DeviceID) {
		    Optional<Device> device = deviceRepo.findById(DeviceID);

		    if(device.isPresent()) {
		    	deviceRepo.delete(device.get());
				return new APIResponse(HttpStatus.OK);
			}
			else
				return new APIResponse(HttpStatus.NOT_FOUND);
		} 
		
		// 전체 장비 조회 GET
		@GetMapping("/all")
		@ApiOperation(value = "전체 장비 조회", notes = "모든 장비를 조회한다.") 
	    @ApiResponses({
	        @ApiResponse(code = 200, message = "성공", response = Device.class),
	        @ApiResponse(code = 500, message = "서버 오류")
	    })
		public APIResponse<List<Device>> getAllDevice(@RequestHeader("Authorization") String token) {
			Nurse nurse;
			// 사용자 조회
			try {
				nurse = oauthService.getUser(token);
			}catch (Exception e) {
				e.printStackTrace();
				return new APIResponse(HttpStatus.UNAUTHORIZED);
			}
			
			List<Device> device = deviceRepo.findAllByHospitalID(nurse.getHospitalID());
		    return new APIResponse<>(device, HttpStatus.OK);
		}
		
		// 특정 공지사항 조회 GET
		@GetMapping("")
		@ApiOperation(value = "특정 장비 조회", notes = "장비 ID로 특정 장비 조회") 
		@ApiResponses({
		    @ApiResponse(code = 200, message = "성공", response = Device.class),
		    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
		    @ApiResponse(code = 500, message = "서버 오류")
		})
		public APIResponse<Device> getDeviceById(@RequestHeader("Authorization") String token, @RequestParam("DeviceID") long DeviceID) {
			Nurse nurse;
			// 사용자 조회
			try {
				nurse = oauthService.getUser(token);
			}catch (Exception e) {
				e.printStackTrace();
				return new APIResponse(HttpStatus.UNAUTHORIZED);
			}
			
			Optional<Device> device = deviceRepo.findByDeviceIDAndHospitalID(DeviceID, nurse.getHospitalID());

		    if (device.isPresent())
		        return new APIResponse(device.get(), HttpStatus.OK);
		    else
		        return new APIResponse(HttpStatus.NOT_FOUND);
		}
}
