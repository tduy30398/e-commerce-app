# 🛍️ Personal E-Commerce Website

A full-stack e-commerce web application with real-time features, authentication, and admin management.  
 Built using **Next.js**, **Node.js/Express**, **Socket.IO**, and **JWT**.

---

## 🚀 Tech Stack

### Frontend

- **Next.js** – React framework for SSR and routing
- **Shadcn UI** – Modern UI components
- **SWR** – Data fetching & caching
- **Zustand** – Lightweight state management
- **Socket.IO Client** – Real-time communication
- **next-intl** – Internationalization (i18n) & localization

### Backend

- **Node.js + Express.js** – REST API and business logic
- **Socket.IO** – Real-time events (chat, cart updates)
- **jsonwebtoken (JWT)** – Authentication & authorization
- **OAuth (Facebook, Google, GitHub, ...)** – Social login support

---

## ✨ Features

- 🔐 **Authentication**

  - Login with **JWT**
  - Social login via **OAuth providers** (Facebook, Google, GitHub, ...)
  - User **profile page**

- 💬 **Real-time Communication**

  - **Live chat** with Socket.IO
  - **Real-time cart updates** across devices

- 🛒 **E-Commerce**

  - Add/remove products to cart
  - Sync cart in real-time

- 🌍 **Internationalization (i18n)**

  - Multi-language support using **next-intl**
  - Language switcher for users
  - Translations for UI, product details, and error messages

- 🛠️ **Admin Panel**

  - **CRUD products** (Create, Read, Update, Delete)
  - Role-based access control

- 📘 **API Documentation (Swagger)**
  - Built using **swagger-jsdoc** and **swagger-ui-express**
  - Automatically generates documentation from JSDoc comments
