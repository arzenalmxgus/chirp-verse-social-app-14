
import { MongoUser, MongoPost, MongoComment, CreatePostData, CreateCommentData, UpdateUserData } from '../types/mongodb';

// Replace with your actual MongoDB backend URL
const API_BASE_URL = process.env.REACT_APP_MONGODB_API_URL || 'http://localhost:5000/api';

class MongoDBAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // User operations
  async getUser(userId: string): Promise<MongoUser> {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId: string, data: UpdateUserData): Promise<MongoUser> {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserByUsername(username: string): Promise<MongoUser> {
    return this.request(`/users/username/${username}`);
  }

  // Post operations
  async getPosts(limit = 10, offset = 0): Promise<MongoPost[]> {
    return this.request(`/posts?limit=${limit}&offset=${offset}`);
  }

  async getUserPosts(userId: string): Promise<MongoPost[]> {
    return this.request(`/posts/user/${userId}`);
  }

  async createPost(data: CreatePostData): Promise<MongoPost> {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(postId: string, content: string): Promise<MongoPost> {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deletePost(postId: string): Promise<void> {
    return this.request(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async likePost(postId: string, userId: string): Promise<MongoPost> {
    return this.request(`/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async unlikePost(postId: string, userId: string): Promise<MongoPost> {
    return this.request(`/posts/${postId}/unlike`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Comment operations
  async getPostComments(postId: string): Promise<MongoComment[]> {
    return this.request(`/posts/${postId}/comments`);
  }

  async createComment(data: CreateCommentData): Promise<MongoComment> {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteComment(commentId: string): Promise<void> {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}

export const mongoAPI = new MongoDBAPI();
