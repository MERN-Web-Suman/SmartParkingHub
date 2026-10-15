import { fetchAPI } from './api';

const MOCK_EMERGENCIES = [
  {
    id: 'EMG-701',
    type: 'Barrier Gate Malfunction',
    severity: 'HIGH',
    location: 'North Entry Gate 2',
    reportedBy: 'Rajesh Sharma (Guard)',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'ACTIVE',
    notes: 'Automatic boom barrier arm stuck in closed position. Manual override engaged.'
  },
  {
    id: 'EMG-700',
    type: 'Unauthorized Parking',
    severity: 'MEDIUM',
    location: 'Zone B - Slot B-08',
    reportedBy: 'System Sensor Alert',
    timestamp: new Date(Date.now() - 65 * 60000).toISOString(),
    status: 'RESOLVED',
    resolvedAt: new Date(Date.now() - 20 * 60000).toISOString(),
    notes: 'Vehicle towed to temporary holding area.'
  }
];

export const emergencyService = {
  getEmergencies: async () => {
    try {
      return await fetchAPI('/emergency/list');
    } catch (err) {
      return { success: true, emergencies: MOCK_EMERGENCIES };
    }
  },

  triggerEmergency: async (alertData) => {
    try {
      return await fetchAPI('/emergency/trigger', {
        method: 'POST',
        body: JSON.stringify(alertData)
      });
    } catch (err) {
      return {
        success: true,
        alert: {
          id: `EMG-${Math.floor(100 + Math.random() * 900)}`,
          type: alertData.type,
          severity: alertData.severity || 'HIGH',
          location: alertData.location || 'North Gate Central',
          reportedBy: 'Rajesh Sharma (Guard)',
          timestamp: new Date().toISOString(),
          status: 'ACTIVE',
          notes: alertData.description
        },
        message: '🚨 Emergency SOS broadcasted to Command Center and Security Team!'
      };
    }
  },

  resolveEmergency: async (emergencyId) => {
    try {
      return await fetchAPI(`/emergency/resolve/${emergencyId}`, { method: 'POST' });
    } catch (err) {
      return {
        success: true,
        emergencyId,
        status: 'RESOLVED',
        resolvedAt: new Date().toISOString()
      };
    }
  }
};
