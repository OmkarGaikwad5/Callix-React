# 📞 Callix – Real-Time Video Conferencing Platform

![React](https://img.shields.io/badge/React-18-blue)
![Express](https://img.shields.io/badge/Express.js-Backend-green)
![WebRTC](https://img.shields.io/badge/WebRTC-Video%20Calls-orange)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-grey)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)
![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-lightblue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18.x-success)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Ready-blueviolet)

---

## 📌 Project Overview

**Callix** is a full-stack, real-time video conferencing application built using **React**, **WebRTC**, **Socket.IO**, and **Node.js**. It allows multiple users to connect in virtual meeting rooms with features like screen sharing, chat, authentication, and real-time communication. It’s scalable, responsive, and designed with a modern, clean UI for a professional meeting experience.

---

## 🚀 Features

### 🔐 Authentication & Security
- 👤 User authentication using **JWT**
- 🛡️ Protected routes and secure login
- 🔐 Session-based call access
- Clear Call History Feature

### 🎥 Video & Communication
- 🖥️ Real-time video & audio via **WebRTC**
- 📡 Socket.IO-powered multi-user communication
- 📤 Screen sharing support
- 💬 In-call real-time chat messaging
- 🎙️ Mute/unmute and camera toggle

### 💻 UI/UX & Usability
- 🌙 Light and dark mode support
- 📱 Fully responsive design (desktop & mobile)
- 🧭 Intuitive lobby and meeting UI
- 🪟 Dynamic UI for video grids and chat overlay

### ⚙️ Backend Functionality
- 🌐 REST API using **Express.js**
- 🧠 Scalable server architecture
- 🗂️ MongoDB for user and room data
- 📈 Future-ready structure for analytics, logs, and moderation

---

## 🛠️ Tech Stack

### 🧩 Frontend (React)
- ⚛️ React.js + React Router DOM
- 🎨 Tailwind CSS for styling
- 🔄 Axios for HTTP requests
- 🌗 Light/Dark theme toggle
- 📦 Context API for global state management

### 🛠 Backend (Node + Express)
- 🟢 Node.js and Express.js server
- 🛡️ JWT-based authentication
- 🔄 RESTful APIs
- 🍃 MongoDB + Mongoose ODM
- 🔌 Socket.IO for real-time events

### 🎥 Real-Time Communication
- 📡 WebRTC for peer-to-peer video/audio streams
- 🔁 Socket.IO for signaling and messaging

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/callix.git
cd callix
```

2️⃣ Setup Backend
```sh
cd server
npm install
# Create `.env` and add your values
npm run dev
```

3️⃣ Setup Frontend
```sh
cd client
npm install
npm start
```

📄 .env Configuration
server/.env
```sh
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

🤝 Contributing
Contributions are welcome! Follow these steps:

- Fork the repository
- Create a new branch: git checkout -b feature-name
- Commit your changes: git commit -m "Add feature"
- Push to your branch: git push origin feature-name
- Open a Pull Request

📄 License
This project is licensed under the MIT License.

