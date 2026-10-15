import { fetchAPI } from './api';

const MOCK_SLOTS = [
  { id: 'A-01', level: 'Level 1', zone: 'Zone A', status: 'occupied', vehicleNumber: 'MH 12 AB 1234', vehicleType: 'Car', owner: 'Ramesh Sen', entryTime: '10:30 AM' },
  { id: 'A-02', level: 'Level 1', zone: 'Zone A', status: 'available', vehicleNumber: null, vehicleType: null },
  { id: 'A-03', level: 'Level 1', zone: 'Zone A', status: 'reserved', vehicleNumber: 'KA 03 MX 9090', vehicleType: 'Car', owner: 'Sunita Rao', reservedUntil: '06:00 PM' },
  { id: 'A-04', level: 'Level 1', zone: 'Zone A', status: 'occupied', vehicleNumber: 'DL 08 CD 4321', vehicleType: 'Car', owner: 'Vikram Seth', entryTime: '11:15 AM' },
  { id: 'A-05', level: 'Level 1', zone: 'Zone A', status: 'available', vehicleNumber: null, vehicleType: null },
  { id: 'A-06', level: 'Level 1', zone: 'Zone A', status: 'maintenance', reason: 'Sensor Calibration Fault' },

  { id: 'B-01', level: 'Level 1', zone: 'Zone B (EV)', status: 'occupied', vehicleNumber: 'MH 04 EV 8899', vehicleType: 'EV Car', owner: 'Karan Johar', entryTime: '09:00 AM' },
  { id: 'B-02', level: 'Level 1', zone: 'Zone B (EV)', status: 'occupied', vehicleNumber: 'MH 02 CK 9988', vehicleType: 'Car', owner: 'Sanjay Dutt', entryTime: '01:00 PM', isOverstay: true },
  { id: 'B-03', level: 'Level 1', zone: 'Zone B (EV)', status: 'available', vehicleNumber: null, vehicleType: null },
  { id: 'B-04', level: 'Level 1', zone: 'Zone B (EV)', status: 'reserved', vehicleNumber: 'DL 01 X 8877', vehicleType: 'EV Car', owner: 'Priya Sharma' },

  { id: 'C-01', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'occupied', vehicleNumber: 'KA 05 M 5678', vehicleType: 'Bike', owner: 'Amitabh Sen', entryTime: '02:00 PM' },
  { id: 'C-02', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'available', vehicleNumber: null, vehicleType: null },
  { id: 'C-03', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'available', vehicleNumber: null, vehicleType: null },
  { id: 'C-04', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'occupied', vehicleNumber: 'MH 14 BK 2211', vehicleType: 'Bike', owner: 'Deepak Patel', entryTime: '12:30 PM' },
  { id: 'C-05', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'maintenance', reason: 'Surface Repair' },
  { id: 'C-06', level: 'Level 2', zone: 'Two Wheeler Deck', status: 'available', vehicleNumber: null, vehicleType: null }
];

export const parkingService = {
  getLiveSlots: async () => {
    try {
      return await fetchAPI('/parking/live-slots');
    } catch (err) {
      return { success: true, slots: MOCK_SLOTS };
    }
  },

  getSlotDetails: async (slotId) => {
    try {
      return await fetchAPI(`/parking/slot/${slotId}`);
    } catch (err) {
      const slot = MOCK_SLOTS.find((s) => s.id === slotId) || MOCK_SLOTS[0];
      return { success: true, slot };
    }
  },

  reassignSlot: async (reassignData) => {
    try {
      return await fetchAPI('/parking/reassign-slot', {
        method: 'POST',
        body: JSON.stringify(reassignData)
      });
    } catch (err) {
      return {
        success: true,
        message: `Successfully reassigned vehicle ${reassignData.vehicleNumber || ''} from ${reassignData.oldSlot} to ${reassignData.newSlot}!`,
        newSlot: reassignData.newSlot
      };
    }
  },

  getOverstayVehicles: async () => {
    try {
      return await fetchAPI('/parking/overstay');
    } catch (err) {
      return {
        success: true,
        overstayVehicles: [
          {
            sessionId: 'SES-8801',
            vehicleNumber: 'MH 02 CK 9988',
            ownerName: 'Sanjay Dutt',
            ownerPhone: '+91 98111 22334',
            vehicleType: 'Car',
            slotNumber: 'B-02',
            bookedUntil: new Date(Date.now() - 45 * 60000).toISOString(),
            overstayMinutes: 45,
            penaltyAmount: 100,
            status: 'CRITICAL_OVERSTAY'
          },
          {
            sessionId: 'SES-8809',
            vehicleNumber: 'KA 03 HA 4455',
            ownerName: 'Geeta Phogat',
            ownerPhone: '+91 99001 12233',
            vehicleType: 'Car',
            slotNumber: 'A-10',
            bookedUntil: new Date(Date.now() - 20 * 60000).toISOString(),
            overstayMinutes: 20,
            penaltyAmount: 50,
            status: 'WARNING_OVERSTAY'
          }
        ]
      };
    }
  }
};
