package com.ssafy.nurse.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.nurse.model.Nurse;

@Repository
public interface NurseRepository extends JpaRepository<Nurse, Long> {
	Optional<Nurse> findByEmail(String email);
}
