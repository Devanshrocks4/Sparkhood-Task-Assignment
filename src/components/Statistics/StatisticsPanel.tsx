import React from 'react';
import { useIncidents } from '../../context/IncidentContext';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { AlertCircle, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const StatisticsPanel: React.FC = () => {
  const { incidents } = useIncidents();

  // Calculate statistics
  const totalIncidents = incidents.length;
  const severityCounts = {
    High: incidents.filter(i => i.severity === 'High').length,
    Medium: incidents.filter(i => i.severity === 'Medium').length,
    Low: incidents.filter(i => i.severity === 'Low').length,
  };

  // Prepare data for charts
  const pieData = [
    { name: 'High', value: severityCounts.High },
    { name: 'Medium', value: severityCounts.Medium },
    { name: 'Low', value: severityCounts.Low },
  ];

  const COLORS = ['#ef4444', '#f97316', '#22c55e'];

  // Trend data (mock data for demonstration)
  const trendData = [
    { month: 'Jan', incidents: 3 },
    { month: 'Feb', incidents: 5 },
    { month: 'Mar', incidents: 4 },
    { month: 'Apr', incidents: 7 },
    { month: 'May', incidents: 2 },
    { month: 'Jun', incidents: 6 },
  ];

  // Calculate percentages
  const getPercentage = (count: number) => {
    return totalIncidents > 0 ? Math.round((count / totalIncidents) * 100) : 0;
  };

  const StatCard = ({ title, value, icon: Icon, color }: { 
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <div className="dark-card rounded-xl p-4 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-amber-400">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-gray-900" />
        </div>
      </div>
    </div>
  );

  const chartStyles = {
    backgroundColor: '#1f2937',
    borderRadius: '0.75rem',
    border: '1px solid #374151',
    padding: '1.5rem',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Incidents"
          value={totalIncidents}
          icon={TrendingUp}
          color="bg-amber-400"
        />
        <StatCard
          title="High Severity"
          value={severityCounts.High}
          icon={AlertCircle}
          color="bg-red-500"
        />
        <StatCard
          title="Medium Severity"
          value={severityCounts.Medium}
          icon={AlertTriangle}
          color="bg-orange-500"
        />
        <StatCard
          title="Low Severity"
          value={severityCounts.Low}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <div className="dark-card rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">Severity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem',
                    color: '#e5e7eb',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Trend */}
        <div className="dark-card rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">Monthly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem',
                    color: '#e5e7eb',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#fbbf24"
                  fillOpacity={1}
                  fill="url(#colorIncidents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Comparison */}
        <div className="dark-card rounded-xl p-6 shadow-lg lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">Severity Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem',
                    color: '#e5e7eb',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#fbbf24"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;