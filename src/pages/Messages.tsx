
import React from 'react';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-gray-600 text-lg">
            Your messages will appear here. Start a conversation with other users!
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start Messaging
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
