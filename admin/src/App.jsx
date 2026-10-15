import { useState } from "react";
import { Toaster } from "react-hot-toast";

import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

import OverviewView from "./components/views/OverviewView";
import ParkingMgmtView from "./components/views/ParkingMgmtView";
import UserMgmtView from "./components/views/UserMgmtView";
import VehicleMgmtView from "./components/views/VehicleMgmtView";
import ReservationsView from "./components/views/ReservationsView";
import SessionsView from "./components/views/SessionsView";
import PaymentsView from "./components/views/PaymentsView";
import AnalyticsView from "./components/views/AnalyticsView";
import PredictionsView from "./components/views/PredictionsView";
import NotificationsView from "./components/views/NotificationsView";
import AnnouncementsView from "./components/views/AnnouncementsView";
import LiveMonitoringView from "./components/views/LiveMonitoringView";
import ReportsView from "./components/views/ReportsView";
import SettingsView from "./components/views/SettingsView";


export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard": return "System Overview Dashboard";
      case "parking": return "Parking Areas & Slots Management";
      case "users": return "User Accounts Management";
      case "vehicles": return "Vehicle Directory & License History";
      case "reservations": return "Reservations Control Hub";
      case "sessions": return "Real-time Active Parking Sessions";
      case "payments": return "Transactions & Revenue Breakdown";
      case "analytics": return "Occupancy & Usage Analytics";
      case "predictions": return "AI Availability Forecast";
      case "notifications": return "System Notifications Feed";
      case "announcements": return "Broadcast Announcements Publisher";
      case "live": return "Real-Time 2D Floorplan Visualizer";
      case "reports": return "Reports Export Center";
      case "settings": return "Admin Configuration & Pricing Engine";
      default: return "Admin Control Panel";
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard": return <OverviewView />;
      case "parking": return <ParkingMgmtView />;
      case "users": return <UserMgmtView />;
      case "vehicles": return <VehicleMgmtView />;
      case "reservations": return <ReservationsView />;
      case "sessions": return <SessionsView />;
      case "payments": return <PaymentsView />;
      case "analytics": return <AnalyticsView />;
      case "predictions": return <PredictionsView />;
      case "notifications": return <NotificationsView />;
      case "announcements": return <AnnouncementsView />;
      case "live": return <LiveMonitoringView />;
      case "reports": return <ReportsView />;
      case "settings": return <SettingsView />;
      default: return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100 flex selection:bg-emerald-500 selection:text-slate-950">
      <Toaster position="top-right" />

      {/* Sidebar for Desktop */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          activeTabTitle={getTitle()}
          onQuickAddArea={() => setActiveTab("parking")}
          onQuickAddSlot={() => setActiveTab("parking")}
          onBroadcast={() => setActiveTab("announcements")}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Mobile Drawer Navigation */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0D1B2A] border-b border-white/10 p-4 space-y-1 z-30">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "parking", label: "Parking Management" },
              { id: "users", label: "User Management" },
              { id: "vehicles", label: "Vehicle Management" },
              { id: "reservations", label: "Reservations" },
              { id: "sessions", label: "Parking Sessions" },
              { id: "payments", label: "Payments" },
              { id: "analytics", label: "Analytics" },
              { id: "predictions", label: "AI Predictions" },
              { id: "notifications", label: "Notifications" },
              { id: "announcements", label: "Announcements" },
              { id: "live", label: "Live Monitoring" },
              { id: "reports", label: "Reports" },
              { id: "settings", label: "Settings" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveTab(nav.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                  activeTab === nav.id ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        )}

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
