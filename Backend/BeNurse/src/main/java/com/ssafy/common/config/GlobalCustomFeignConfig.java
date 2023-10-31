package com.ssafy.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.Logger;

@Configuration
public class GlobalCustomFeignConfig {
	@Bean
	Logger.Level loggerLevel(){
		return Logger.Level.FULL;
	}
}
