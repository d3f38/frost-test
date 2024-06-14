export const FROST_API = "/";

export interface Measurement {
  key: React.Key;
  time: string;
  objectId: string;
  status: boolean;
  state: "Good" | "Danger";
  sensorType: "DeformationControl" | "ThermistorChain";
}

export interface MeasurementResponse<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
  succeeded: boolean;
  errors: [];
}
