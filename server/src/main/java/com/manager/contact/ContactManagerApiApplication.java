package com.manager.contact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ContactManagerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactManagerApiApplication.class, args);
	}
}
