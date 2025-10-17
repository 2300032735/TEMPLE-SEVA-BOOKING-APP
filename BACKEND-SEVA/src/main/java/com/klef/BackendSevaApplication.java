package com.klef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackendSevaApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BackendSevaApplication.class, args);
		System.out.println("Backend is running........!");
	}

}
