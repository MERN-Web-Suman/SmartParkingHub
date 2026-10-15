import { fetchAPI } from './api';

const MOCK_ACTIVE_VEHICLES = [
  {
    id: 'V-101',
    vehicleNumber: 'MH 12 AB 1234',
    ownerName: 'Ramesh Sen',
    ownerPhone: '+91 98901 12345',
    vehicleType: 'Car',
    slotNumber: 'A-01',
    entryTime: new Date(Date.now() - 120 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 60 * 60000).toISOString(),
    status: 'ACTIVE',
    paymentStatus: 'Prepaid'
  },
  {
    id: 'V-102',
    vehicleNumber: 'DL 08 CD 4321',
    ownerName: 'Vikram Seth',
    ownerPhone: '+91 99112 23344',
    vehicleType: 'Car',
    slotNumber: 'A-04',
    entryTime: new Date(Date.now() - 90 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 90 * 60000).toISOString(),
    status: 'ACTIVE',
    paymentStatus: 'Prepaid'
  },
  {
    id: 'V-103',
    vehicleNumber: 'MH 04 EV 8899',
    ownerName: 'Karan Johar',
    ownerPhone: '+91 98220 00112',
    vehicleType: 'EV Car',
    slotNumber: 'B-01',
    entryTime: new Date(Date.now() - 200 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 40 * 60000).toISOString(),
    status: 'ACTIVE',
    paymentStatus: 'Pay At Exit'
  },
  {
    id: 'V-104',
    vehicleNumber: 'MH 02 CK 9988',
    ownerName: 'Sanjay Dutt',
    ownerPhone: '+91 98111 22334',
    vehicleType: 'Car',
    slotNumber: 'B-02',
    entryTime: new Date(Date.now() - 210 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() - 30 * 60000).toISOString(),
    status: 'OVERSTAY',
    paymentStatus: 'Pending'
  },
  {
    id: 'V-105',
    vehicleNumber: 'KA 05 M 5678',
    ownerName: 'Amitabh Sen',
    ownerPhone: '+91 97400 99887',
    vehicleType: 'Bike',
    slotNumber: 'C-01',
    entryTime: new Date(Date.now() - 45 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() + 75 * 60000).toISOString(),
    status: 'ACTIVE',
    paymentStatus: 'Prepaid'
  }
];

export const vehicleService = {
  getActiveVehicles: async () => {
    try {
      return await fetchAPI('/vehicles/active');
    } catch (err) {
      return { success: true, vehicles: MOCK_ACTIVE_VEHICLES };
    }
  },

  searchVehicle: async (query) => {
    try {
      return await fetchAPI(`/vehicles/search?q=${encodeURIComponent(query)}`);
    } catch (err) {
      const q = query.toLowerCase().trim();
      const filtered = MOCK_ACTIVE_VEHICLES.filter(
        (v) =>
          v.vehicleNumber.toLowerCase().includes(q) ||
          v.ownerName.toLowerCase().includes(q) ||
          v.slotNumber.toLowerCase().includes(q)
      );
      return { success: true, vehicles: filtered };
    }
  },

  getVehicleDetails: async (vehicleIdOrNum) => {
    try {
      return await fetchAPI(`/vehicles/${vehicleIdOrNum}`);
    } catch (err) {
      const match = MOCK_ACTIVE_VEHICLES.find(
        (v) => v.id === vehicleIdOrNum || v.vehicleNumber.replace(/\s+/g, '').toUpperCase() === vehicleIdOrNum.replace(/\s+/g, '').toUpperCase()
      ) || MOCK_ACTIVE_VEHICLES[0];
      return { success: true, vehicle: match };
    }
  }
};
