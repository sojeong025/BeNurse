package com.ssafy.nurse.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.nurse.model.Nurse;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

	Optional<Nurse> findByEmail(String email);
}
