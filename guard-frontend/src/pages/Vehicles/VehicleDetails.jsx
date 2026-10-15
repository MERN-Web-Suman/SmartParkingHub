import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import { Car, User, Phone, MapPin, Clock, CreditCard, ArrowLeft, RefreshCw } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    vehicleService.getVehicleDetails(id || 'V-101').then((res) => {
      if (res.success) setVehicle(res.vehicle);
    });
  }, [id]);

  if (!vehicle) {
    return <div className="text-center p-12 text-slate-400">Loading vehicle audit record...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/vehicles/active')}
        className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Active Directory</span>
      </button>

      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
              Vehicle Profile
            </span>
            <h1 className="text-2xl font-extrabold text-white font-mono mt-2">{vehicle.vehicleNumber}</h1>
          </div>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">Slot {vehicle.slotNumber}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Owner Name</span>
            <p className="text-white font-bold text-sm">{vehicle.ownerName}</p>
            <p className="text-slate-400 font-mono">{vehicle.ownerPhone}</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Payment Mode</span>
            <p className="text-emerald-400 font-bold">{vehicle.paymentStatus}</p>
            <p className="text-slate-400">Type: {vehicle.vehicleType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
