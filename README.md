# FocusFlow

FocusFlow is a lightweight Pomodoro-style timer combined with a simple task manager. It's built as a MERN-style split project with an Express + MongoDB backend and a React frontend. The app helps you focus with timed work sessions while managing and tracking tasks.

---

## Features

- **Pomodoro Timer**: Work sessions with configurable intervals (frontend timer component).
- **Task Management**: Create, update, delete, and list tasks tied to a user.
- **Authentication**: Email/password sign-up and login with JWT-based auth.
- **Persistent Storage**: Tasks and users stored in MongoDB.

---

## Tech Stack

- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt
- **Frontend**: React, Axios
- **Database**: MongoDB

---

## Repository Structure

- `backend/`: Express API server
  - `server.js`: App entry
  - `config/db.js`: MongoDB connection
  - `models/`: Mongoose models (`User`, `Task`)
  - `routes/`: API routes (`auth.js`, `tasks.js`)
- `frontend/`: React app
  - `src/services/api.js`: API client used by components

---

## Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or hosted Atlas)

---

## Environment Variables

Create a `.env` file in the `backend/` folder with the following values:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret used to sign JWT tokens
- `PORT` (optional): Backend port (defaults to `5000`)

Example `backend/.env`:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/focusflow
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## Setup & Run (Development)

Backend

1. Open a terminal and install dependencies:

```
cd backend
npm install
```

2. Start the backend in dev mode (uses `nodemon`):

```
npm run dev
```

Frontend

1. In a separate terminal, install frontend dependencies and start the dev server:

```
cd frontend
npm install
npm start
```

Notes

- The frontend API client currently targets `http://localhost:5001/api` in `frontend/src/services/api.js`. Update that value to match your backend `PORT` (e.g., `http://localhost:5000/api`) or change it to an environment-driven value for deployment.
- Use macOS `zsh` as your shell when running the commands above (they are standard shell commands).

---

## Build (Production)

Frontend

```
cd frontend
npm run build
```

Backend

```
cd backend
npm start
```

Serve the built frontend with your preferred static host or integrate it with the backend for a single deployable app.

---

## API Summary

Base path: `/api`

- **Auth** (`/api/auth`)

  - `POST /signup` — Register a new user. Body: `{ username, email, password }` — returns success message.
  - `POST /login` — Log in. Body: `{ email, password }` — returns `{ token, user }` on success.

- **Tasks** (`/api/tasks`) — Protected (requires `Authorization: Bearer <token>` header)
  - `POST /` — Create task. Body: `{ title, description }` — returns created task.
  - `GET /` — Get all tasks for authenticated user.
  - `PUT /:id` — Update a task (title, description, completed) — returns updated task.
  - `DELETE /:id` — Delete a task — returns success message.

---

## Notes on Implementation

- Passwords are hashed with `bcryptjs` and authentication uses `jsonwebtoken` (JWT) with a 1-day expiry.
- Backend verifies task ownership before updating or deleting tasks.
