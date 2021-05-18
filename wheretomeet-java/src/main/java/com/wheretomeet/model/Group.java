package com.wheretomeet.model;

import java.util.ArrayList;

public class Group {

    private String groupName;
    private ArrayList<User> groupMembers;

    public Group(String groupName, User...users) {
        this.groupName = groupName;
        this.groupMembers = new ArrayList<User>();
        for (User user : users) {
            groupMembers.add(user);
        }
    }

    public ArrayList<User> getGroupMembers() {
        return groupMembers;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupName() {
        return groupName;
    }
}