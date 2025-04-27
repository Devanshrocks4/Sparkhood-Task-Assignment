import React from 'react';
import FilterBar from '../FilterBar/FilterBar';
import IncidentList from '../Incidents/IncidentList';
import NewIncidentForm from '../Forms/NewIncidentForm';
import StatisticsPanel from '../Statistics/StatisticsPanel';
import { AlertTriangle, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-400/10 rounded-lg">
              <Shield size={32} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-amber-400">AI Safety Incident Dashboard</h1>
              <p className="text-gray-400 mt-2 text-lg">
                Monitor, track, and report AI safety incidents to improve safety standards.
              </p>
            </div>
          </div>
          <div className="h-1 w-24 bg-amber-400 rounded-full mt-4"></div>
        </header>

        <StatisticsPanel />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="dark-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
              <div className="p-4 border-b border-gray-700 bg-gray-800/50">
                <div className="flex items-center gap-2 text-gray-300">
                  <AlertTriangle size={18} className="text-amber-400" />
                  <h2 className="font-semibold">Reported Incidents</h2>
                </div>
              </div>
              <div className="p-4">
                <FilterBar />
                <IncidentList />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <NewIncidentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;