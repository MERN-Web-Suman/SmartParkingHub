export const formatDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (dateInput) => {
  if (!dateInput) return 'N/A';
  return `${formatDate(dateInput)} • ${formatTime(dateInput)}`;
};

export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '0 mins';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} mins`;
  return `${hrs}h ${mins}m`;
};
