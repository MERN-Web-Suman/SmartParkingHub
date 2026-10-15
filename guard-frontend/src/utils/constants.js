export const VEHICLE_TYPES = {
  CAR: 'Car',
  BIKE: 'Bike',
  EV: 'EV Car',
  TRUCK: 'Heavy Vehicle'
};

export const SLOT_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance'
};

export const PAYMENT_MODES = {
  CASH: 'Cash',
  UPI: 'UPI / QR',
  CARD: 'Card',
  WALLET: 'ParkSmart Wallet'
};

export const GATE_INFO = {
  gateId: 'GATE-NORTH-01',
  gateName: 'North Gate Tower A',
  location: 'Tech Park Central Plaza',
  shift: 'Morning (08:00 AM - 04:00 PM)'
};

export const DEFAULT_GUARD = {
  id: 'GRD-9042',
  name: 'Rajesh Sharma',
  role: 'Senior Security Officer',
  gate: 'GATE-NORTH-01',
  shift: 'Shift A (Day)',
  phone: '+91 98765 43210',
  badgeNumber: 'SEC-88219',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};
