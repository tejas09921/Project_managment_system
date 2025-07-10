import { Users, Database, Monitor, User } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getTeamSizeColor = (count) => {
    if (count > 25) return 'text-red-600 bg-red-50';
    if (count > 15) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {project.projectnm}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          ID: {project.projectid}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm">
            <span className="font-medium">Project Leader:</span> {project.projectPL}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Database className="w-4 h-4 mr-2 text-purple-500" />
          <span className="text-sm">
            <span className="font-medium">Database:</span> {project.projectDatabase}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Monitor className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="text-sm">
            <span className="font-medium">OS:</span> {project.projectOS}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="text-sm font-medium">Team Size:</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTeamSizeColor(project.projectTeamcnt)}`}>
            {project.projectTeamcnt} members
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;