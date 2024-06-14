import { axiosClient } from "./axiosClient";
import { Measurement, MeasurementResponse } from "./const";

export interface ThermistorChainMeasurement extends Measurement {
  criticalTemperature: number;
  minDepth: number;
  maxDepth: number;
  averageTemperature: number;
  data: Record<
    string,
    {
      value: number;
      isValid: boolean;
    }
  >;
}

export type ThermistorChainResponse = MeasurementResponse<ThermistorChainMeasurement>;

export const getThermistorChainMeasurements = (): Promise<ThermistorChainResponse> => {
  return axiosClient.get("/termo_response.json").then((response) => {
    return response.data;
  });
};

interface ThermistorChainTrendResponse {
  data: ThermistorChainTrendData;
  succeeded: boolean;
  errors: unknown[];
}

type Temperature = number;
type Date = string;
type Points = Record<Date, Temperature>;

export interface ThermistorChainTrendData {
  objectId: string;
  points: Points;
  startDate: Date;
  endDate: Date;
  criticalEndDate: Date;
}

export const getThermistorChainTrendData = (): Promise<ThermistorChainTrendResponse> => {
  return axiosClient.get("/termo_trend_response.json").then((response) => {
    return response.data;
  });
};
