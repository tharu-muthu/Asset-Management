import React, { useState, useEffect, useMemo } from 'react';
import { Search, Database, LayoutGrid, AlertTriangle } from 'lucide-react';

import { fetchAssets, createAsset, updateAsset, deleteAsset } from './api/assetApi';
import NavBar from './components/NavBar';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';
import { StatCard, Modal } from './components/common/UIComponents';

export default function AssetManager() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  

  const [uiState, setUiState] = useState({
    isFormOpen: false,
    deleteId: null,
    editingAsset: null 
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAssets();
      setAssets(data);
    } catch (err) {
      console.error("Failed to fetch assets", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. NEW: Handle opening the form for EDITING
  const handleEditRequest = (asset) => {
    setUiState(prev => ({ 
      ...prev, 
      isFormOpen: true, 
      editingAsset: asset // Store the asset data
    }));
  };

  // 3. NEW: Handle opening the form for CREATING (Reset editingAsset)
  const handleAddRequest = () => {
    setUiState(prev => ({ 
      ...prev, 
      isFormOpen: true, 
      editingAsset: null // Ensure it is null
    }));
  };

  // 4. UPDATED: Handle Submit (Switch between Create and Update)
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (uiState.editingAsset) {
        // --- UPDATE LOGIC ---
        await updateAsset(uiState.editingAsset.id, formData);
      } else {
        // --- CREATE LOGIC ---
        await createAsset(formData);
      }
      
      await loadData();
      // Close modal and reset editing state
      setUiState(prev => ({ ...prev, isFormOpen: false, editingAsset: null }));
    } catch (err) {
      console.error("Error saving asset", err);
      alert("Failed to save asset");
    } finally {
        setLoading(false);
    }
  };

  // ... (handleDeleteAsset remains the same)
  const handleDeleteAsset = async () => {
    if (!uiState.deleteId) return;
    setLoading(true);
    try {
        await deleteAsset(uiState.deleteId);
        await loadData();
        setUiState(prev => ({ ...prev, deleteId: null }));
    } catch (err) {
        console.error("Error deleting asset", err);
        alert("Failed to delete asset");
    } finally {
        setLoading(false);
    }
  };

  // ... (Derived state remains the same)
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assets, searchTerm]);

  const stats = useMemo(() => ({
    total: assets.length,
    value: assets.reduce((sum, item) => sum + Number(item.value), 0),
    maintenance: assets.filter(a => a.status === 'Maintenance').length
  }), [assets]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Update NavBar to use handleAddRequest */}
      <NavBar onAddClick={handleAddRequest} />
      
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* ... (Stats and Search sections remain exactly the same) ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Assets" value={stats.total} icon={Database} color="bg-blue-500" />
          <StatCard title="Portfolio Value" value={`$${stats.value.toLocaleString()}`} icon={LayoutGrid} color="bg-emerald-500" />
          <StatCard title="Pending Maintenance" value={stats.maintenance} icon={AlertTriangle} color="bg-amber-500" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredAssets.length}</span> records
          </div>
        </div>

        {/* 5. Update AssetTable: Pass handleEditRequest */}
        <AssetTable 
          assets={filteredAssets} 
          loading={loading} 
          onEditRequest={handleEditRequest} // Pass the edit handler
          onDeleteRequest={(id) => setUiState(prev => ({ ...prev, deleteId: id }))} 
        />
      </main>

      {/* 6. Update Modal: Dynamic Title and pass initialData */}
      <Modal 
        isOpen={uiState.isFormOpen} 
        onClose={() => setUiState(prev => ({ ...prev, isFormOpen: false, editingAsset: null }))}
        title={uiState.editingAsset ? "Edit Asset Details" : "Register New Asset"}
      >
        <AssetForm 
          initialData={uiState.editingAsset} // Pass the asset data to form
          onSubmit={handleFormSubmit}
          onCancel={() => setUiState(prev => ({ ...prev, isFormOpen: false, editingAsset: null }))}
          loading={loading}
        />
      </Modal>

      {/* ... (Delete Modal remains the same) ... */}
      <Modal
        isOpen={!!uiState.deleteId}
        onClose={() => setUiState(prev => ({ ...prev, deleteId: null }))}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">Are you sure you want to delete this asset record?</p>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setUiState(prev => ({ ...prev, deleteId: null }))} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button onClick={handleDeleteAsset} className="px-4 py-2 text-white bg-red-600 rounded-lg">Delete Permanently</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}