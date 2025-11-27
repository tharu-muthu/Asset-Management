import React from 'react';
import { Plus, Server } from 'lucide-react';

const NavBar = ({ onAddClick }) => (
  <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <div className="bg-indigo-600 p-2 rounded-lg">
        <Server className="text-white w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold text-slate-800">
        AssetMaster 
        <span className="text-xs font-normal text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 ml-2">
          v1.0
        </span>
      </h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center text-xs text-slate-400 gap-2">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div> DB Connected
        </span>
      </div>
      <button 
        onClick={onAddClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
      >
        <Plus size={18} />
        <span>Add Asset</span>
      </button>
    </div>
  </nav>
);

export default NavBar;