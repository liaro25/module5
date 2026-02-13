# RevoShop — Next.js E-Commerce (Module 5)

![Vercel](https://img.shields.io/badge/deployed-Vercel-black)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

🚀 **Live Demo:** https://module5-8eoj.vercel.app/  
📘 **Development Notes (Notion):**  
https://noto.li/NXX6yr

---

## Overview

**RevoShop** is a modular e-commerce application built with **Next.js App Router**.  
This project demonstrates a clean separation between **public pages**, **authenticated areas**, and **admin-only routes**, while implementing a scalable cart system and authentication flow.

This repository represents **Module 5**, focusing on authentication, middleware protection, and scalable architecture in Next.js.

---

## Features

- Public product listing & product detail pages
- Client-side shopping cart with persistence (`localStorage`)
- Quantity-based add-to-cart functionality
- Cart & checkout pages
- Authentication with session handling
- Middleware-protected routes (`/dashboard`, `/admin`)
- Clear separation between:
  - Landing page
  - Public catalog
  - Authenticated user area

---

## Tech Stack

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| Framework        | Next.js (App Router)            |
| Language         | TypeScript                      |
| Styling          | Tailwind CSS                    |
| State Management | React Context + useReducer      |
| Data Fetching    | Axios                           |
| Authentication   | Server Actions + Cookie Session |
| Middleware       | Next.js Middleware              |
| Persistence      | localStorage + cookies          |
| Deployment       | Vercel                          |
| External API     | Platzi Fake Store API           |

---

## Routes

| Route            | Access            | Description                           |
| ---------------- | ----------------- | ------------------------------------- |
| `/`              | Public            | Landing page (redirects if logged in) |
| `/login`         | Public            | Login page                            |
| `/products`      | Public            | Product listing                       |
| `/products/[id]` | Public            | Product detail                        |
| `/cart`          | Public            | Shopping cart                         |
| `/checkout`      | Protected         | Checkout (authentication required)    |
| `/dashboard`     | Protected         | User dashboard                        |
| `/admin`         | Protected (Admin) | Admin dashboard (CRUD – WIP)          |
| `/faq`           | Public            | FAQ page                              |

---

## Application Architecture

### 1️⃣ Routing & Access Control

- **Landing page (`/`)**
  - Implemented as a Server Component
  - Redirects authenticated users to `/dashboard`
- **Public catalog**
  - `/products` and `/products/[id]`
  - Client-side data fetching
- **Protected routes**
  - Enforced via middleware (`proxy.ts`)
  - Unauthorized users are redirected to `/login`

---

### 2️⃣ Authentication Flow

- Login handled via **Server Actions**
- Session stored using **HTTP-only cookies**
- Middleware checks:
  - Authentication status
  - Role-based access for admin routes
- Graceful redirection for unauthorized access

---

### 3️⃣ Cart Flow

- Cart state managed using **React Context + useReducer**
- Persisted in `localStorage`
- Shared across:
  - Product listing
  - Product detail
  - Cart
  - Checkout
- Cart remains client-side even after authentication

---

## Project Structure

```txt
src
├── app
│   ├── actions
│   ├── admin
│   ├── cart
│   ├── checkout
│   ├── dashboard
│   ├── login
│   ├── products
│   │   ├── [id]
│   │   └── page.tsx
│   ├── page.tsx        # Landing page
│   └── layout.tsx
├── components
│   ├── AddToCart.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── context
│   └── CartContext.tsx
├── lib
│   ├── api.ts
│   ├── session.ts
│   └── definitions.ts
├── types
│   └── product.ts
└── proxy.ts            # Middleware logic
```

## Local Development

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Run development server

```
npm run dev
```

---

## 📚 Documentation

Detailed step-by-step development notes are documented in Notion, covering:

- Project initialization
- Routing & rendering strategies
- Authentication & middleware flow
- Cart state management & persistence
- Architecture decisions

📘 **Notion:**  
https://noto.li/NXX6yr

---

## 🚧 Next Improvements

Planned enhancements for future iterations:

- Admin dashboard with full CRUD functionality
  - API Routes (GET / POST / PUT / DELETE)
  - Form validation & secure access
- Incremental Static Regeneration (ISR)
- UI revalidation after data mutations
- Unit testing using Jest & React Testing Library
- Performance optimization & caching strategies

---

## 📝 License

This project is created for educational purposes as part of  
**RevoU Full-Stack Software Engineering – Module 5**.
