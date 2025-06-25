
import React, { useState } from 'react';
import { Heart, MessageSquare, User, Edit, Trash2 } from 'lucide-react';
import CommentsSection from './CommentsSection';
import UserProfileModal from './UserProfileModal';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface PostCardProps {
  post: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked: boolean;
  };
  postComments: Comment[];
  onLike: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddComment: (postId: string, content: string) => void;
  isOwner?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  postComments, 
  onLike, 
  onEdit, 
  onDelete, 
  onAddComment,
  isOwner = false 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock user data for profile modal
  const mockUserData = {
    username: post.author,
    bio: "This is a sample bio for the user profile.",
    postsCount: Math.floor(Math.random() * 50) + 1,
    followersCount: Math.floor(Math.random() * 500) + 10,
    followingCount: Math.floor(Math.random() * 200) + 5,
  };

  const handleUsernameClick = () => {
    if (!isOwner) {
      setShowProfile(true);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 
                  className={`font-semibold text-gray-900 ${!isOwner ? 'cursor-pointer hover:text-blue-600' : ''}`}
                  onClick={handleUsernameClick}
                >
                  {post.author}
                </h3>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-gray-500 text-sm">{post.timestamp}</span>
              </div>
              
              {isOwner && showActions && (
                <div className="flex items-center space-x-2 opacity-0 animate-fade-in">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(post.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-800 mt-2 leading-relaxed">{post.content}</p>
            
            <div className="flex items-center space-x-6 mt-4">
              <button
                onClick={() => onLike(post.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${
                  post.isLiked
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-gray-600">
                <MessageSquare size={16} />
                <span className="text-sm font-medium">{postComments.length}</span>
              </div>
            </div>

            <CommentsSection
              postId={post.id}
              comments={postComments}
              onAddComment={onAddComment}
            />
          </div>
        </div>
      </div>

      <UserProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={mockUserData}
      />
    </>
  );
};

export default PostCard;
