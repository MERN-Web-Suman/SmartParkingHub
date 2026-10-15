import React, { createContext, useState, useEffect } from 'react';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [liveStats, setLiveStats] = useState({
    todayEntries: 142,
    todayExits: 118,
    activeVehicles: 24,
    availableSlots: 46,
    overstayCount: 2,
    gateStatus: 'NORMAL_OPERATIONAL'
  });
  const [recentEvents, setRecentEvents] = useState([
    { id: 1, type: 'ENTRY', text: 'Vehicle MH 12 AB 4321 entered via Gate 1', time: '2 mins ago' },
    { id: 2, type: 'EXIT', text: 'Vehicle KA 03 MX 9090 exited via Gate 2', time: '8 mins ago' },
    { id: 3, type: 'OVERSTAY', text: 'Slot B-02 vehicle exceeded time limit', time: '15 mins ago' }
  ]);

  // Simulate subtle real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random subtle status updates to show real-time live connection
      setLiveStats((prev) => {
        const change = Math.random() > 0.6 ? 1 : 0;
        return {
          ...prev,
          availableSlots: Math.max(10, Math.min(60, prev.availableSlots + (Math.random() > 0.5 ? change : -change)))
        };
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const addEvent = (event) => {
    setRecentEvents((prev) => [
      { id: Date.now(), ...event, time: 'Just now' },
      ...prev.slice(0, 15)
    ]);
  };

  return (
    <SocketContext.Provider value={{ isConnected, liveStats, setLiveStats, recentEvents, addEvent }}>
      {children}
    </SocketContext.Provider>
  );
};
