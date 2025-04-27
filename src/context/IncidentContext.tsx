import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Incident, IncidentFilters, Severity } from '../types/incident';
import { mockIncidents } from '../data/mockIncidents';
import { getCurrentTimestamp } from '../utils/formatDate';

interface IncidentContextProps {
  incidents: Incident[];
  filters: IncidentFilters;
  addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
  updateFilters: (filters: Partial<IncidentFilters>) => void;
  filteredIncidents: Incident[];
}

const IncidentContext = createContext<IncidentContextProps | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

interface IncidentProviderProps {
  children: ReactNode;
}

export const IncidentProvider: React.FC<IncidentProviderProps> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filters, setFilters] = useState<IncidentFilters>({
    severity: 'All',
    sortOrder: 'newest',
    search: '',
  });

  const addIncident = (incidentData: Omit<Incident, 'id' | 'reported_at'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1,
      reported_at: getCurrentTimestamp(),
    };
    
    setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
  };

  const updateFilters = (newFilters: Partial<IncidentFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Apply filters, search, and sorting
  const filteredIncidents = incidents
    .filter(incident => {
      // Apply severity filter
      if (filters.severity !== 'All' && incident.severity !== filters.severity) {
        return false;
      }
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          incident.title.toLowerCase().includes(searchLower) ||
          incident.description.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return filters.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const value = {
    incidents,
    filters,
    addIncident,
    updateFilters,
    filteredIncidents,
  };

  return (
    <IncidentContext.Provider value={value}>
      {children}
    </IncidentContext.Provider>
  );
};