import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GuardLayout } from '../layouts/GuardLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

import { EntryScanner } from '../pages/Entry/EntryScanner';
import { EntryDetails } from '../pages/Entry/EntryDetails';
import { EntrySuccess } from '../pages/Entry/EntrySuccess';

import { ExitScanner } from '../pages/Exit/ExitScanner';
import { ExitDetails } from '../pages/Exit/ExitDetails';
import { BillDetails } from '../pages/Exit/BillDetails';
import { ExitSuccess } from '../pages/Exit/ExitSuccess';

import { LiveParking } from '../pages/Parking/LiveParking';
import { SlotDetails } from '../pages/Parking/SlotDetails';
import { SlotReassignment } from '../pages/Parking/SlotReassignment';

import { ActiveVehicles } from '../pages/Vehicles/ActiveVehicles';
import { VehicleDetails } from '../pages/Vehicles/VehicleDetails';
import { VehicleSearch } from '../pages/Vehicles/VehicleSearch';

import { Billing } from '../pages/Billing/Billing';
import { PaymentDetails } from '../pages/Billing/PaymentDetails';

import { EntryHistory } from '../pages/History/EntryHistory';
import { ExitHistory } from '../pages/History/ExitHistory';
import { ParkingHistory } from '../pages/History/ParkingHistory';

import { OverstayVehicles } from '../pages/Overstay/OverstayVehicles';
import { Emergency } from '../pages/Emergency/Emergency';
import { CreateEmergency } from '../pages/Emergency/CreateEmergency';

import { Notifications } from '../pages/Notifications/Notifications';
import { ReportIssue } from '../pages/Reports/ReportIssue';
import { Profile } from '../pages/Profile/Profile';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <GuardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Entry Flow */}
        <Route path="entry/scan" element={<EntryScanner />} />
        <Route path="entry/details" element={<EntryDetails />} />
        <Route path="entry/success" element={<EntrySuccess />} />

        {/* Exit Flow */}
        <Route path="exit/scan" element={<ExitScanner />} />
        <Route path="exit/details" element={<ExitDetails />} />
        <Route path="exit/bill" element={<BillDetails />} />
        <Route path="exit/success" element={<ExitSuccess />} />

        {/* Parking & Slot Operations */}
        <Route path="parking/live" element={<LiveParking />} />
        <Route path="parking/slot/:id" element={<SlotDetails />} />
        <Route path="parking/reassign" element={<SlotReassignment />} />

        {/* Vehicle Management */}
        <Route path="vehicles/active" element={<ActiveVehicles />} />
        <Route path="vehicles/search" element={<VehicleSearch />} />
        <Route path="vehicles/:id" element={<VehicleDetails />} />

        {/* Billing & Payments */}
        <Route path="billing" element={<Billing />} />
        <Route path="billing/:id" element={<PaymentDetails />} />

        {/* History Logs */}
        <Route path="history" element={<EntryHistory />} />
        <Route path="history/exit" element={<ExitHistory />} />
        <Route path="history/master" element={<ParkingHistory />} />

        {/* Overstay Control */}
        <Route path="overstay" element={<OverstayVehicles />} />

        {/* Emergency SOS */}
        <Route path="emergency" element={<Emergency />} />
        <Route path="emergency/create" element={<CreateEmergency />} />

        {/* Notifications, Reports & Profile */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<ReportIssue />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
