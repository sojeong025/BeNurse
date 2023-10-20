package com.ssafy;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/test")
@RestController
public class TestController {
	@PostMapping
    public String greeting(@RequestBody RequestDto body) {
        return "Hi " + body.getName() + " ~~~";
    }
}

