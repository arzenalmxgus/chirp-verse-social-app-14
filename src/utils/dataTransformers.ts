
import { MongoUser, MongoPost, MongoComment } from '../types/mongodb';

// Transform MongoDB documents to your current app format
export const transformMongoUser = (mongoUser: MongoUser) => ({
  username: mongoUser.username,
  email: mongoUser.email,
  bio: mongoUser.bio,
  postsCount: mongoUser.postsCount,
  followersCount: mongoUser.followersCount,
  followingCount: mongoUser.followingCount,
});

export const transformMongoPost = (mongoPost: MongoPost, currentUserId?: string) => ({
  id: mongoPost._id,
  author: mongoPost.author,
  content: mongoPost.content,
  timestamp: formatTimestamp(mongoPost.createdAt),
  likes: mongoPost.likes,
  comments: mongoPost.commentsCount,
  isLiked: currentUserId ? mongoPost.isLiked : false, // You'll need to check if current user liked the post
});

export const transformMongoComment = (mongoComment: MongoComment) => ({
  id: mongoComment._id,
  author: mongoComment.author,
  content: mongoComment.content,
  timestamp: formatTimestamp(mongoComment.createdAt),
});

// Helper function to format timestamps
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

// Transform current app format to MongoDB format
export const transformToMongoPost = (content: string, author: string, authorId: string) => ({
  content,
  author,
  authorId,
});

export const transformToMongoComment = (postId: string, content: string, author: string, authorId: string) => ({
  postId,
  content,
  author,
  authorId,
});
