import dayjs from "dayjs";

export const formatLaunchDate = (
  dateUtc: string,
  precision: "quarter" | "half" | "year" | "month" | "day" | "hour"
) => {
  const d = dayjs(dateUtc);

  switch (precision) {
    case "year":
      return d.format("YYYY");

    case "half":
      return `${d.format("YYYY")} (H${d.month() < 6 ? "1" : "2"})`;
    // first half / second half of year

    case "quarter":
      return `${d.format("[Q]Q YYYY")}`;

    case "month":
      return d.format("MMMM YYYY");

    case "day":
      return d.format("Do MMMM YYYY");

    case "hour":
      return d.format("Do MMMM YYYY [at] h:mm a");

    default:
      return d.format("Do MMMM YYYY [at] h:mm a"); // fallback
  }
};
