interface Bookmark {
  id: number;
  movie_id: number;
  poster_path: string;
}

interface BadgeCount {
  id: number;
  name: string;
  count: number;
}

interface EarnedBadge {
  genre_id: number;
  genre_name: string;
  badge_name: string;
  use: boolean;
}
