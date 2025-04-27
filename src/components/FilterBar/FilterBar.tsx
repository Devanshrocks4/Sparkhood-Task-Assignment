import React, { useState } from 'react';
import { useIncidents } from '../../context/IncidentContext';
import { Severity } from '../../types/incident';
import { ArrowDownAZ, ArrowUpAZ, Filter, Search, Calendar, X } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { filters, updateFilters } = useIncidents();
  const [searchTerm, setSearchTerm] = useState('');
  
  const severityOptions: (Severity | 'All')[] = ['All', 'Low', 'Medium', 'High'];
  
  const handleSeverityChange = (severity: Severity | 'All') => {
    updateFilters({ severity });
  };
  
  const toggleSortOrder = () => {
    updateFilters({ 
      sortOrder: filters.sortOrder === 'newest' ? 'oldest' : 'newest' 
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Add search functionality to your context if needed
  };

  const clearSearch = () => {
    setSearchTerm('');
    // Clear search in context if needed
  };
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
        />
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Severity Filters */}
        <div className="w-full sm:w-auto space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter size={16} />
            <h2 className="text-sm font-medium">Filter by Severity</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {severityOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSeverityChange(option)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filters.severity === option
                    ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/20'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm font-medium transition-all duration-200 w-full sm:w-auto justify-center"
          >
            {filters.sortOrder === 'newest' ? (
              <>
                <Calendar size={16} /> Newest First
              </>
            ) : (
              <>
                <Calendar size={16} /> Oldest First
              </>
            )}
          </button>
          
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm font-medium transition-all duration-200 w-full sm:w-auto justify-center"
          >
            {filters.sortOrder === 'newest' ? (
              <>
                <ArrowDownAZ size={16} /> A-Z
              </>
            ) : (
              <>
                <ArrowUpAZ size={16} /> Z-A
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;