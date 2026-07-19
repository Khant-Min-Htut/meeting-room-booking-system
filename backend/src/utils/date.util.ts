export const isOverlapping = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean => {
  return start1 < end2 && end1 > start2;
};

export const isValidBookingTime = (startTime: Date, endTime: Date): boolean => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (start < now) return false;
  if (end <= start) return false;
  
  return true;
};
