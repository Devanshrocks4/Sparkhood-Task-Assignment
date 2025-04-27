import React from 'react';
import { useIncidents } from '../../context/IncidentContext';
import IncidentItem from './IncidentItem';
import { AlertCircle } from 'lucide-react';

const IncidentList: React.FC = () => {
  const { filteredIncidents } = useIncidents();
  
  if (filteredIncidents.length === 0) {
    return (
      <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center gap-3 mt-4">
        <AlertCircle size={20} />
        <p>No incidents found matching the current filters.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredIncidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;