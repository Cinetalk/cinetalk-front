import useDevice from "@/hooks/useDevice";

type Cetegory = "talk" | "movie";

interface DeviceLimitsProps<T> {
  category: Cetegory;
  data: T[];
}

const DEVICE_LIMITS: {
  [key in Exclude<Device, "">]: { [key in Cetegory]: number };
} = {
  mobile: { talk: 4, movie: 4 },
  tablet: { talk: 6, movie: 6 },
  laptop: { talk: 9, movie: 6 },
  desktop: { talk: 12, movie: 6 },
};

export default function useDeviceLimits<T>({
  category,
  data,
}: DeviceLimitsProps<T>): T[] {
  const { device } = useDevice();
  const limit = DEVICE_LIMITS[device as Exclude<Device, "">]?.[category];
  return data.slice(0, limit);
}
