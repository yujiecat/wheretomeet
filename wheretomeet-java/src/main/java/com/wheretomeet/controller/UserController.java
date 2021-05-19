package com.wheretomeet.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.wheretomeet.model.User;

@RestController
public class UserController {

	// @GetMapping("/groups/{id}")
	// public String getGroupDetails(@PathVariable("id") int id) {
	// }

	// @PostMapping("groups")
	// public void createGroup(String name, String pass) {
	// 	User u = new User(name, pass);
	// }

}