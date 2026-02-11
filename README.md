# RevoShop — Next.js E-Commerce (Module 5)

![Vercel](https://img.shields.io/badge/deployed-Vercel-black)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

🚀 **Live Demo:** https://module5-8eoj.vercel.app/  
📘 **Step-by-step Development (Notion):**  
https://www.notion.so/E-Commerce-Development-Flow-3045445f0c1e80679b4fdd931bdea3d6?source=copy_link

---

## 📌 Overview

**RevoShop** is a simple e-commerce application built with **Next.js App Router**.  
The project focuses on **clean rendering strategies**, **reusable components**, and a **scalable cart system** designed to be extended with authentication, middleware protection, and admin features.

---

## ✨ Features

- Product listing & product detail pages
- Client-side cart with persistence (`localStorage`)
- Quantity-based add to cart
- Cart summary & checkout (pre-auth)
- Clean separation of rendering flows (CSR / SSR)
- Ready for authentication & admin dashboard expansion

---

## 🧰 Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| Framework          | Next.js (App Router)       |
| Language           | TypeScript                 |
| Styling            | Tailwind CSS               |
| State Management   | React Context + useReducer |
| Data Fetching      | Axios                      |
| Image Optimization | Next.js `Image`            |
| Persistence        | localStorage               |
| Deployment         | Vercel                     |
| API                | Platzi Fake Store API      |

---

## 🗺 Routes

| Route            | Description            |
| ---------------- | ---------------------- |
| `/`              | Product listing (Home) |
| `/products/[id]` | Product detail         |
| `/cart`          | Shopping cart          |
| `/checkout`      | Checkout (pre-auth)    |
| `/faq`           | FAQ page               |

---

## 🧠 Application Flows

### 1️⃣ Product Rendering Flow

**Home / Product Listing**

- Rendering: **Client-Side Rendering (CSR)**
- Data fetched in the browser using `useEffect`
- Loading state visible while fetching
- Optimized for filters, pagination, and interaction

**Product Detail Page**

- Rendering: **Server-Side Rendering (SSR)**
- Data fetched on the server before HTML is sent
- No visible loading on initial render
- SEO-friendly and shareable URLs

---

### 2️⃣ Cart Flow

- Cart state managed via **React Context + useReducer**
- Global provider mounted at root layout
- Supported actions:
  - Add item
  - Remove item
  - Update quantity
  - Clear cart
- Cart state:
  - Hydrated from `localStorage` on app load
  - Persisted on every update
- Shared across:
  - Home
  - Product Detail
  - Cart
  - Checkout

---

### 3️⃣ Authentication Flow (Planned)

- Checkout route will be protected via **middleware**
- Authentication required before placing orders
- Cart state will remain client-side, but checkout access will be restricted
- Admin dashboard planned for product CRUD (API Routes + ISR)

---

## 🧱 Project Structure

```
src
├── app
│   ├── cart
│   │   └── page.tsx
│   ├── checkout
│   │   └── page.tsx
│   ├── faq
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── products
│       └── [id]
│           └── page.tsx
├── component
│   ├── AddToCart.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── context
│   └── CartContext.tsx
├── lib
│   └── api.ts
└── types
    └── product.ts
```
