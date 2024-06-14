import { axiosClient } from "./axiosClient";
import { Measurement, MeasurementResponse } from "./const";

export interface DeformationControlMeasurement extends Measurement {
  index: string | number;
  criticalDelta: number;
  data: {
    value: number;
    isValid: boolean;
    delta: number;
  };
}

export type DeformationControlResponse = MeasurementResponse<DeformationControlMeasurement>;

export const getDeformationControlMeasurements = (): Promise<DeformationControlResponse> => {
  return axiosClient.get("/deformation_response.json").then((response) => {
    return response.data;
  });
};

interface DeformationControlTrendResponse {
  data: DeformationControlTrendData;
  succeeded: boolean;
  errors: unknown[];
}

type Delta = number;
type Date = string;
type Points = Record<Date, Delta>;

export interface DeformationControlTrendData {
  objectId: string;
  points: Points;
  startDate: Date;
  endDate: Date;
  criticalEndDate: Date;
}

export const getDeformationControlTrend = (): Promise<DeformationControlTrendResponse> => {
  return axiosClient.get("/deformation_trend_response.json").then((response) => {
    return response.data;
  });
};
