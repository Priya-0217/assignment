# Spotify New

A full‑stack music application built for local development. It demonstrates modern web engineering practices: clean API design, secure cookie‑based authentication, role‑based access for artists and listeners, audio uploads, album management, and a responsive React UI. The project is intentionally simple to run locally while showcasing production‑oriented patterns (modular architecture, environment‑driven config, CORS, and secure cookies).

## Highlights
- End‑to‑end auth flow with httpOnly cookies
- Role‑based access: listener vs. artist
- Track upload (multipart/form‑data) and playback
- Albums: create, list, update, delete
- Clean UI with Tailwind, accessible form controls, and helpful status messages
- Local‑first developer experience with zero deploy requirements

## Architecture
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB (Mongoose)
- Storage: multer (memory) with pluggable CDN storage (ImageKit ready)
- Security: httpOnly cookies; SameSite and Secure flags configurable; CORS based on environment

### Structure
- `backend/` Express API under `/api`
- `frontend/` React app (Vite dev server)
- `package.json` (root) local helper scripts

## Getting Started (Local)
### Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Optional: ImageKit keys for CDN uploads

### Install
```
cd backend && npm install
cd ../frontend && npm install
```

### Configure Backend
Create `backend/.env`:
```
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
```
Notes:
- For local use, `FRONTEND_URL` should be `http://localhost:5173`.
- Never commit secrets to version control.

### Run
Open two terminals at the project root:
```
npm run dev:backend
npm run dev:frontend
```
- Backend listens on `http://localhost:3000`
- Frontend dev server on `http://localhost:5173`
- The frontend proxies `/api` to the backend for seamless local calls

## Features in Detail
### Authentication
- Register and login with email or username
- Persistent sessions via secure cookies
- User profile endpoint (`/api/auth/me`) to fetch the current user

### Role‑Based Access
- Listener: browse, library, playlists
- Artist: upload tracks, manage own content, create and edit albums

### Tracks
- Upload audio via `multipart/form-data`
- Edit title and delete (artist‑owned content)
- Playback in UI with a native HTML audio player

### Albums
- Create albums and attach tracks
- List, update title and selection, delete
- Filtered views showing artist ownership

## API Overview
Auth:
- POST `/api/auth/register` body: `{ username, email, password, role }`
- POST `/api/auth/login` body: `{ email, password }` or `{ username, password }`
- GET `/api/auth/me`
- POST `/api/auth/logout`

Music:
- POST `/api/music/upload` form‑data: `file`(File), `title`(string), `albumId`(optional)
- GET `/api/music/musics`
- PUT `/api/music/musics/:musicId` body: e.g. `{ title }`
- DELETE `/api/music/musics/:musicId`

Albums:
- POST `/api/music/album` body: `{ title, musicIds }`
- GET `/api/music/albums`
- PUT `/api/music/albums/:albumId`
- DELETE `/api/music/albums/:albumId`

## Development Notes
- Environment‑driven config keeps logic clean and portable
- Middleware encapsulates auth and role checks
- UI components are stateful but minimal, focusing on clarity and accessibility
- Network helper centralizes fetch behavior with credentials included

## Troubleshooting
- “Cannot GET /api/auth/register” in a browser means the endpoint expects POST; use the app UI or Postman.
- “Failed to fetch” locally: ensure backend is on 3000 and frontend on 5173; verify the proxy is active and CORS allows `http://localhost:5173`.
- Audio playback issues: confirm uploaded files have valid extensions and the returned URL is reachable.

## License
This project is intended for learning and portfolio use. Choose a license appropriate for your needs (e.g., MIT) if you plan to publish or share.
