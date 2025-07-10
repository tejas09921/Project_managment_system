const StatsCard = ({ title, value, icon: Icon, color = "blue", gradient }) => {
  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-300",
      green: "text-green-300", 
      purple: "text-purple-300",
      orange: "text-orange-300",
    };
    return colors[color] || "text-blue-300";
  };

  const getEmoji = (title) => {
    if (title.includes('Total')) return '📊';
    if (title.includes('Leaders')) return '👨‍💼';
    if (title.includes('Database')) return '🗄️';
    if (title.includes('Large')) return '🚀';
    return '⭐';
  };

  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative glass rounded-3xl p-8 border border-white/20 backdrop-blur-xl card-hover overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          <div className={`w-full h-full ${gradient} rounded-full transform rotate-45 translate-x-12 -translate-y-12`}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">{getEmoji(title)}</span>
              <p className="text-sm font-medium text-white/80">{title}</p>
            </div>
            <div className="flex items-baseline">
              <p className="text-4xl font-bold text-white neon-glow">{value}</p>
              <span className="ml-2 text-white/60 text-sm">items</span>
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 text-white drop-shadow-lg`} />
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="mt-6 relative">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${gradient} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>0</span>
            <span className="font-medium text-white/80">Active</span>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default StatsCard;