import React, { useState } from 'react';
import { vehicleService } from '../../services/vehicleService';
import { VehicleCard } from '../../components/VehicleCard';
import { Search, Car, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VehicleSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await vehicleService.searchVehicle(query);
      if (res.success) setResults(res.vehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Verification Database
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Search className="w-6 h-6 text-cyan-400" /> Vehicle Lookup & Verification
          </h1>
          <p className="text-xs text-slate-400">
            Search active or historical vehicle records by plate number or owner name.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type Vehicle Plate No (e.g., MH 12 AB 1234) or Owner Name..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 font-mono uppercase focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase rounded-xl transition shadow-lg"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Found {results.length} Matching Records
          </h3>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  onSelectAction={(veh, act) => {
                    if (act === 'EXIT') navigate('/exit/scan', { state: { query: veh.vehicleNumber } });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 glass-card rounded-2xl text-center space-y-2 text-slate-400 border border-slate-800">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No Vehicles Found</p>
              <p className="text-xs">No active parking session matches "{query}".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
