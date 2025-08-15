export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[]; // Rocket IDs
  timezone: string;
  launches: string[]; // Launch IDs
  status: "active" | "inactive" | "retired" | "under construction";
  details: string;
  images: {
    large: string[];
  };
}
