interface ReviewResult {
  reviewDTO: {
    id: number;
    movieId: number;
    movienm: string;
    user: null;
    star: number;
    content: string;
    spoiler: boolean;
    parentReview: null;
    createdAt: string;
  };
  userDTO: MyInfo;
}

interface MovieResult {
  id: number;
  title: string;
  poster_path: string;
}
