import { fetchAPI } from './api';

const MOCK_NOTIFICATIONS = [
  {
    id: 'NOT-101',
    title: 'Overstay Alert',
    message: 'Vehicle MH 02 CK 9988 has exceeded booked duration by 45 minutes in Slot B-02.',
    type: 'warning',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    isRead: false
  },
  {
    id: 'NOT-102',
    title: 'VIP Arrival Scheduled',
    message: 'VIP Booking confirmed for Slot A-01 at 03:00 PM (Govt Delegate). Ensure clear passage.',
    type: 'info',
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
    isRead: false
  },
  {
    id: 'NOT-103',
    title: 'Slot Sensor Restored',
    message: 'Sensor for Slot C-03 has been recalibrated and marked available.',
    type: 'success',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
    isRead: true
  },
  {
    id: 'NOT-104',
    title: 'Shift Handover Reminder',
    message: 'Shift B begins at 04:00 PM. Please generate daily entry summary before logging off.',
    type: 'info',
    timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
    isRead: true
  }
];

export const notificationService = {
  getNotifications: async () => {
    try {
      return await fetchAPI('/notifications');
    } catch (err) {
      return { success: true, notifications: MOCK_NOTIFICATIONS };
    }
  },

  markAsRead: async (notificationId) => {
    try {
      return await fetchAPI(`/notifications/read/${notificationId}`, { method: 'POST' });
    } catch (err) {
      return { success: true, id: notificationId };
    }
  },

  markAllAsRead: async () => {
    try {
      return await fetchAPI('/notifications/read-all', { method: 'POST' });
    } catch (err) {
      return { success: true };
    }
  }
};
