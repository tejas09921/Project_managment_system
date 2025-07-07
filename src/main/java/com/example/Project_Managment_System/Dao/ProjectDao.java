package com.example.Project_Managment_System.Dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.Project_Managment_System.Entity.Project;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

@Repository
public class ProjectDao {

	@Autowired
	SessionFactory factory;

	public List<Project> getAllProjects() {
		Session session = factory.openSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Project> cq = cb.createQuery(Project.class);
		Root<Project> root = cq.from(Project.class);
		cq.select(root);

		List<Project> result = session.createQuery(cq).getResultList();
		session.close();
		return result;
	}

	public List<Project> getByProjectLeader(String leader) {
		Session session = factory.openSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Project> cq = cb.createQuery(Project.class);
		Root<Project> root = cq.from(Project.class);

		cq.select(root).where(cb.equal(root.get("projectPL"), leader));

		List<Project> result = session.createQuery(cq).getResultList();
		session.close();
		return result;
	}

	public List<Project> getProjectsWithTeamCountGreaterThan25() {
		Session session = factory.openSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Project> cq = cb.createQuery(Project.class);
		Root<Project> root = cq.from(Project.class);

		cq.select(root).where(cb.gt(root.get("projectTeamcnt"), 25));

		List<Project> result = session.createQuery(cq).getResultList();
		session.close();
		return result;
	}

	public List<Project> getProjectsByDatabase(String databaseName) {
		Session session = factory.openSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Project> cq = cb.createQuery(Project.class);
		Root<Project> root = cq.from(Project.class);

		cq.select(root).where(cb.equal(root.get("projectDatabase"), databaseName));

		List<Project> result = session.createQuery(cq).getResultList();
		session.close();
		return result;
	}

	public List<Project> getProjectsByLanguage(String keyword) {
		Session session = factory.openSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Project> cq = cb.createQuery(Project.class);
		Root<Project> root = cq.from(Project.class);

		Predicate likeProjectName = cb.like(cb.lower(root.get("projectnm")), "%" + keyword.toLowerCase() + "%");
		cq.select(root).where(likeProjectName);

		List<Project> result = session.createQuery(cq).getResultList();
		session.close();
		return result;
	}
}
