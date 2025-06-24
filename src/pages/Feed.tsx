
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Alex Johnson',
      content: 'Just launched my new project! Excited to share it with the world. Building in public has been such an amazing journey. 🚀',
      timestamp: '2h ago',
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: '2',
      author: 'Sarah Chen',
      content: 'Beautiful sunset today! Sometimes you need to pause and appreciate the simple things in life. Nature never fails to inspire. ✨',
      timestamp: '4h ago',
      likes: 28,
      comments: 7,
      isLiked: true
    },
    {
      id: '3',
      author: 'Mike Rodriguez',
      content: 'Working on some exciting features for our app. The intersection of design and technology continues to fascinate me every day.',
      timestamp: '6h ago',
      likes: 15,
      comments: 2,
      isLiked: false
    }
  ]);

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: Date.now().toString(),
      author: 'You',
      content,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleEdit = (postId: string) => {
    console.log('Edit post:', postId);
    // This would open an edit modal in a real app
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreatePost onCreatePost={handleCreatePost} />
        
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isOwner={post.author === 'You'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
