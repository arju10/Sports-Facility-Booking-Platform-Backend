export const calculatePayableAmount = (
  startTime: Date,
  endTime: Date,
  pricePerHour: number,
): number => {
  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  return durationInHours * pricePerHour;
};
