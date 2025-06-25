
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import EditPostModal from '../components/EditPostModal';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

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

  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({
    '1': [
      { id: '1-1', author: 'Jane Doe', content: 'Congratulations! 🎉', timestamp: '1h ago' },
      { id: '1-2', author: 'Tom Wilson', content: 'Looking forward to seeing it!', timestamp: '30m ago' }
    ],
    '2': [
      { id: '2-1', author: 'Emma Davis', content: 'Absolutely gorgeous! 😍', timestamp: '3h ago' }
    ]
  });

  const [editingPost, setEditingPost] = useState<{ id: string; content: string } | null>(null);

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
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost({ id: post.id, content: post.content });
    }
  };

  const handleSaveEdit = (postId: string, newContent: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, content: newContent }
        : post
    ));
    setEditingPost(null);
  };

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      // Also remove comments for this post
      setComments(prev => {
        const newComments = { ...prev };
        delete newComments[postId];
        return newComments;
      });
    }
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `${postId}-${Date.now()}`,
      author: 'You',
      content,
      timestamp: 'now'
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    // Update post comment count
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
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
              postComments={comments[post.id] || []}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddComment={handleAddComment}
              isOwner={post.author === 'You'}
            />
          ))}
        </div>
      </div>

      {editingPost && (
        <EditPostModal
          isOpen={true}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Feed;
