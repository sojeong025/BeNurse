package com.ssafy.invite.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.invite.model.Invite;

@Repository
public interface InviteRedisRepository extends JpaRepository<Invite, String>{

}
