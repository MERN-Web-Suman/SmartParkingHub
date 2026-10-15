import { fetchAPI } from './api';

// Mock DB store for initial data
const MOCK_BOOKINGS = [
  {
    bookingId: 'BK-2026-9901',
    qrCode: 'QR-BK-9901',
    vehicleNumber: 'MH 12 AB 4321',
    ownerName: 'Vikramaditya Roy',
    ownerPhone: '+91 98234 11223',
    vehicleType: 'Car',
    bookedSlot: 'A-12',
    zone: 'Floor 1 - Zone A',
    bookedFrom: new Date(Date.now() - 30 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 150 * 60000).toISOString(),
    status: 'Booked',
    paymentStatus: 'Paid Prepaid',
    amount: 120
  },
  {
    bookingId: 'BK-2026-9902',
    qrCode: 'QR-BK-9902',
    vehicleNumber: 'DL 01 X 8877',
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 99102 33445',
    vehicleType: 'EV Car',
    bookedSlot: 'B-04',
    zone: 'EV Charging Zone',
    bookedFrom: new Date().toISOString(),
    bookedUntil: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'Booked',
    paymentStatus: 'Paid Prepaid',
    amount: 200
  },
  {
    bookingId: 'BK-2026-9903',
    qrCode: 'QR-BK-9903',
    vehicleNumber: 'KA 05 M 5678',
    ownerName: 'Amitabh Sen',
    ownerPhone: '+91 97400 99887',
    vehicleType: 'Bike',
    bookedSlot: 'C-08',
    zone: 'Two Wheeler Deck',
    bookedFrom: new Date(Date.now() - 60 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 60 * 60000).toISOString(),
    status: 'Booked',
    paymentStatus: 'Pay At Exit',
    amount: 40
  }
];

export const entryService = {
  verifyQR: async (qrCode) => {
    try {
      return await fetchAPI(`/entry/verify-qr?code=${qrCode}`);
    } catch (err) {
      const match = MOCK_BOOKINGS.find(
        (b) => b.qrCode === qrCode || b.bookingId === qrCode || b.vehicleNumber.replace(/\s+/g, '').toUpperCase() === qrCode.replace(/\s+/g, '').toUpperCase()
      );
      if (match) {
        return { success: true, booking: match };
      }
      // If code looks like a fresh custom code
      return {
        success: true,
        booking: {
          bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
          qrCode: qrCode,
          vehicleNumber: qrCode.includes('MH') || qrCode.includes('DL') ? qrCode : 'KA 03 EV 7007',
          ownerName: 'Rahul Verma',
          ownerPhone: '+91 98765 00112',
          vehicleType: 'Car',
          bookedSlot: 'A-15',
          zone: 'Floor 1 - Zone A',
          bookedFrom: new Date().toISOString(),
          bookedUntil: new Date(Date.now() + 120 * 60000).toISOString(),
          status: 'Booked',
          paymentStatus: 'Prepaid',
          amount: 100
        }
      };
    }
  },

  confirmEntry: async (entryData) => {
    try {
      return await fetchAPI('/entry/confirm', {
        method: 'POST',
        body: JSON.stringify(entryData)
      });
    } catch (err) {
      return {
        success: true,
        ticketId: `TCK-${Date.now().toString().slice(-6)}`,
        entryTime: new Date().toISOString(),
        vehicleNumber: entryData.vehicleNumber,
        slotNumber: entryData.assignedSlot || entryData.bookedSlot,
        gate: 'GATE-NORTH-01',
        message: 'Vehicle Entry Authorized successfully!'
      };
    }
  },

  manualEntry: async (manualData) => {
    try {
      return await fetchAPI('/entry/manual', {
        method: 'POST',
        body: JSON.stringify(manualData)
      });
    } catch (err) {
      return {
        success: true,
        ticketId: `MAN-${Date.now().toString().slice(-6)}`,
        entryTime: new Date().toISOString(),
        vehicleNumber: manualData.vehicleNumber,
        slotNumber: manualData.assignedSlot,
        gate: 'GATE-NORTH-01',
        isManual: true,
        reason: manualData.reason || 'QR Code Damage'
      };
    }
  }
};
