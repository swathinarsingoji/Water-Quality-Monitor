# Deployment Guide - Render & Vercel

## Overview
This guide covers deploying your Water Quality Monitor application to Render (backend) and Vercel (frontend).

---

## Backend Deployment on Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository connected
- PostgreSQL database

### Step 1: Create PostgreSQL Database on Render
1. Go to Render Dashboard → New → PostgreSQL
2. Choose a name (e.g., `water-quality-monitor-db`)
3. Copy the connection string (it will look like `postgresql://username:password@host:port/dbname`)
4. Save it safely (you'll need it in Step 3)

### Step 2: Deploy Backend Service
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `water-quality-backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Set Environment Variables
In Render dashboard, go to Environment Variables and add:

```
DATABASE_URL=postgresql://username:password@host:port/dbname
SECRET_KEY=your-very-secure-random-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

**Generate a secure SECRET_KEY:**
```bash
openssl rand -hex 32
```

### Step 4: Deploy
Click "Deploy" and wait for the deployment to complete. Your backend will be live at:
```
https://water-quality-backend.onrender.com
```

---

## Frontend Deployment on Vercel

### Step 1: Create Vercel Account
- Go to https://vercel.com
- Sign up and connect your GitHub

### Step 2: Import Your Repository
1. Click "Import Project"
2. Select your GitHub repository
3. Vercel will auto-detect it's a React/Vite app

### Step 3: Configure Project Settings
- **Framework**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
VITE_API_BASE_URL=https://water-quality-backend.onrender.com
```

(Replace with your Render backend URL)

### Step 5: Deploy
Click "Deploy" and wait for completion. Your frontend will be live at:
```
https://your-project-name.vercel.app
```

---

## Update CORS Origins

After deployment, update your backend's CORS settings in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Development
        "https://your-vercel-domain.vercel.app",  # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Testing the Deployment

1. **Test Backend API**: Visit `https://water-quality-backend.onrender.com/docs`
2. **Test Frontend**: Visit `https://your-project-name.vercel.app`
3. **Test Login**: Try logging in to ensure the frontend connects to the backend

---

## Troubleshooting

### Backend not starting
- Check Render logs for errors
- Ensure `pip install -r backend/requirements.txt` completes successfully
- Verify DATABASE_URL is correct

### Frontend not connecting to backend
- Check browser console for CORS errors
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check that Render backend URL is added to CORS origins

### Database connection issues
- Ensure PostgreSQL database is running on Render
- Double-check DATABASE_URL format
- Verify username and password are correct

---

## Environment Files Reference

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:8000  # For development
VITE_API_BASE_URL=https://backend-url.onrender.com  # For production
```

---

## Deployment Files Created

- `render.yaml` - Render configuration
- `frontend/vercel.json` - Vercel configuration
- `backend/.env.example` - Example environment variables
- `frontend/.env.local` - Frontend environment variables
- `frontend/src/config.js` - Centralized API configuration
