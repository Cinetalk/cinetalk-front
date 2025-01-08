type PosterSizes =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

interface BreakPoint {
  minWidth: number;
  imageSize: number;
}

export const getTmdbPosterUrl = (size: PosterSizes, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export function getRandomProfileImage() {
  const profileImages = [
    "/images/detail/profile_blue.png",
    "/images/detail/profile_green.png",
    "/images/detail/profile_orange.png",
    "/images/detail/profile_red.png",
    "/images/detail/profile_violet.png",
  ];

  const randomIndex = Math.floor(Math.random() * profileImages.length);
  return profileImages[randomIndex];
}

export const getImageSizes = ({
  mobile,
  tablet,
  laptop,
  desktop,
}: {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
}) => {
  const breakPoints: BreakPoint[] = [
    { minWidth: 768, imageSize: tablet },
    { minWidth: 1280, imageSize: laptop },
    { minWidth: 1920, imageSize: desktop },
  ];

  const mediaQueries = breakPoints
    .map((point) => `(min-width: ${point.minWidth}px) ${point.imageSize}px`)
    .join(", ");

  return `${mediaQueries}, ${mobile}px`;
};
