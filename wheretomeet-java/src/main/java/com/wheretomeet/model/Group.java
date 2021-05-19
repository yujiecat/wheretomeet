package com.wheretomeet.model;

import java.util.ArrayList;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "group")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long groupId; 
    @Column(name = "group_name")
    private String groupName;
    @Column(name = "members")
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