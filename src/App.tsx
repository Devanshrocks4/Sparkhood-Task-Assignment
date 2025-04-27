import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navigation/Navbar';
import { IncidentProvider } from './context/IncidentContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <IncidentProvider>
        <Navbar />
        <Dashboard />
      </IncidentProvider>
    </div>
  );
}

export default App;