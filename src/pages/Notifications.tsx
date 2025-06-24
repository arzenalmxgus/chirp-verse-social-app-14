
import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>
          <p className="text-gray-600 text-lg">
            Stay updated with likes, comments, and new followers. Your notifications will appear here!
          </p>
          <div className="mt-8 space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-center">No notifications yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
