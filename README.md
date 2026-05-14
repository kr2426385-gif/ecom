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

Set these in `backend/.env` locally and in the backend Vercel project:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

During the first backend deployment, you can temporarily set `FRONTEND_URL=http://localhost:3000`. After frontend deployment, update it to the real frontend Vercel URL and redeploy the backend.

## Frontend Environment Variables

Set this in the frontend Vercel project:

```env
REACT_APP_API_URL=https://your-backend-domain.vercel.app
```

React reads this at build time, so redeploy the frontend after changing it.

## Deploy Backend First On Vercel

1. Push the repository to GitHub.
2. In Vercel, create a new project and select this repo.
3. Set the project root directory to `backend`.
4. Keep the framework preset as `Other`.
5. Add backend environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
6. Deploy.
7. Test the health endpoint:

```text
https://your-backend-domain.vercel.app/api/health
```

Optional seed step after backend deploy:

```bash
cd backend
npm run seed
```

Run this locally with the same `MONGODB_URI` if you want starter products in MongoDB before deploying the frontend.

## Deploy Frontend Second On Vercel

1. Create another Vercel project from the same repo.
2. Set the project root directory to `frontend`.
3. Use Create React App defaults:
   - Build command: `npm run build`
   - Output directory: `build`
4. Add `REACT_APP_API_URL` with your backend Vercel URL.
5. Deploy.
6. Copy the frontend Vercel URL.
7. Go back to the backend Vercel project, update `FRONTEND_URL` to the frontend URL, then redeploy backend.

## Useful API Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `GET /api/orders`
- `POST /api/orders`
