
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mongoAPI } from '../services/mongodb-api';
import { MongoUser, MongoPost, MongoComment, CreatePostData, CreateCommentData } from '../types/mongodb';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => mongoAPI.getUser(userId),
    enabled: !!userId,
  });
};

export const usePosts = (limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ['posts', limit, offset],
    queryFn: () => mongoAPI.getPosts(limit, offset),
  });
};

export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => mongoAPI.getUserPosts(userId),
    enabled: !!userId,
  });
};

export const usePostComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => mongoAPI.getPostComments(postId),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePostData) => mongoAPI.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => 
      mongoAPI.updatePost(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => mongoAPI.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, userId, isLiked }: { postId: string; userId: string; isLiked: boolean }) => 
      isLiked ? mongoAPI.unlikePost(postId, userId) : mongoAPI.likePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCommentData) => mongoAPI.createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: { username: string; bio: string } }) => 
      mongoAPI.updateUser(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};
