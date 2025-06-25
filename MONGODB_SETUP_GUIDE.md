
# MongoDB Integration Setup Guide

## Prerequisites
1. MongoDB Atlas account (free tier available)
2. Node.js backend server (Express.js recommended)
3. Environment variables configured

## Step 1: MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string

## Step 2: Backend Setup
1. Create a new Node.js project
2. Install dependencies: `npm install express mongoose cors dotenv`
3. Copy the backend code from `src/backend-reference/mongodb-backend-example.js`
4. Create `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   PORT=5000
   ```
5. Run your backend: `node server.js`

## Step 3: Frontend Configuration
1. Add environment variable to your React app:
   ```
   REACT_APP_MONGODB_API_URL=http://localhost:5000/api
   ```
   (For production, use your deployed backend URL)

## Step 4: Deploy Backend
Deploy your backend to services like:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform
- AWS EC2

## Step 5: Update Frontend Environment
Update your production environment variable:
```
REACT_APP_MONGODB_API_URL=https://your-backend-domain.com/api
```

## Usage in Components
The MongoDB integration is ready to use with the provided hooks:

```typescript
import { usePosts, useCreatePost } from './hooks/useMongoData';

const MyComponent = () => {
  const { data: posts, isLoading } = usePosts();
  const createPost = useCreatePost();

  // Use the data and mutations as needed
};
```

## File Structure
```
src/
├── types/mongodb.ts           # MongoDB type definitions
├── services/mongodb-api.ts    # API service layer
├── hooks/useMongoData.ts      # React hooks for data operations
├── utils/dataTransformers.ts  # Data transformation utilities
├── config/environment.ts      # Environment configuration
└── backend-reference/         # Backend code reference
```

## Current App Integration
Your existing components will work with minimal changes since the hooks provide the same data structure. The main changes needed are:
1. Replace local state with MongoDB hooks
2. Update component props to use MongoDB IDs
3. Handle loading and error states

## Next Steps
1. Set up your backend server
2. Configure environment variables
3. Test API endpoints
4. Update your components to use the new hooks
5. Deploy both frontend and backend
```
