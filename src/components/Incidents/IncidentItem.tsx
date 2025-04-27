import React, { useState } from 'react';
import { Incident } from '../../types/incident';
import { formatDate } from '../../utils/formatDate';
import { ChevronDown, ChevronUp, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleDetails = () => {
    setExpanded(!expanded);
  };
  
  const getSeverityConfig = (severity: Incident['severity']) => {
    switch (severity) {
      case 'High':
        return {
          colors: 'bg-red-50 text-red-800 border-red-100',
          icon: <AlertCircle size={16} className="text-red-600" />
        };
      case 'Medium':
        return {
          colors: 'bg-orange-50 text-orange-800 border-orange-100',
          icon: <AlertTriangle size={16} className="text-orange-600" />
        };
      case 'Low':
        return {
          colors: 'bg-green-50 text-green-800 border-green-100',
          icon: <CheckCircle size={16} className="text-green-600" />
        };
      default:
        return {
          colors: 'bg-gray-50 text-gray-800 border-gray-100',
          icon: null
        };
    }
  };

  const severityConfig = getSeverityConfig(incident.severity);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="p-4 cursor-pointer transition-colors hover:bg-gray-50" 
        onClick={toggleDetails}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{incident.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${severityConfig.colors}`}>
                {severityConfig.icon}
                {incident.severity}
              </div>
              <span className="text-gray-500">
                {formatDate(incident.reported_at)}
              </span>
            </div>
          </div>
          
          <button 
            className="self-start text-gray-400 hover:text-gray-600 transition-colors p-1"
            onClick={(e) => {
              e.stopPropagation();
              toggleDetails();
            }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 animate-fadeIn">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {incident.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;