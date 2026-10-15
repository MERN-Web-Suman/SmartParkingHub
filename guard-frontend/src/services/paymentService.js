import { fetchAPI } from './api';

const MOCK_PAYMENTS = [
  {
    transactionId: 'TXN-90112',
    ticketId: 'TCK-409100',
    vehicleNumber: 'MH 12 AB 4321',
    amount: 140,
    paymentMode: 'UPI / QR',
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    guardId: 'GRD-9042'
  },
  {
    transactionId: 'TXN-90113',
    ticketId: 'TCK-409104',
    vehicleNumber: 'KA 03 MX 9090',
    amount: 80,
    paymentMode: 'Cash',
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - 50 * 60000).toISOString(),
    guardId: 'GRD-9042'
  },
  {
    transactionId: 'TXN-90114',
    ticketId: 'TCK-409108',
    vehicleNumber: 'DL 01 X 8877',
    amount: 200,
    paymentMode: 'Card',
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - 110 * 60000).toISOString(),
    guardId: 'GRD-9042'
  }
];

export const paymentService = {
  getRecentPayments: async () => {
    try {
      return await fetchAPI('/billing/payments');
    } catch (err) {
      return { success: true, payments: MOCK_PAYMENTS };
    }
  },

  verifyPayment: async (transactionId) => {
    try {
      return await fetchAPI(`/billing/verify/${transactionId}`);
    } catch (err) {
      const txn = MOCK_PAYMENTS.find((p) => p.transactionId === transactionId) || MOCK_PAYMENTS[0];
      return { success: true, payment: txn };
    }
  },

  collectCashPayment: async (paymentData) => {
    try {
      return await fetchAPI('/billing/collect-cash', {
        method: 'POST',
        body: JSON.stringify(paymentData)
      });
    } catch (err) {
      return {
        success: true,
        transactionId: `TXN-CASH-${Math.floor(10000 + Math.random() * 90000)}`,
        amount: paymentData.amount,
        status: 'SUCCESS',
        receivedBy: 'Rajesh Sharma',
        timestamp: new Date().toISOString()
      };
    }
  }
};
