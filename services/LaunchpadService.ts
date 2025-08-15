// services/LaunchpadService.ts
import axios from "axios";
import constants from "./constants";
import { Launchpad } from "@/types/LaunchpadServiceTypes";

const API_BASE = constants.baseUrl + "/v4/launchpads";

export default class LaunchpadService {
  /**
   * Get all launchpads
   */
  static async getAll(): Promise<Launchpad[]> {
    const { data } = await axios.get<Launchpad[]>(API_BASE);
    return data;
  }

  /**
   * Get one launchpad by ID
   * @param id Launchpad ID
   */
  static async getOne(id: string): Promise<Launchpad> {
    const { data } = await axios.get<Launchpad>(`${API_BASE}/${id}`);
    return data;
  }
}
