package com.ssafy.device.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.common.utils.APIResponse;
import com.ssafy.device.model.Device;
import com.ssafy.device.model.DeviceHistory;
import com.ssafy.device.model.NFC;
import com.ssafy.device.service.DeviceHistoryRepository;
import com.ssafy.device.service.DeviceRepository;
import com.ssafy.device.service.DeviceService;
import com.ssafy.device.service.NFCRepository;
import com.ssafy.hospital.model.Hospital;
import com.ssafy.nurse.model.Nurse;
import com.ssafy.oauth.serivce.OauthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Api(value = "장비 API", tags = { "장비." })
@RestController
@RequestMapping("/api/benurse/device")
@Slf4j
public class DeviceController {

	@Autowired
	DeviceRepository deviceRepo;
	
	@Autowired
	DeviceService deviceServ;
	
	@Autowired
	NFCRepository nfcRepo;
	
	@Autowired
	OauthService oauthService;
	
	// 장비 등록 POST
	@PostMapping(value = "", consumes = "multipart/form-data")
	@ApiOperation(value = "장비 등록", notes = "장비 등록\n필수 : ID, name, asTel\n선택 : file(장비 이미지)")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Device.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Device> registDevice(
			@RequestHeader("Authorization") String token, 
			@RequestParam(name = "file",required =false) MultipartFile file, 
			@ModelAttribute Device device) {
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		if(!nurse.isAdmin())
			throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
		
		NFC nfc = new NFC();
		nfc.setID(device.getID());
		nfc.setDevice(true);
		nfcRepo.save(nfc);
		
		device.setHospitalID(nurse.getHospitalID());
		device.setDevice(true);
		if(file != null) {
			try {
				String fileUrl = deviceServ.uploadFile(file);
				log.info(fileUrl);
				device.setImg(fileUrl);
			}catch (Exception e) {
				log.error("file upload failed");
			}
		}
		
		Device savedDevice = deviceRepo.save(device);
		savedDevice.setDevice(true);
		return new APIResponse<>(savedDevice, HttpStatus.OK);
	}
	
	// 장비 정보 수정 PUT
	@PutMapping(value = "", consumes = "multipart/form-data")
	@ApiOperation(value = "장비 정보 수정", notes = "등록된 장비의 내용을 수정합니다.\n(이미지를 새로 업로드한 경우 새로운 이미지로 url이 변경됩니다.)") 
	@ApiResponses({
	    @ApiResponse(code = 200, message = "성공", response = Device.class),
	    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
	    @ApiResponse(code = 500, message = "서버 오류")
	})
	public APIResponse<Device> updateDeviceByDeviceId(
			@RequestHeader("Authorization") String token, 
			@RequestParam(name = "file", required = false) MultipartFile file, 
			@ModelAttribute Device updatedDevice){
		Nurse nurse;
		// 사용자 조회
		try {
			nurse = oauthService.getUser(token);
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		if(!nurse.isAdmin())
			throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
		
		try {
			// 업데이트된 병원 정보를 저장
			if(file != null) {
				try {
					String fileUrl = deviceServ.uploadFile(file);
					log.info(fileUrl);
					updatedDevice.setImg(fileUrl);
				}catch (Exception e) {
					log.error("file upload failed");
				}
			}
			Device savedDevice = deviceServ.save(updatedDevice);
	        return new APIResponse<>(savedDevice, HttpStatus.OK);
	    }catch (Exception e) {
	    	e.printStackTrace();
	    	throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	    }
	}
		
//		// 장비 삭제 DELETE
//		@DeleteMapping("")
//		@ApiOperation(value = "장비 삭제", notes = "장비를 삭제한다.")
//		@ApiResponses({
//			@ApiResponse(code = 200, message = "성공", response = Device.class),
//			@ApiResponse(code = 404, message = "결과 없음"),
//			@ApiResponse(code = 500, message = "서버 오류")
//		})
//	    public APIResponse<Void> deleteDeviceByDeviceId(@RequestHeader("Authorization") String token, @RequestParam("ID") String ID) {
//			Nurse nurse;
//			// 사용자 조회
//			try {
//				nurse = oauthService.getUser(token);
//			}catch (Exception e) {
//				e.printStackTrace();
//				return new APIResponse(HttpStatus.UNAUTHORIZED);
//			}
//			
//			if(!nurse.isAdmin())
//				return new APIResponse(HttpStatus.UNAUTHORIZED);
//			
//			Optional<Device> device = deviceRepo.findById(ID);
//		    if(device.isPresent()) {
//		    	List<DeviceHistory> list = dhRepo.findAllByDeviceID(ID);
//		    	for(DeviceHistory l : list) {
//		    		dhRepo.delete(l);
//		    	}
//
//		    	deviceRepo.delete(device.get());
//		    	nfcRepo.deleteById(ID);
//				return new APIResponse(HttpStatus.OK);
//			}
//			else
//				return new APIResponse(HttpStatus.NOT_FOUND);
//		} 
		
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
				throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
			}
			
			List<Device> device = deviceRepo.findAllByHospitalIDOrderByName(nurse.getHospitalID());
		    return new APIResponse<>(device, HttpStatus.OK);
		}
		
//		// 특정 장비 조회 GET
//		@GetMapping("")
//		@ApiOperation(value = "특정 장비 조회", notes = "장비 ID로 특정 장비 조회") 
//		@ApiResponses({
//		    @ApiResponse(code = 200, message = "성공", response = Device.class),
//		    @ApiResponse(code = 404, message = "게시글을 찾을 수 없음"),
//		    @ApiResponse(code = 500, message = "서버 오류")
//		})
//		public APIResponse<Device> getDeviceById( @RequestParam("ID") String ID) {
//			Optional<Device> device = deviceRepo.findById(ID);
//
//		    if (device.isPresent())
//		        return new APIResponse(device.get(), HttpStatus.OK);
//		    else
//		        return new APIResponse(HttpStatus.NOT_FOUND);
//		}
}
