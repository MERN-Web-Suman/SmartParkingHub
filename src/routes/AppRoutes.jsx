import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import UserDashboard from "../pages/user/UserDashboard";
import ParkingSearch from "../pages/user/ParkingSearch";
import ParkingDetails from "../pages/user/ParkingDetails";
import Prediction from "../pages/user/Prediction";
import MyVehicles from "../pages/user/MyVehicles";
import MyBookings from "../pages/user/MyBookings";
import History from "../pages/user/History";
import Payments from "../pages/user/Payments";
import Notifications from "../pages/user/Notifications";
import QREntry from "../pages/user/QREntry";
import Profile from "../pages/user/Profile";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parking"
        element={
          <ProtectedRoute>
            <ParkingSearch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parking/:id"
        element={
          <ProtectedRoute>
            <ParkingDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/prediction"
        element={
          <ProtectedRoute>
            <Prediction />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <MyVehicles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/qr-entry"
        element={
          <ProtectedRoute>
            <QREntry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-slate-800 p-6 text-center">
            <h1 className="text-6xl font-black text-emerald-600">404</h1>
            <p className="text-xl font-bold text-slate-800 mt-2">Page Not Found</p>
            <p className="text-slate-500 text-sm mt-1 mb-6">The page you are looking for doesn't exist.</p>
            <a href="/" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-md shadow-emerald-500/25">Go to Homepage</a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
