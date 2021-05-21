package com.wheretomeet.controller;

import java.util.Optional;
import java.lang.Iterable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import com.wheretomeet.model.User;
import com.wheretomeet.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepo;

	@GetMapping("/users/{id}")
	public String getUserDetails(@PathVariable("id") long id) {
		Optional<User> ou = userRepo.findById(id);
		User u = ou.isPresent() ? ou.get() : null;
		return u.toString();
	}

	@GetMapping("/users")
	public Iterable<User> getAllUserDetails() {
		return userRepo.findAll();
	}

	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userRepo.save(user);
	}
}