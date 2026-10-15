import React, { useState, useEffect } from 'react';
import { vehicleService } from '../../services/vehicleService';
import { VehicleCard } from '../../components/VehicleCard';
import { useNavigate } from 'react-router-dom';
import { Car, Search, Filter, RefreshCw, Zap, Bike } from 'lucide-react';

export const ActiveVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchActiveVehicles = async () => {
    setLoading(true);
    try {
      const res = await vehicleService.getActiveVehicles();
      if (res.success) setVehicles(res.vehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveVehicles();
  }, []);

  const filtered = vehicles.filter((v) => {
    const matchesType = filterType === 'ALL' || v.vehicleType === filterType;
    const matchesSearch =
      v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.slotNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAction = (vehicle, action) => {
    if (action === 'EXIT') {
      navigate('/exit/scan', { state: { query: vehicle.vehicleNumber } });
    } else if (action === 'REASSIGN') {
      navigate('/parking/reassign', { state: { slot: { id: vehicle.slotNumber, vehicleNumber: vehicle.vehicleNumber, owner: vehicle.ownerName } } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Occupancy Registry
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Car className="w-6 h-6 text-amber-400" /> Active Parked Vehicles ({vehicles.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time directory of all vehicles currently inside the parking facility.
          </p>
        </div>

        <button
          onClick={fetchActiveVehicles}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
        >
          <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reg. no, owner, or slot..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 text-xs w-full md:w-auto overflow-x-auto">
          {['ALL', 'Car', 'EV Car', 'Bike'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-2 rounded-xl font-bold transition ${
                filterType === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelectAction={handleAction}
          />
        ))}
      </div>
    </div>
  );
};
