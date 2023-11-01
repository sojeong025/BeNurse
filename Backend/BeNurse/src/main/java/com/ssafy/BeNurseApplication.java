package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
@EnableFeignClients
@EnableCaching
@EnableSwagger2
public class BeNurseApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeNurseApplication.class, args);
	}

}
