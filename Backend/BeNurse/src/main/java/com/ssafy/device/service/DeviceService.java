package com.ssafy.device.service;

import java.io.IOException;
import java.util.Optional;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.device.model.Device;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceService {
   private final AmazonS3Client amazonS3Client;

   @Value("${cloud.aws.s3.bucket}")
   private String bucket;
   @Value("${cloud.aws.region.static}")
   private String region;
	
	@Autowired
	DeviceRepository deviceRepo;
	
	@Cacheable(value = "device", key = "#ID")
	public Device findById(String ID) {
		Optional<Device> option = deviceRepo.findById(ID);
		if(option.isPresent())
			return option.get();
		else
			throw new NullPointerException();
	}
	
	@CachePut(value = "device", key="#device.ID")
	public Device save(Device device) {
		try {
			if(device.getID() == null)
				throw new NullPointerException();
			Device exist = findById(device.getID());
			return deviceRepo.save(device);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
		
	}
	
	@CacheEvict(value = "device", key = "#ID")
	public void delete(String ID) {
		try {
			Device device = findById(ID);
			deviceRepo.delete(device);
		}catch (Exception e) {
			e.printStackTrace();
			throw new NullPointerException();
		}
	}
	
	public String uploadFile(MultipartFile file) throws FileUploadException {
		try {
	         String fileName=file.getOriginalFilename();
	         String fileUrl= "https://" + bucket + "." + region + ".amazonaws.com/" +fileName;
	         ObjectMetadata metadata= new ObjectMetadata();
	         metadata.setContentType(file.getContentType());
	         metadata.setContentLength(file.getSize());
	         amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
	         //amazonS3Client.getResourceUrl(bucket, fileName);
	         return amazonS3Client.getResourceUrl(bucket, fileName);
	      } catch (IOException e) {
	    	  e.printStackTrace();
	    	  throw new FileUploadException();
	      }
	}
}
