# To-do-list

A simple JWT-authenticated To-do list app (React + Express + MongoDB).

## Overview
- Client: React + TypeScript (Vite)
- Server: Node + Express + TypeScript
- Auth: JWT, passwords hashed with bcrypt
- DB: MongoDB (mongoose)

## Requirements
- Node.js 18+ (or compatible)
- npm
- MongoDB connection (Atlas or local)

## Setup
1. Clone repository
2. Install dependencies for server and client:

```powershell
cd server
npm install

cd ..\client
npm install
```

3. Create environment files.

- Copy `server/.env.example` to `server/.env` and fill values.

Example `server/.env` keys:
```
PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=some-secret
JWT_EXPIRES_IN=7d
```

Important: Do NOT commit `.env` to git. This repository's `.gitignore` already excludes `.env` files.

## Run (development)
Start server and client in separate terminals.

Server (from `server`):

```powershell
npm run dev
```

Client (from `client`):

```powershell
npm run dev
```

The client runs on Vite (likely `http://localhost:5173`) and the server runs on the port from `PORT` (default `5000`).

## API (quick reference)
- POST `/api/auth/register` — register new user. Expects JSON `{ name, email, password }`.
- POST `/api/auth/login` — login. Expects JSON `{ email, password }`. Returns JWT token.

Responses are JSON. Check `server/routes/authRoutes.ts` for details.

## Security notes
- Never commit real credentials. Rotate any leaked credentials immediately.
- Use strong `JWT_SECRET` and restrict DB user permissions.

## Troubleshooting
- `ts-node-dev: no script to run provided` — ensure `server/package.json` dev script points to `./server.ts`.
- If Mongo fails to connect, verify `MONGO_URI` and network access (Atlas IP whitelist).

## Next steps / Improvements
- Add integration tests for auth endpoints.
- Add refresh tokens and secure cookie storage for JWT.

---
If you want, I can also remove the committed `.env` from history (force-push) and help rotate credentials — tell me if you want to proceed.