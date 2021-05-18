package com.wheretomeet.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.wheretomeet.model.Group;
import com.wheretomeet.model.User;

@RestController
public class GroupController {

	@RequestMapping(value = "/groups", method = RequestMethod.GET)
	public String getGroupDetails() {

		//temp usage, realistically we would put these things in a DB and query the group name to grab the user lists.
		User u1 = new User("andy", "12345");
		User u2 = new User("bob", "12345");
		User u3 = new User("connor", "12345");

		Group g = new Group("alphabet gang", u1, u2, u3);

		return g.getGroupMembers().toString();
	}

}