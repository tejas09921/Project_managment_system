package com.example.Project_Managment_System.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Project {
	@Id
	private int projectid;
	private String projectnm;
	private String projectPL;
	private String projectDatabase;
	private String projectOS;
	private int projectTeamcnt;

	public Project() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Project(int projectid, String projectnm, String projectPL, String projectDatabase, String projectOS,
			int projectTeamcnt) {
		super();
		this.projectid = projectid;
		this.projectnm = projectnm;
		this.projectPL = projectPL;
		this.projectDatabase = projectDatabase;
		this.projectOS = projectOS;
		this.projectTeamcnt = projectTeamcnt;
	}

	public int getProjectid() {
		return projectid;
	}

	public void setProjectid(int projectid) {
		this.projectid = projectid;
	}

	public String getProjectnm() {
		return projectnm;
	}

	public void setProjectnm(String projectnm) {
		this.projectnm = projectnm;
	}

	public String getProjectPL() {
		return projectPL;
	}

	public void setProjectPL(String projectPL) {
		this.projectPL = projectPL;
	}

	public String getProjectDatabase() {
		return projectDatabase;
	}

	public void setProjectDatabase(String projectDatabase) {
		this.projectDatabase = projectDatabase;
	}

	public String getProjectOS() {
		return projectOS;
	}

	public void setProjectOS(String projectOS) {
		this.projectOS = projectOS;
	}

	public int getProjectTeamcnt() {
		return projectTeamcnt;
	}

	public void setProjectTeamcnt(int projectTeamcnt) {
		this.projectTeamcnt = projectTeamcnt;
	}

	@Override
	public String toString() {
		return "Project [projectid=" + projectid + ", projectnm=" + projectnm + ", projectPL=" + projectPL
				+ ", projectDatabase=" + projectDatabase + ", projectOS=" + projectOS + ", projectTeamcnt="
				+ projectTeamcnt + "]";
	}

}
