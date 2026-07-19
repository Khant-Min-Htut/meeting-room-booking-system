# Deployment Instructions

This guide will help you deploy the Meeting Room Booking System to free hosting services.

## Overview

- **Frontend**: Vercel (React/Vite)
- **Backend**: Railway (Node.js/Express) - More reliable than Render
- **Database**: Railway PostgreSQL (free tier)

## Prerequisites

1. GitHub account
2. Vercel account (free)
3. Railway account (free)
4. Your code pushed to a GitHub repository

## Step 1: Prepare Your Code for Deployment

### 1.1 Initialize Git Repository

```bash
cd meeting-room-booking-system
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository

1. Go to GitHub.com
2. Create a new repository (name it `meeting-room-booking-system`)
3. Follow the instructions to push your local repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/meeting-room-booking-system.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up for a free account
3. Connect your GitHub account

### 2.2 Create New Project

1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will automatically detect the backend

### 2.3 Configure Backend Service

1. Click on your backend service
2. Go to "Settings" tab
3. Set Root Directory: `backend`
4. Build Command: `npm install && npx prisma generate && npm run build`
5. Start Command: `npm start`

### 2.4 Add PostgreSQL Database

1. In your Railway project, click "New Service"
2. Select "Database"
3. Choose "PostgreSQL"
4. Click "Add PostgreSQL"
5. Railway will automatically add it to your project

### 2.5 Set Environment Variables

1. Go to your backend service
2. Click "Variables" tab
3. Add the following variables:

- `DATABASE_URL`: Railway will automatically set this (click "Generate Prisma URL" from the database service)
- `JWT_SECRET`: (generate a random string, e.g., `your-secret-key-here`)
- `JWT_EXPIRES_IN`: `7d`
- `PORT`: `5000`
- `NODE_ENV`: `production`
- `FRONTEND_URL`: (leave empty for now, will add after frontend deployment)

### 2.6 Run Database Migrations

1. In Railway dashboard, go to your backend service
2. Click "Deployments" tab
3. Click "New Deployment"
4. Add this as a build script (or run in console):

```bash
npx prisma migrate deploy
```

### 2.7 Get Backend URL

1. After deployment completes, click on your backend service
2. Copy the "Public URL" (e.g., `https://your-backend.railway.app`)

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up for a free account
3. Connect your GitHub account

### 3.2 Deploy Frontend

1. In Vercel dashboard, click "Add New Project"
2. Select your GitHub repository
3. Configure:

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Environment Variables:**

- `VITE_API_URL`: (paste your backend URL from step 2.7, e.g., `https://your-backend.railway.app`)

4. Click "Deploy"
5. Wait for deployment to complete
6. **Copy the frontend URL** (e.g., `https://your-app.vercel.app`)

### 3.3 Update Backend CORS

1. Go back to your Railway backend service
2. Go to "Variables" tab
3. Add/Update environment variable:
   - `FRONTEND_URL`: (paste your Vercel frontend URL)
4. The backend will automatically redeploy

## Step 4: Seed Initial Data (Optional)

To create default users for testing:

1. In Railway dashboard, go to your backend service
2. Click "Console" tab
3. Run:

```bash
npm run seed
```

This will create:

- Admin user: `admin@example.com` / `admin123`
- Regular user: `user@example.com` / `user123`

## Step 5: Access Your Deployed Application

1. Open your Vercel frontend URL in a browser
2. You should see the login page
3. Login with the seeded credentials

## Environment Variables Reference

### Backend (Railway)

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)

```
VITE_API_URL=https://your-backend.railway.app
```

## Troubleshooting

### Backend won't start

- Check Railway logs for errors
- Ensure DATABASE_URL is correct (Railway auto-generates this)
- Verify migrations ran successfully
- Check that the root directory is set to `backend`

### Frontend can't connect to backend

- Verify VITE_API_URL is correct
- Check backend CORS settings
- Ensure backend is running on Railway

### Database connection issues

- Verify DATABASE_URL format
- Check database is active in Railway
- Ensure migrations ran
- Use Railway's "Generate Prisma URL" feature

## Cost

- **Vercel**: Free tier (sufficient for this project)
- **Railway**: Free tier (includes PostgreSQL)
- **Total**: $0/month

## Updating Your Application

After making changes:

1. Commit and push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

2. Vercel and Render will automatically detect changes and redeploy

## Support

If you encounter issues:

- Check Render logs: Dashboard → Your Service → Logs
- Check Vercel logs: Dashboard → Your Project → Deployments
- Review environment variables
- Ensure all dependencies are in package.json
