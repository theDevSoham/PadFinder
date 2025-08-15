// services/LaunchService.ts

import axios from "axios";
import constants from "./constants";
import {
  Launch,
  LaunchQueryRequest,
  LaunchQueryResponse,
} from "@/types/LaunchServiceTypes";

const api = axios.create({
  baseURL: constants.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const LaunchService = {
  // Get all launches
  getAllLaunches: async (): Promise<Launch[]> => {
    const res = await api.get<Launch[]>("/v5/launches");
    return res.data;
  },

  // Get one launch by ID
  getLaunchById: async (id: string): Promise<Launch> => {
    const res = await api.get<Launch>(`/v5/launches/${id}`);
    return res.data;
  },

  /**
   * Query launches with pagination, filtering, sorting
   * @template T The shape of the launch document based on selected fields
   */
  queryLaunches: async <T extends Partial<Launch> = Launch>(
    payload: LaunchQueryRequest
  ): Promise<LaunchQueryResponse<T>> => {
    const res = await api.post<LaunchQueryResponse<T>>(
      "/v5/launches/query",
      payload
    );
    return res.data;
  },

  // Get past launches
  getPastLaunches: async (): Promise<Launch[]> => {
    const res = await api.get<Launch[]>("/v5/launches/past");
    return res.data;
  },

  // Get upcoming launches
  getUpcomingLaunches: async (): Promise<Launch[]> => {
    const res = await api.get<Launch[]>("/v5/launches/upcoming");
    return res.data;
  },

  // Get latest launch
  getLatestLaunch: async (): Promise<Launch> => {
    const res = await api.get<Launch>("/v5/launches/latest");
    return res.data;
  },

  // Get next launch
  getNextLaunch: async (): Promise<Launch> => {
    const res = await api.get<Launch>("/v5/launches/next");
    return res.data;
  },
};

export default LaunchService;
