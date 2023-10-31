package com.ssafy.common.utils;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.emr.model.Journal;

@FeignClient(name="userClient", url="k9e105.p.ssafy.io:9003/api/emr")
public interface UserClient {

	@GetMapping(value="/journal")
	Journal getJournalByID(@RequestParam("id") long id);
}
