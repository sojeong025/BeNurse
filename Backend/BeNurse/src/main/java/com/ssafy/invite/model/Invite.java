package com.ssafy.invite.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "invite", timeToLive = 60)
public class Invite {
	@Id
	private String inviteCode;
	private long hospitalID;
	private long wardID;
	private String name;
}
