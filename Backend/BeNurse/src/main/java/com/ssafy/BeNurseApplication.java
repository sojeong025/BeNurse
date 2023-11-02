package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import com.ssafy.invite.service.InviteRedisRepository;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
@EnableFeignClients
@EnableCaching
@EnableSwagger2
@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = InviteRedisRepository.class))
public class BeNurseApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeNurseApplication.class, args);
	}

}
