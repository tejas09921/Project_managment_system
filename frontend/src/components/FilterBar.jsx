import { Search, Filter, Users, Database } from 'lucide-react';

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
    { value: 'all', label: 'All Projects', icon: Filter },
    { value: 'leader', label: 'By Leader', icon: Users },
    { value: 'database', label: 'By Database', icon: Database },
    { value: 'bigteam', label: 'Large Teams (>25)', icon: Users },
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="flex gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Value Input */}
          {(selectedFilter === 'leader' || selectedFilter === 'database') && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Enter ${selectedFilter}...`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyFilter()}
              />
              <button
                onClick={handleApplyFilter}
                disabled={!filterValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          )}

          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;