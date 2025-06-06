interface Talk {
  reviewList: ReviewList[];
  commentList: ReviewList[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

interface MyTalk {
  badgeList: string[];
  nickName: string;
  content: string;
  createTime: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  reviewId: number;
  star: number;
  spoiler: false;
}

interface ReviewList {
  id: number;
  nickName: string;
  profileImage: string;
  badgeList: [];
  star: number;
  content: string;
  createdAt: string;
  spoiler: boolean;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  likeCheck: boolean;
  dislikeCheck: boolean;
  mine: boolean;
  edited: boolean;
}
