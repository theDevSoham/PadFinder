export interface Launch {
  fairings?: {
    reused: boolean | null;
    recovery_attempt: boolean | null;
    recovered: boolean | null;
    ships: string[];
  } | null;

  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };

  static_fire_date_utc?: string | null;
  static_fire_date_unix?: number | null;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean | null;

  failures: Array<{
    time: number | null;
    altitude: number | null;
    reason: string | null;
  }>;

  details?: string | null;

  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];

  launchpad: string;
  flight_number: number;
  name: string;

  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "year" | "half" | "quarter" | "month" | "day" | "hour";

  upcoming: boolean;

  cores: Array<{
    core: string | null;
    flight: number | null;
    gridfins: boolean | null;
    legs: boolean | null;
    reused: boolean | null;
    landing_attempt: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }>;

  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

// SpaceX Query request shape
export interface LaunchQueryRequest {
  query: Record<string, any>;
  options?: {
    select?: Record<string, number> | string;
    sort?: Record<string, 1 | -1> | string;
    offset?: number;
    page?: number;
    limit?: number;
    pagination?: boolean;
    populate?: Array<Record<string, any>> | Record<string, any> | string;
  };
}

// SpaceX Query response shape
export interface LaunchQueryResponse<T = Launch> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
