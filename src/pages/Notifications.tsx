
import React from 'react';
import { Heart, MessageSquare, User } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: 'Sarah Chen',
      content: 'liked your post',
      timestamp: '2h ago',
      unread: true
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike Rodriguez',
      content: 'commented on your post: "Great insight!"',
      timestamp: '4h ago',
      unread: true
    },
    {
      id: '3',
      type: 'follow',
      user: 'Alex Johnson',
      content: 'started following you',
      timestamp: '1d ago',
      unread: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="text-red-500" />;
      case 'comment':
        return <MessageSquare size={20} className="text-blue-500" />;
      case 'follow':
        return <User size={20} className="text-green-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                notification.unread ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{notification.user}</span>
                    <span className="text-gray-600">{notification.content}</span>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
