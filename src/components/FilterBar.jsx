import { Search, Filter, Users, Database, Sparkles, Target } from 'lucide-react';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedFilter, 
  setSelectedFilter,
  filterValue,
  setFilterValue,
  onApplyFilter,
  onClearFilters 
}) => {
  const filterOptions = [
    { value: 'all', label: '🌟 All Projects', icon: Filter },
    { value: 'leader', label: '👨‍💼 By Leader', icon: Users },
    { value: 'database', label: '🗄️ By Database', icon: Database },
    { value: 'bigteam', label: '🚀 Large Teams (>25)', icon: Users },
  ];

  const handleFilterChange = (filterType) => {
    setSelectedFilter(filterType);
    setFilterValue('');
    if (filterType === 'all' || filterType === 'bigteam') {
      onApplyFilter();
    }
  };

  const handleApplyFilter = () => {
    if (selectedFilter === 'leader' || selectedFilter === 'database') {
      if (filterValue.trim()) {
        onApplyFilter();
      }
    }
  };

  return (
    <div className="relative mb-8">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-30"></div>
      
      <div className="relative glass rounded-3xl p-8 border border-white/20 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <Target className="w-6 h-6 text-cyan-300 mr-3" />
          <h3 className="text-xl font-bold text-white">Search & Filter Projects</h3>
          <Sparkles className="w-5 h-5 text-yellow-300 ml-2 animate-pulse" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-hover:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="🔍 Search projects, leaders, databases, OS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm hover:bg-white/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4">
            {/* Filter Dropdown */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="relative px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-400 focus:border-transparent text-white backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Value Input */}
            {(selectedFilter === 'leader' || selectedFilter === 'database') && (
              <div className="flex gap-3">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <input
                    type="text"
                    placeholder={`✨ Enter ${selectedFilter}...`}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="relative px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm hover:bg-white/20 transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyFilter()}
                  />
                </div>
                <button
                  onClick={handleApplyFilter}
                  disabled={!filterValue.trim()}
                  className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 btn-bounce ripple"
                >
                  🎯 Apply
                </button>
              </div>
            )}

            <button
              onClick={onClearFilters}
              className="relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 btn-bounce ripple"
            >
              🧹 Clear All
            </button>
          </div>
        </div>

        {/* Active filter indicator */}
        {(searchTerm || selectedFilter !== 'all') && (
          <div className="mt-6 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg">
                🔍 Search: "{searchTerm}"
              </span>
            )}
            {selectedFilter !== 'all' && (
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium shadow-lg">
                🎯 Filter: {filterOptions.find(f => f.value === selectedFilter)?.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;