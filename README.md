# workout-app-backend

Backend API for a workout tracking app built with Express, TypeScript, Prisma, and PostgreSQL.

## Description

REST backend for a workout tracking application.

### Features
- User authentication
- Workout and exercise management
- Exercise logs and workout logs
- Prisma ORM for database access

## Tech Stack

- Node.js / Bun
- Express
- TypeScript
- Prisma
- PostgreSQL

## Requirements

- Node.js or Bun
- PostgreSQL

## Installation

### npm
```bash
npm install
```

### bun
```bash
bun install
```

## Environment variables

Create a `.env` file based on the expected variables from `env.d.ts`.

Example:
```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

## Database

Run migrations:

### npm
```bash
npx prisma migrate dev
npx prisma generate
```

### bun
```bash
bunx --bun prisma migrate dev
bunx --bun prisma generate
```

## Development

Start the development server:

### npm
```bash
npm run dev
```

### bun
```bash
bun run dev
```
