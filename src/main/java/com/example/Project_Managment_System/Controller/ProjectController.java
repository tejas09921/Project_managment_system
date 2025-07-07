package com.example.Project_Managment_System.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.Project_Managment_System.Entity.Project;
import com.example.Project_Managment_System.Service.ProjectService;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService service;

    // 1. Get all projects
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return service.getAllProjects();
    }

    // 2. Get projects by Project Leader (projectPL)
    @GetMapping("/projects/leader/{leader}")
    public List<Project> getByLeader(@PathVariable String leader) {
        return service.getByProjectLeader(leader);
    }

    // 3. Get projects where team count > 25
    @GetMapping("/projects/teamcount")
    public List<Project> getProjectsWithBigTeam() {
        return service.getProjectsWithTeamCountGreaterThan25();
    }

    // 4. Get projects by database (projectDatabase)
    @GetMapping("/projects/database/{db}")
    public List<Project> getByDatabase(@PathVariable String db) {
        return service.getProjectsByDatabase(db);
    }

    // 5. Get projects by OS (projectOS)
//    @GetMapping("/projects/os/{os}")
//    public List<Project> getByOperatingSystem(@PathVariable String os) {
//        return service.getProjectsByLanguage(os);
//    }
}