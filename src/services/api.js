import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  // Get all projects
  getAllProjects: () => api.get('/projects'),
  
  // Get projects by leader
  getProjectsByLeader: (leader) => api.get(`/projects/leader/${leader}`),
  
  // Get projects with team count > 25
  getProjectsWithBigTeam: () => api.get('/projects/teamcount'),
  
  // Get projects by database
  getProjectsByDatabase: (database) => api.get(`/projects/database/${database}`),
};

export default api;