import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const GuardLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: 'radial-gradient(1200px 800px at 20% 0%, rgba(16, 185, 129, 0.08), transparent 60%), radial-gradient(1000px 700px at 80% 100%, rgba(6, 182, 212, 0.07), transparent 60%), radial-gradient(800px 600px at 50% 40%, rgba(99, 102, 241, 0.04), transparent 50%), #030712',
        color: '#e2e8f0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Left Sidebar — fixed width, full height */}
      <div style={{ width: '256px', flexShrink: 0, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

