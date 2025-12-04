# Deploying to Render.com

This guide will help you deploy the Legal Advisory Platform to Render.com for free.

## Prerequisites

1. A [Render.com](https://render.com) account (free)
2. Your GitHub repository connected to Render

## Deployment Steps

### Option 1: Using Render Blueprint (Recommended - One Click)

1. **Fork/Push this repository to GitHub** (if not already done)

2. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com

3. **Create New Blueprint**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply" to create all services

4. **Wait for Deployment**
   - Database will be created first
   - Backend will build and deploy (takes 5-10 minutes)
   - Frontend will build and deploy (takes 3-5 minutes)

5. **Access Your App**
   - Frontend URL: `https://legal-advisory-frontend.onrender.com`
   - Backend URL: `https://legal-advisory-backend.onrender.com`

### Option 2: Manual Deployment

#### Step 1: Create PostgreSQL Database

1. In Render Dashboard, click "New" → "PostgreSQL"
2. Name: `legal-advisory-db`
3. Database: `legal_advisory_db`
4. User: `legal_user`
5. Region: Choose closest to you
6. Plan: **Free**
7. Click "Create Database"
8. **Copy the Internal Database URL** (you'll need this)

#### Step 2: Deploy Backend

1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `legal-advisory-backend`
   - **Region:** Same as database
   - **Branch:** `master` (or `main`)
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `chmod +x build.sh && ./build.sh`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free

4. **Add Environment Variables:**
   - `DATABASE_URL`: Paste the Internal Database URL from Step 1
   - `CORS_ORIGINS`: `*`
   - `ENVIRONMENT`: `production`
   - `PYTHON_VERSION`: `3.11.0`

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. **Copy your backend URL** (e.g., `https://legal-advisory-backend.onrender.com`)

#### Step 3: Deploy Frontend

1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `legal-advisory-frontend`
   - **Region:** Same as backend
   - **Branch:** `master` (or `main`)
   - **Root Directory:** `frontend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: Paste your backend URL from Step 2
   - `NODE_VERSION`: `18.17.0`

5. Click "Create Web Service"
6. Wait for deployment (3-5 minutes)

## Important Notes

### Free Tier Limitations

- **Spin Down:** Services spin down after 15 minutes of inactivity
- **Wake Up Time:** ~30 seconds to wake up on first request
- **Database:** 90 days of inactivity before deletion
- **Build Time:** Limited to 10 minutes per build

### Keeping Your App Alive (Optional)

If you want to prevent spin-down, you can:
1. Use a service like [UptimeRobot](https://uptimerobot.com) (free) to ping your app every 14 minutes
2. Upgrade to Render's paid plan ($7/month per service)

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure `build.sh` has execute permissions
- Verify all dependencies are in `requirements.txt`

### Database Connection Errors
- Verify `DATABASE_URL` environment variable is set correctly
- Check that the database is in the same region as the backend
- Ensure the Internal Database URL is used (not External)

### Frontend Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is set to your backend URL
- Check CORS settings in backend
- Ensure backend is deployed and running

## Updating Your App

Render automatically redeploys when you push to your GitHub repository:

```bash
git add .
git commit -m "Update application"
git push origin master
```

## Monitoring

- **Logs:** Available in Render dashboard for each service
- **Metrics:** CPU, Memory, and Request metrics in dashboard
- **Alerts:** Configure email alerts for deployment failures

## Support

If you encounter issues:
1. Check Render's [documentation](https://render.com/docs)
2. Review deployment logs in the dashboard
3. Check the [Render community forum](https://community.render.com)
