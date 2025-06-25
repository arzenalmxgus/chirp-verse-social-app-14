
import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import PostCard from '../components/PostCard';
import EditPostModal from '../components/EditPostModal';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const Profile = () => {
  const [user, setUser] = useState({
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Full-stack developer passionate about creating beautiful user experiences. Coffee enthusiast ☕',
    postsCount: 42,
    followersCount: 128,
    followingCount: 89
  });

  const [userPosts, setUserPosts] = useState([
    {
      id: '1',
      author: 'johndoe',
      content: 'Just finished redesigning my portfolio website. Clean, modern, and fully responsive. Sometimes the best designs are the simplest ones.',
      timestamp: '1d ago',
      likes: 25,
      comments: 8,
      isLiked: false
    },
    {
      id: '2',
      author: 'johndoe',
      content: 'Learning about new web technologies every day. The pace of innovation in frontend development never ceases to amaze me.',
      timestamp: '3d ago',
      likes: 18,
      comments: 4,
      isLiked: true
    }
  ]);

  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({
    '1': [
      { id: '1-1', author: 'Designer Pro', content: 'Love the clean aesthetic!', timestamp: '1d ago' },
      { id: '1-2', author: 'Dev Master', content: 'Great work on the responsiveness', timestamp: '1d ago' }
    ],
    '2': [
      { id: '2-1', author: 'Tech Guru', content: 'Keep learning!', timestamp: '2d ago' }
    ]
  });

  const [editingPost, setEditingPost] = useState<{ id: string; content: string } | null>(null);

  const handleUpdateProfile = (data: { username: string; bio: string }) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleLike = (postId: string) => {
    setUserPosts(prev => prev.map(post => 
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
    const post = userPosts.find(p => p.id === postId);
    if (post) {
      setEditingPost({ id: post.id, content: post.content });
    }
  };

  const handleSaveEdit = (postId: string, newContent: string) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, content: newContent }
        : post
    ));
    setEditingPost(null);
  };

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setUserPosts(prev => prev.filter(post => post.id !== postId));
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

    setUserPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserProfile user={user} onUpdateProfile={handleUpdateProfile} />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Posts</h2>
          <div className="space-y-6">
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                postComments={comments[post.id] || []}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddComment={handleAddComment}
                isOwner={true}
              />
            ))}
          </div>
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

export default Profile;
