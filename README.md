# 📝 Blink Blog - Full-Stack Application

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-success?style=for-the-badge&logo=vercel)](https://blink-blog-coral.vercel.app/)

A fully functional, responsive, and interactive Full-Stack Blog Application built with the modern React ecosystem (Frontend) and Node.js/Express (Backend). 

This platform allows users to read, publish, and interact with blog posts. It features a robust authentication system, meaning anyone can browse the content, but only authenticated users can engage (post, comment, share).

🚀 **Live Demo:** [https://blink-blog-coral.vercel.app/](https://blink-blog-coral.vercel.app/)  
🔗 **Frontend Repository:** [Ammarghaly/Blink_Blog](https://github.com/Ammarghaly/Blink_Blog)  
🔗 **Backend Repository:** [Ammarghaly/Blink_Back](https://github.com/Ammarghaly/Blink_Back)

---

## ✨ Features

### 🌍 Public Access (No Login Required)
- **Browse Posts:** Anyone can view the feed of published blog posts.
- **Read Comments:** All comments on posts are publicly visible.
- **Pagination:** Smooth browsing through multiple pages of posts.

### 🔐 Authenticated Users (Login/Register Required)
- **Create & Share:** Publish new blog posts and share them.
- **Interact:** Leave comments on posts.
- **Authorization:** Users can only edit or delete their **own** posts (Protected Routes & Backend Checks).

### 👤 User Profile
Every user has a dedicated profile page showcasing:
- Profile Picture (Avatar)
- Name & Email address
- Total count of published posts
- A feed containing only their specific posts

---

## 🛠️ Tech Stack & Technologies Used

### 💻 Frontend ([Blink_Blog](https://github.com/Ammarghaly/Blink_Blog))
The frontend is built for high performance and clean architecture, deployed on **Vercel**.
- **Core:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/) (Fast build tool)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for modern, responsive UI design.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for lightweight, fast global state management (managing user session, posts, etc.).
- **Routing:** [React Router DOM](https://reactrouter.com/) for seamless single-page navigation.
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) for efficient form validation (Login, Register, Post creation).
- **HTTP Client:** [Axios](https://axios-http.com/) for communicating with the backend API.
- **UI Details:** [Lucide React](https://lucide.dev/) for icons and [React Hot Toast](https://react-hot-toast.com/) for beautiful notifications.

### ⚙️ Backend ([Blink_Back](https://github.com/Ammarghaly/Blink_Back))
The backend serves as a secure and scalable RESTful API.
- **Core:** [Node.js](https://nodejs.org/) & [Express.js 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/) for modeling data (Users, Posts, Comments).
- **Authentication:** [JSON Web Token (JWT)](https://jwt.io/) for secure API routes and session handling.
- **Security:** [Bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing before saving to the database.
- **File Uploads:** [Multer](https://www.npmjs.com/package/multer) for handling multipart/form-data (used for uploading user profile pictures and post images).
- **Middlewares:** `cors` for cross-origin requests, `dotenv` for environment variables.

---

## 🚀 Installation & Setup

Since the project is separated into two repositories, you need to clone and run both to get the full application working locally.

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance (Local or MongoDB Atlas URI).

### 1. Backend Setup
```bash
# Clone the backend repository
git clone https://github.com/Ammarghaly/Blink_Back.git

# Navigate to the project folder
cd Blink_Back

# Install dependencies
npm install
```
Create a .env file in the Blink_Back directory and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Start the backend server:
```bash
npm run dev
```
### 2. Frontend Setup
Open a new terminal window/tab:
```bash
# Clone the frontend repository
git clone https://github.com/Ammarghaly/Blink_Blog.git

# Navigate to the project folder
cd Blink_Blog

# Install dependencies
npm install
```
Create a .env file in the Blink_Blog directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```
🏗️ Architecture & Logic Overview
Authentication Flow: When a user registers or logs in, the backend hashes the password using bcryptjs and returns a JWT. The frontend stores this token and includes it in the Authorization header via an Axios interceptor for all protected requests (creating posts, commenting).
Image Uploads: Handled gracefully by Multer on the backend. Profile pictures are saved and linked to the user's Mongoose document.
Data Relationships: Mongoose models are connected using ref. For example, a Post document contains the ObjectId of its Author, allowing populate() to fetch user details (Name, Avatar) when rendering the feed.
State Management Flow: Zustand keeps track of the currently logged-in user. If the user state is null, components related to interactions (like the comment input box or post creation button) are either hidden or trigger a "Please log in" toast.
🌐 Deployment
Frontend: Built with Vite and currently live on Vercel.
Backend & DB: Designed to be deployed on cloud platforms (Support for Docker deployment via Fly.io is configured in the backend package). MongoDB is hosted on MongoDB Atlas.
