package com.ssafy.oauth.serivce;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.nurse.model.Nurse;
import com.ssafy.nurse.service.NurseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService{
	
	/**
	 * 
	 */
	
	private final NurseRepository nurseRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Nurse user = nurseRepo.findByEmail(email)
				.orElseThrow(()->{
					log.error("Invalid authentication!");
					return new UsernameNotFoundException("Invalid authentication!");
				});
		
		return User.builder()
				.username(user.getEmail())
				.password(passwordEncoder.encode(user.getEmail()))
				.authorities("User")
				.build();
	}	
}
