import { Users, Database, Monitor, User, Star, Zap } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getTeamSizeColor = (count) => {
    if (count > 25) return 'from-red-400 to-pink-500 text-white';
    if (count > 15) return 'from-orange-400 to-yellow-500 text-white';
    return 'from-green-400 to-emerald-500 text-white';
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-purple-400 via-pink-500 to-red-500',
      'from-blue-400 via-purple-500 to-pink-500',
      'from-green-400 via-blue-500 to-purple-600',
      'from-yellow-400 via-red-500 to-pink-500',
      'from-indigo-400 via-purple-500 to-pink-500',
      'from-teal-400 via-blue-500 to-purple-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const cardGradient = getRandomGradient();

  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative glass rounded-3xl p-8 card-hover border border-white/20 backdrop-blur-xl overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className={`w-full h-full bg-gradient-to-br ${cardGradient} rounded-full transform rotate-45 translate-x-16 -translate-y-16`}></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${cardGradient} shadow-lg`}>
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                {project.projectnm}
              </h3>
              <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                ID: {project.projectid}
              </span>
            </div>
          </div>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center text-white/90 p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <div className="p-2 rounded-lg bg-blue-500/20 mr-3">
              <User className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <span className="text-sm text-white/70 block">Project Leader</span>
              <span className="font-semibold text-white">{project.projectPL}</span>
            </div>
          </div>
          
          <div className="flex items-center text-white/90 p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <div className="p-2 rounded-lg bg-purple-500/20 mr-3">
              <Database className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <span className="text-sm text-white/70 block">Database</span>
              <span className="font-semibold text-white">{project.projectDatabase}</span>
            </div>
          </div>
          
          <div className="flex items-center text-white/90 p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <div className="p-2 rounded-lg bg-indigo-500/20 mr-3">
              <Monitor className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <span className="text-sm text-white/70 block">Operating System</span>
              <span className="font-semibold text-white">{project.projectOS}</span>
            </div>
          </div>
          
          {/* Team Size - Special styling */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-emerald-500/20 mr-3">
                <Users className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-sm text-white/70 block">Team Size</span>
                <span className="font-semibold text-white">Active Members</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getTeamSizeColor(project.projectTeamcnt)} font-bold text-sm shadow-lg transform hover:scale-105 transition-transform`}>
              {project.projectTeamcnt} 👥
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default ProjectCard;