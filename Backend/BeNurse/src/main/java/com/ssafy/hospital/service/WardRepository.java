package com.ssafy.hospital.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hospital.model.Ward;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long>{

	List<Ward> findAllByHospitalID(long hospitalID);

	List<Ward> findAllByHospitalIDAndNameContaining(long hospitalID, String name);

}
