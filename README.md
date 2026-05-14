# Jewelry Shop E-Commerce

Full-stack jewelry shop app with:

- React frontend in `frontend/`
- Express API in `backend/`
- MongoDB Atlas through Mongoose
- JWT authentication
- Product, cart, favorites, order, and payment API routes

## Local Setup

Backend:

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm start
```

For local development, the frontend defaults to `http://localhost:5000` for API requests.

## Backend Environment Variables

Set these in `backend/.env` locally and in Render:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

Render automatically provides `PORT`, so do not hardcode it in production.

## Frontend Environment Variables

Set this in the frontend Vercel project:

```env
REACT_APP_API_URL=https://your-render-backend.onrender.com
```

React reads this at build time, so redeploy the frontend after changing it.

## Deploy Backend On Render

Recommended manual setup:

1. Push the repository to GitHub.
2. In Render, create a new **Web Service** from this repo.
3. Set:
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. Deploy.
6. Test:

```text
https://your-render-backend.onrender.com/
https://your-render-backend.onrender.com/api/health
```

This repo also includes `render.yaml`, so you can use Render Blueprints if you prefer infrastructure-as-code.

Optional seed step after backend deploy:

```bash
cd backend
npm run seed
```

Run this locally with the same `MONGODB_URI` if you want starter products in MongoDB.

## Deploy Frontend On Vercel

1. Create a Vercel project from the same repo.
2. Set Root Directory to `frontend`.
3. Use Create React App settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add:
   - `REACT_APP_API_URL=https://your-render-backend.onrender.com`
5. Deploy.
6. Copy the frontend Vercel URL.
7. Update Render backend `FRONTEND_URL` to the frontend URL, then redeploy the backend.

## Useful API Endpoints

- `GET /`
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `GET /api/orders`
- `POST /api/orders`
