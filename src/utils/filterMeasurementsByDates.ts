import { Measurement } from "../api/const";

export function filterMeasurementsByDates<T extends Measurement>(
  measurements: T[],
  selectedDates: [string, string] | null
): T[] {
  if (!selectedDates) return measurements;

  const [startDate, endDate] = selectedDates;

  return measurements.filter(
    (measurement) =>
      new Date(measurement.time).getTime() >= new Date(startDate).getTime() &&
      new Date(measurement.time).getTime() <= new Date(endDate).getTime()
  );
}
