# Water-Quality-Monitor

A full-stack water quality monitoring application built with FastAPI (backend) and React (frontend).

## 🚀 Deployment

### Backend (Render)

1. **Create a Render Account**: Go to [render.com](https://render.com) and sign up
2. **Create PostgreSQL Database**:
   - Go to Render Dashboard → New → PostgreSQL
   - Note the connection string
3. **Deploy Backend**:
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Set build command: `pip install -r backend/requirements.txt`
   - Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables from `backend/.env.example`
   - Set DATABASE_URL to your PostgreSQL connection string

### Frontend (Vercel)

1. **Create a Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Deploy Frontend**:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect it's a Vite React app
   - Add environment variable: `VITE_API_BASE_URL` = your Render backend URL
3. **Update Backend CORS**:
   - Add your Vercel domain to the CORS origins in `backend/main.py`

## 🛠 Local Development

See [Execute.md](Execute.md) for detailed local setup instructions.

## 📁 Project Structure

```
Water-Quality-Monitor/
├── backend/          # FastAPI backend
│   ├── main.py      # Main application
│   ├── database.py  # Database configuration
│   ├── models.py    # SQLAlchemy models
│   ├── routers/     # API endpoints
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```