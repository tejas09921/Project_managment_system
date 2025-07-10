import { useState, useEffect } from 'react';
import { FolderOpen, Users, Database, Monitor, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { projectService } from './services/api';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';
import StatsCard from './components/StatsCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  // Load all projects on component mount
  useEffect(() => {
    loadAllProjects();
  }, []);

  // Filter projects based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project =>
        project.projectnm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectPL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectDatabase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectOS.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const loadAllProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getAllProjects();
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (err) {
      setError('Failed to load projects. Please check if the backend server is running.');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = async () => {
    try {
      setLoading(true);
      setError(null);
      let response;

      switch (selectedFilter) {
        case 'leader':
          response = await projectService.getProjectsByLeader(filterValue);
          break;
        case 'database':
          response = await projectService.getProjectsByDatabase(filterValue);
          break;
        case 'bigteam':
          response = await projectService.getProjectsWithBigTeam();
          break;
        default:
          response = await projectService.getAllProjects();
      }

      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (err) {
      setError('Failed to apply filter. Please try again.');
      console.error('Error applying filter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedFilter('all');
    setFilterValue('');
    setSearchTerm('');
    loadAllProjects();
  };

  // Calculate statistics
  const stats = {
    totalProjects: filteredProjects.length,
    uniqueLeaders: new Set(filteredProjects.map(p => p.projectPL)).size,
    uniqueDatabases: new Set(filteredProjects.map(p => p.projectDatabase)).size,
    largeTeams: filteredProjects.filter(p => p.projectTeamcnt > 25).length,
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full float-animation"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-purple-300/30 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-300/40 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 bg-pink-300/30 rounded-full float-animation" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <header className="glass border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FolderOpen className="w-12 h-12 text-white drop-shadow-lg pulse-glow" />
                <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white neon-glow mb-2">
                  Project Management System
                </h1>
                <p className="text-xl text-white/80 font-medium flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-300" />
                  Manage and track your projects with style
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={FolderOpen}
            color="blue"
            gradient="bg-gradient-primary"
          />
          <StatsCard
            title="Project Leaders"
            value={stats.uniqueLeaders}
            icon={Users}
            color="green"
            gradient="bg-gradient-success"
          />
          <StatsCard
            title="Databases Used"
            value={stats.uniqueDatabases}
            icon={Database}
            color="purple"
            gradient="bg-gradient-secondary"
          />
          <StatsCard
            title="Large Teams (>25)"
            value={stats.largeTeams}
            icon={TrendingUp}
            color="orange"
            gradient="bg-gradient-warning"
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          onApplyFilter={handleApplyFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadAllProjects} />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <FolderOpen className="w-20 h-20 text-white/60 mx-auto mb-6 float-animation" />
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-white/70 text-lg">
                {searchTerm || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No projects available in the system.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="glass rounded-2xl px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  {searchTerm ? `🔍 Search Results (${filteredProjects.length})` : 
                   selectedFilter !== 'all' ? `🎯 Filtered Results (${filteredProjects.length})` :
                   `📊 All Projects (${filteredProjects.length})`}
                </h2>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.projectid} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in-up">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/80 text-lg font-medium">
              ✨ Project Management System - Built with React & Spring Boot ✨
            </p>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;