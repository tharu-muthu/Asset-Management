import React from "react";
import { Trash2, Database,Pencil } from "lucide-react";
import { StatusBadge, CategoryIcon } from "./common/UIComponents";

const AssetTable = ({ assets, loading, onEditRequest, onDeleteRequest }) => {
  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full mb-2" />
        <p>Loading asset registry...</p>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
        <Database className="w-12 h-12 mx-auto mb-3 text-slate-300" />
        <p>No assets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-sm text-slate-600">
                Asset Name
              </th>
              <th className="p-4 font-semibold text-sm text-slate-600">
                Category
              </th>
              <th className="p-4 font-semibold text-sm text-slate-600">
                Status
              </th>
              <th className="p-4 font-semibold text-sm text-slate-600">
                Purchase Date
              </th>
              <th className="p-4 font-semibold text-sm text-slate-600 text-right">
                Value ($)
              </th>
              <th className="p-4 font-semibold text-sm text-slate-600 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="p-4">
                  <div className="font-medium text-slate-900">{asset.name}</div>
                  <div className="text-xs text-slate-400">ID: {asset.id}</div>
                </td>
                <td className="p-4">
                  <CategoryIcon category={asset.category} />
                </td>
                <td className="p-4">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm font-medium text-slate-900 text-right">
                  {Number(asset.value).toLocaleString()}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => onEditRequest(asset)}
                    className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-all"
                    title="Edit Asset"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteRequest(asset.id)}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Asset"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
