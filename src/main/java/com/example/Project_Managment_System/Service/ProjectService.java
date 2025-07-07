package com.example.Project_Managment_System.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Project_Managment_System.Dao.ProjectDao;
import com.example.Project_Managment_System.Entity.Project;


@Service
public class ProjectService {

    @Autowired
    private ProjectDao dao;

    // 1. Get all projects
    public List<Project> getAllProjects() {
        return dao.getAllProjects();
    }

    // 2. Get by Project Leader
    public List<Project> getByProjectLeader(String leader) {
        return dao.getByProjectLeader(leader);
    }

    // 3. Get projects with team count > 25
    public List<Project> getProjectsWithTeamCountGreaterThan25() {
        return dao.getProjectsWithTeamCountGreaterThan25();
    }

    // 4. Get by database
    public List<Project> getProjectsByDatabase(String db) {
        return dao.getProjectsByDatabase(db);
    }

    // 5. Get by language (e.g., Java, Python in project name)
    public List<Project> getProjectsByLanguage(String lang) {
        return dao.getProjectsByLanguage(lang);
    }
}


