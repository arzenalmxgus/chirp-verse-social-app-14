
import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Full-stack developer passionate about creating beautiful user experiences. Coffee enthusiast ☕',
    postsCount: 42,
    followersCount: 128,
    followingCount: 89
  });

  const [userPosts] = useState([
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

  const handleUpdateProfile = (data: { username: string; bio: string }) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
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
                onLike={handleLike}
                isOwner={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
