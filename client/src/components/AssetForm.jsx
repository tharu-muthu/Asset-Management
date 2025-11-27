import React, { useState } from 'react';

const AssetForm = ({ initialData, onSubmit, onCancel, loading }) => {
  // Default empty state
  const defaultData = {
    name: '', category: 'Hardware', value: '', status: 'Available', purchaseDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(defaultData);

  // EFFECT: Load data when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
        <input 
          required
          name="name"
          type="text" 
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="e.g., MacBook Pro 16"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select 
            name="category"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Hardware</option>
            <option>Software</option>
            <option>Furniture</option>
            <option>Vehicle</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select 
            name="status"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>In Use</option>
            <option>Maintenance</option>
            <option>Retired</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Value ($)</label>
          <input 
            required
            name="value"
            type="number" 
            min="0"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="0.00"
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Date</label>
          <input 
            required
            name="purchaseDate"
            type="date" 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex justify-center items-center"
        >
          {loading ? 'Saving...' : (initialData ? 'Update Asset' : 'Register Asset')}
        </button>
      </div>
    </form>
  );
};

export default AssetForm;