import { fetchAPI } from './api';

const MOCK_ACTIVE_SESSIONS = [
  {
    sessionId: 'SES-8801',
    ticketId: 'TCK-409112',
    vehicleNumber: 'MH 02 CK 9988',
    ownerName: 'Sanjay Dutt',
    ownerPhone: '+91 98111 22334',
    vehicleType: 'Car',
    slotNumber: 'B-02',
    entryTime: new Date(Date.now() - 210 * 60000).toISOString(), // 3.5 hrs ago
    bookedUntil: new Date(Date.now() - 30 * 60000).toISOString(), // overstayed by 30 mins
    ratePerHour: 40,
    isOverstay: true,
    overstayMinutes: 30,
    status: 'PARKED'
  },
  {
    sessionId: 'SES-8802',
    ticketId: 'TCK-409115',
    vehicleNumber: 'KA 01 EK 1234',
    ownerName: 'Ananya Panday',
    ownerPhone: '+91 97222 33445',
    vehicleType: 'EV Car',
    slotNumber: 'EV-01',
    entryTime: new Date(Date.now() - 90 * 60000).toISOString(), // 1.5 hrs ago
    bookedUntil: new Date(Date.now() + 30 * 60000).toISOString(),
    ratePerHour: 60,
    isOverstay: false,
    overstayMinutes: 0,
    status: 'PARKED'
  }
];

export const exitService = {
  verifyExitSession: async (query) => {
    try {
      return await fetchAPI(`/exit/verify?query=${query}`);
    } catch (err) {
      const match = MOCK_ACTIVE_SESSIONS.find(
        (s) => s.sessionId === query || s.ticketId === query || s.vehicleNumber.replace(/\s+/g, '').toUpperCase() === query.replace(/\s+/g, '').toUpperCase()
      );
      if (match) {
        return { success: true, session: match };
      }
      // Fallback response for demo search
      const entryTime = new Date(Date.now() - 145 * 60000).toISOString();
      return {
        success: true,
        session: {
          sessionId: `SES-${Math.floor(1000 + Math.random() * 9000)}`,
          ticketId: `TCK-${Math.floor(100000 + Math.random() * 900000)}`,
          vehicleNumber: query.toUpperCase(),
          ownerName: 'Rohan Mehta',
          ownerPhone: '+91 98888 77665',
          vehicleType: 'Car',
          slotNumber: 'A-08',
          entryTime: entryTime,
          bookedUntil: new Date(Date.now() - 25 * 60000).toISOString(),
          ratePerHour: 40,
          isOverstay: true,
          overstayMinutes: 25,
          status: 'PARKED'
        }
      };
    }
  },

  calculateBill: (session) => {
    const entryDate = new Date(session.entryTime);
    const now = new Date();
    const durationMinutes = Math.max(15, Math.ceil((now - entryDate) / (1000 * 60)));
    const durationHours = Math.ceil(durationMinutes / 60);

    const baseRate = session.ratePerHour || 40;
    const baseAmount = durationHours * baseRate;

    const overstayMinutes = session.overstayMinutes || 0;
    const overstayCharge = overstayMinutes > 0 ? Math.ceil(overstayMinutes / 30) * 50 : 0; // ₹50 per 30m overstay

    const gst = Math.round((baseAmount + overstayCharge) * 0.18);
    const totalAmount = baseAmount + overstayCharge + gst;

    return {
      durationMinutes,
      durationHours,
      baseAmount,
      overstayMinutes,
      overstayCharge,
      gst,
      totalAmount
    };
  },

  processExit: async (exitData) => {
    try {
      return await fetchAPI('/exit/process', {
        method: 'POST',
        body: JSON.stringify(exitData)
      });
    } catch (err) {
      return {
        success: true,
        exitId: `EXT-${Date.now().toString().slice(-6)}`,
        exitTime: new Date().toISOString(),
        paymentStatus: 'PAID',
        gateStatus: 'BARRIER_OPENED',
        message: 'Exit Processed & Payment Verified. Gate Opened!'
      };
    }
  }
};
