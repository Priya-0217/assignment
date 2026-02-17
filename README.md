# 🎧 Spotify Clone – Fullstack Music Streaming Platform

A scalable fullstack music streaming backend system with a basic frontend interface, built to demonstrate secure authentication, role-based access control, and media management.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT Authentication
* Password Hashing (bcrypt)
* Input Validation & Error Handling

### 👥 Role-Based Access Control

* **User (Listener)**

  * Browse songs
  * Save music
  * Stream content

* **Artist**

  * Upload songs
  * Create albums
  * Manage their music library

---

### 🎵 Music Management (CRUD)

* Upload Songs (with media storage)
* Create / Update / Delete Albums
* Manage Artist Content
* User Save / Library Features

---

## 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB
* JWT Auth
* ImageKit (media storage)

**Frontend**

* React.js
* Axios
* Protected Routes

**Deployment**

* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure

```
spotify_clone/
│
├── frontend/        # React frontend
├── backend/         # Express API server
├── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=xxx
IMAGEKIT_PRIVATE_KEY=xxx
IMAGEKIT_URL_ENDPOINT=xxx
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🧪 API Documentation

Postman collection / Swagger includes:

* Auth APIs
* Artist APIs
* Song Upload APIs
* Album CRUD APIs

---

## 📹 Project Demo Video

A full walkthrough of authentication, role access, and CRUD functionality is included in the submission.

---

## 📈 Scalability Notes

* Modular MVC architecture
* Ready for microservices split
* Cloud media storage
* JWT stateless auth
* Can integrate Redis caching & load balancing

---

## 👩‍💻 Author

Priya
Backend Developer Intern Assignment Project
