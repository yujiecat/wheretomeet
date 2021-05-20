package com.wheretomeet.controller;

import java.util.Optional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.wheretomeet.model.User;
import com.wheretomeet.model.Group;
import com.wheretomeet.repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class GroupController {
	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

	@Autowired
	private GroupRepository groupRepo;

	@GetMapping("/groups/{id}")
	public String getGroupDetails(@PathVariable("id") long id) {
		Optional<Group> og = groupRepo.findById(id);
		Group g = og.isPresent() ? og.get() : null;
		return g.toString();
	}

	@PostMapping("/groups")
	public void createGroup(String groupName) {
		Group g = new Group(groupName, null);
		groupRepo.save(g);
		logger.info("group created with name {}", groupName);
	}

}