import { useState, useEffect } from 'react';
import { FolderOpen, Users, Database, Monitor, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <FolderOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Project Management System</h1>
          </div>
          <p className="mt-2 text-gray-600">Manage and track your projects efficiently</p>
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
          />
          <StatsCard
            title="Project Leaders"
            value={stats.uniqueLeaders}
            icon={Users}
            color="green"
          />
          <StatsCard
            title="Databases Used"
            value={stats.uniqueDatabases}
            icon={Database}
            color="purple"
          />
          <StatsCard
            title="Large Teams (>25)"
            value={stats.largeTeams}
            icon={TrendingUp}
            color="orange"
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
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Projects Found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No projects available in the system.'}
            </p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {searchTerm ? `Search Results (${filteredProjects.length})` : 
                 selectedFilter !== 'all' ? `Filtered Results (${filteredProjects.length})` :
                 `All Projects (${filteredProjects.length})`}
              </h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.projectid} project={project} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            Project Management System - Built with React & Spring Boot
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;