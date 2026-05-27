# workout-app-backend

Backend API for a workout tracking application built with Bun, Express,
TypeScript, Prisma, PostgreSQL, and Docker.

---

# First start

## 1. Create .env file

DATABASE_URL=posgresql://<span style="color:#58abc4">email:password</span>@db:5432/<span style="color:#58abc4">DB-NAME</span>?schema=public  
NODE_ENV=development  
JWT_SECRET=  
PORT=3000  
---

## 2. Start project (build + run everything)

docker compose up --build

---

## 3. Create database tables (FIRST TIME ONLY)

docker compose exec backend bunx prisma db push

---

## 4. Generate Prisma client (FIRST TIME + after schema changes)

docker compose exec backend bunx prisma generate

---

# Normal start (after setup)

docker compose up

---

# Stop project

docker compose down

# Local run (without Docker)

bun install  

bunx prisma generate  
bunx prisma db push bun run dev  
