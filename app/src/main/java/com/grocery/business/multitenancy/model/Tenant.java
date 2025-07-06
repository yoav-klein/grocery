package com.grocery.business.multitenancy.model;

import java.util.ArrayList;
import java.util.List;

public class Tenant {
    private String id;
    private String name;
    private List<User> members = new ArrayList<>();
    private String displayName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getMembers() {
        return this.members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public String getDisplayName() {
        return displayName;
    }
    
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}