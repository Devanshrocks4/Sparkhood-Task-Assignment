import React, { useState } from 'react';
import { useIncidents } from '../../context/IncidentContext';
import { Severity } from '../../types/incident';
import { CheckCircle2, X, PlusCircle, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  severity: Severity;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  severity: 'Medium',
};

const NewIncidentForm: React.FC = () => {
  const { addIncident } = useIncidents();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addIncident(formData);
      setFormData(initialFormData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case 'High':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'Medium':
        return <AlertTriangle size={16} className="text-orange-500" />;
      case 'Low':
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };
  
  return (
    <div className="dark-card rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center gap-2 text-gray-300">
          <PlusCircle size={18} className="text-amber-400" />
          <h2 className="font-semibold">Report New Incident</h2>
        </div>
      </div>
      
      <div className="p-6">
        {showSuccess && (
          <div className="mb-6 p-3 bg-green-900/30 text-green-400 rounded-lg flex items-center gap-2 animate-fadeIn border border-green-500/20">
            <CheckCircle2 size={18} />
            <span>Incident successfully reported!</span>
            <button 
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-400 hover:text-green-300 p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-900 ${
                errors.title 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-amber-400 focus:ring-amber-400/20'
              } border focus:outline-none focus:ring-4 transition-shadow text-gray-200`}
              placeholder="Enter incident title"
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.title}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-900 ${
                errors.description
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-amber-400 focus:ring-amber-400/20'
              } border focus:outline-none focus:ring-4 transition-shadow text-gray-200`}
              placeholder="Provide detailed description of the incident"
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-300 mb-1">
              Severity
            </label>
            <div className="relative">
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-shadow appearance-none text-gray-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {getSeverityIcon(formData.severity)}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-400 text-gray-900 py-2.5 px-4 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <PlusCircle size={18} />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncidentForm;