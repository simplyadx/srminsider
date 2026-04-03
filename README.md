# SRM Insider Recruitment Task - Backend App

This is a production-ready Next.js 16 (App Router) backend built as an API layer using **MySQL** (via Prisma ORM), **JWT Authentication**, and standard MVC separation.

## Tech Stack
- Framework: Next.js (App Router) API Routes (`route.js`)
- Database: MySQL
- ORM: Prisma
- Auth: JWT (JSON Web Tokens) `jsonwebtoken` & `bcryptjs`
- Validation: Zod schemas

## Project Structure
```text
/src
  /app
    /api           -> All Route Handlers
      /auth        -> signup, login, me
      /posts       -> CRUD for posts
      /admin       -> User management
  /lib
    prisma.js      -> Singleton DB connection
    jwt.js         -> Token logic
    auth.js        -> Middleware wrapper (withAuth)
    response.js    -> Standardized API responses
    validate.js    -> Zod schemas
/prisma
  schema.prisma    -> database schema models
```

---

## Getting Started

### 1. Database Setup (MySQL)
Ensure you have a MySQL server running locally (or via Docker/Planetscale). Create an empty database:
```sql
CREATE DATABASE srminsider;
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill out your details:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` matches your local MySQL setup.

### 3. Install Dependencies
```bash
bun install
# or npm install
```

### 4. Run Migrations & Generate Prisma Client
This will create the tables in your database based on `schema.prisma`.
```bash
bunx prisma migrate dev --name init
bunx prisma generate
```

### 5. Start the App
```bash
bun run dev
```

---

## API Documentation

A Postman collection is included in the project root: `srm_insider_api.postman_collection.json`. Import this directly into Postman or Thunder Client to test endpoints!

### Public Routes
- **POST** `/api/auth/signup` - Register a new account
- **POST** `/api/auth/login` - Login to get JWT access token
- **GET** `/api/posts` - List posts (Supports `?q=search&page=1&limit=10`)
- **GET** `/api/posts/:id` - Get single post

### Protected Routes (Requires JWT)
*Pass header: `Authorization: Bearer <token>`*
- **GET** `/api/auth/me` - Get current logged-in profile
- **POST** `/api/posts` - Create a post
- **PUT** `/api/posts/:id` - Update a post (Must be owner or Admin)
- **DELETE** `/api/posts/:id` - Delete a post (Must be owner or Admin)
- **GET** `/api/admin/users` - List all users (Requires `ADMIN` role)

## Bonus Features Included
✅ Role-based Access Control (User/Admin separation via middleware)
✅ Pagination for posts (`/api/posts?page=1&limit=10`)
✅ Search and filtering (`/api/posts?q=keyword`)
✅ MVC Architecture (`/lib` separation from Route handlers)
✅ Postman Collection exported and bundled
