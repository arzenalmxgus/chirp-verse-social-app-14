
export interface MongoUser {
  _id: string;
  username: string;
  email: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MongoPost {
  _id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MongoComment {
  _id: string;
  postId: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  content: string;
  author: string;
  authorId: string;
}

export interface CreateCommentData {
  postId: string;
  content: string;
  author: string;
  authorId: string;
}

export interface UpdateUserData {
  username?: string;
  bio?: string;
}
