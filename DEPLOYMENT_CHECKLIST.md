# Pre-Deployment Checklist

## Backend Configuration
- [x] `render.yaml` created with correct build and start commands
- [x] `backend/.env.example` created
- [x] `security.py` updated to use environment variables
- [x] `backend/requirements.txt` includes all dependencies
- [x] Database configuration uses `DATABASE_URL` environment variable
- [x] CORS middleware configured for development and production

## Frontend Configuration
- [x] `frontend/vercel.json` created
- [x] `frontend/src/config.js` created for centralized API configuration
- [x] `frontend/.env.local` created for development
- [x] All hardcoded URLs replaced with `API_BASE_URL` from config
- [x] Components using centralized API configuration:
  - [x] Login.jsx
  - [x] Dashboard.jsx
  - [x] CreateNgoProject.jsx
  - [x] NgoProjects.jsx
  - [x] StationForm.jsx
  - [x] StationReadings.jsx
  - [x] StationMap.jsx
  - [x] CreateReport.jsx
  - [x] SubmitReport.jsx
  - [x] ViewReports.jsx
  - [x] Alerts.jsx

## Code Quality
- [x] No hardcoded localhost URLs remaining
- [x] Environment variables properly used
- [x] JWT token configuration uses environment variables
- [x] Password hashing configured correctly

## Deployment Steps for User
- [ ] Create PostgreSQL database on Render
- [ ] Create backend service on Render
- [ ] Set environment variables on Render:
  - [ ] DATABASE_URL
  - [ ] SECRET_KEY (generate with: openssl rand -hex 32)
  - [ ] ALGORITHM=HS256
  - [ ] ACCESS_TOKEN_EXPIRE_MINUTES=60
- [ ] Deploy backend service on Render
- [ ] Note your Render backend URL
- [ ] Create project on Vercel
- [ ] Set environment variable on Vercel:
  - [ ] VITE_API_BASE_URL={YOUR_RENDER_URL}
- [ ] Deploy frontend on Vercel
- [ ] Update CORS origins in backend/main.py with Vercel URL
- [ ] Test backend at {RENDER_URL}/docs
- [ ] Test frontend at {VERCEL_URL}
- [ ] Test login flow end-to-end

## Files Modified for Deployment
1. `render.yaml` - Backend deployment config
2. `frontend/vercel.json` - Frontend deployment config
3. `backend/security.py` - Environment variables for JWT
4. `backend/main.py` - CORS configuration
5. `backend/.env.example` - Example env file
6. `frontend/.env.local` - Frontend env for development
7. `frontend/src/config.js` - Centralized API config (NEW)
8. All frontend components - Using centralized API config
9. `README.md` - Updated with deployment info
10. `DEPLOYMENT.md` - Complete deployment guide (NEW)

## Potential Issues Fixed
1. ✅ Fixed: `render.yaml` had wrong build command path
2. ✅ Fixed: `render.yaml` had wrong start command path
3. ✅ Fixed: Backend security.py had hardcoded SECRET_KEY
4. ✅ Fixed: All frontend components had hardcoded localhost URLs
5. ✅ Fixed: Frontend had no environment variable support

## Notes
- The application is now ready for deployment
- All sensitive data uses environment variables
- API calls are centralized and configurable
- Development and production can use different API endpoints
