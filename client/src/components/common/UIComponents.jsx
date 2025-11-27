import React from 'react';
import { X, HardDrive, Monitor, LayoutGrid, Database } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const styles = {
    'In Use': 'bg-blue-100 text-blue-700',
    'Available': 'bg-emerald-100 text-emerald-700',
    'Maintenance': 'bg-amber-100 text-amber-700',
    'Active': 'bg-purple-100 text-purple-700',
    'Retired': 'bg-slate-100 text-slate-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles['Retired']}`}>
      {status}
    </span>
  );
};

export const CategoryIcon = ({ category }) => {
  const icons = {
    'Hardware': HardDrive,
    'Software': Monitor,
    'Furniture': LayoutGrid,
    'default': Database
  };
  const Icon = icons[category] || icons['default'];
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <Icon size={16} />
      <span className="text-sm">{category}</span>
    </div>
  );
};