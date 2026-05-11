# 🐾 Pet Adoption System

A web-based pet adoption management system built with React.js and Firebase.

## 📋 Project Overview

This platform connects animals in shelters with potential adopters. The system supports three user roles — **Admin**, **Staff (Veteriner)**, and **User** — each with a dedicated interface and role-based access control.

## 🚀 Features

- 🔐 Firebase Authentication (Login / Register)
- 👤 Role-based routing (Admin / Staff / User)
- 🐱 Browse pets available for adoption
- 📋 Staff panel for managing adoption applications
- 🛡️ Admin panel for user management
- 📊 Real-time data with Cloud Firestore

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite
- **Authentication:** Firebase Auth
- **Database:** Cloud Firestore
- **State Management:** Context API
- **Routing:** React Router DOM

## ⚙️ Installation

    git clone https://github.com/hilal2301/pet-adoption-system.git
    cd pet-adoption-system
    npm install
    npm run dev

## 🔑 Environment Variables

create .env file:

    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

## 🌐 Routes

| Route          | Description         |
| -------------- | ------------------- |
| `/`            | Login sayfası       |
| `/register`    | Kayıt sayfası       |
| `/user`        | Kullanıcı dashboard |
| `/staff`       | Staff dashboard     |
| `/profile`     | Profil sayfası      |
| `/admin`       | Admin dashboard     |
| `/admin/users` | Kullanıcı yönetimi  |

## 📁 Project Structure

    src/
    ├── components/
    │   ├── Navbar.jsx
    │   └── AdminSidebar.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── UserDashboard.jsx
    │   ├── StaffDashboard.jsx
    │   ├── ProfilePage.jsx
    │   ├── AdminDashboard.jsx
    │   └── UserManagement.jsx
    ├── firebase.js
    ├── App.jsx
    └── main.jsx
