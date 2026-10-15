export const calculateParkingFee = (startTime, endTime, hourlyRate = 30) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = Math.max(end - start, 0);
  const hours = Math.max(Math.ceil(durationMs / (1000 * 60 * 60)), 1);
  return {
    hours,
    ratePerHour: hourlyRate,
    totalFee: hours * hourlyRate,
  };
};
