# Deployment Instructions

This guide will help you deploy the Meeting Room Booking System to free hosting services.

## Overview

- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: Render PostgreSQL (free tier)

## Prerequisites

1. GitHub account
2. Vercel account (free)
3. Render account (free)
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

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up for a free account
3. Connect your GitHub account

### 2.2 Create PostgreSQL Database

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Name: `meeting-room-db`
4. Select free tier
5. Click "Create Database"
6. **Important**: Copy the "Internal Database URL" - you'll need this later
   postgresql://meeting_room_db_s6hs_user:salsmp7CFjuleUHhyjGN3B0jVnNyrNUG@dpg-d9e6pebrjlhs73br4q5g-a/meeting_room_db_s6hs

### 2.3 Deploy Backend

1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:

**Build & Deploy:**

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

**Environment Variables:**

- `DATABASE_URL`: (paste the Internal Database URL from step 2.2)
- `JWT_SECRET`: (generate a random string, e.g., `your-secret-key-here`)
- `JWT_EXPIRES_IN`: `7d`
- `PORT`: `5000`
- `NODE_ENV`: `production`
- `FRONTEND_URL`: (leave empty for now, will add after frontend deployment)

5. Click "Create Web Service"
6. Wait for deployment to complete
7. **Copy the backend URL** (e.g., `https://your-backend.onrender.com`)

### 2.4 Run Database Migrations

1. In your Render dashboard, go to your backend service
2. Click "Shell" (or use the Render CLI)
3. Run:

```bash
npx prisma migrate deploy
```

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

- `VITE_API_URL`: (paste your backend URL from step 2.3, e.g., `https://your-backend.onrender.com`)

4. Click "Deploy"
5. Wait for deployment to complete
6. **Copy the frontend URL** (e.g., `https://your-app.vercel.app`)

### 3.3 Update Backend CORS

1. Go back to your Render backend service
2. Add/Update environment variable:
   - `FRONTEND_URL`: (paste your Vercel frontend URL)
3. The backend will automatically redeploy

## Step 4: Seed Initial Data (Optional)

To create default users for testing:

1. In Render dashboard, go to your backend service
2. Click "Shell"
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

### Backend (Render)

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
VITE_API_URL=https://your-backend.onrender.com
```

## Troubleshooting

### Backend won't start

- Check Render logs for errors
- Ensure DATABASE_URL is correct
- Verify migrations ran successfully

### Frontend can't connect to backend

- Verify VITE_API_URL is correct
- Check backend CORS settings
- Ensure backend is running

### Database connection issues

- Verify DATABASE_URL format
- Check database is active in Render
- Ensure migrations ran

## Cost

- **Vercel**: Free tier (sufficient for this project)
- **Render**: Free tier (includes PostgreSQL)
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
