# Naeem Electric Store - Installation Guide

## 🚀 Live Demo
- **Website**: [Your Vercel URL]
- **Admin Panel**: [Your Vercel URL]/admin/login

## 📦 Project Structure
This is a full-stack e-commerce application with separate frontend and backend:
- **Frontend**: Next.js 15 (This repository)
- **Backend**: Node.js + Express (Separate repository)

---

## 🔧 Frontend Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-frontend-repo-url>
cd naeem-electric-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api

# Application Configuration (Optional)
NEXT_PUBLIC_SITE_NAME="Naeem Electric"
NEXT_PUBLIC_COMPANY_NAME="Naeem Electric"
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
```bash
npm run build
npm start
```

### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | `https://your-backend.railway.app/api` |
| `NEXT_PUBLIC_SITE_NAME` | Site name | No | `Naeem Electric` |
| `NEXT_PUBLIC_COMPANY_NAME` | Company name | No | `Naeem Electric` |

---

## 🎯 Backend Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Installation Steps

1. **Clone the backend repository**
```bash
git clone <your-backend-repo-url>
cd naeem-electric-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/YourDatabase?retryWrites=true&w=majority

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Authentication
JWT_SECRET=generate-random-32-character-string-here
JWT_EXPIRE=12h
```

4. **Create Super Admin**
```bash
node utils/createSuperadmin.js
```

Default credentials:
- Email: `admin@naeemelectric.com`
- Password: `admin123`

⚠️ **Change the password immediately after first login!**

5. **Run development server**
```bash
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000)

6. **Test API endpoints**
```bash
node test-all-apis.js
```

### Backend Environment Variables

| Variable | Description | Required | How to Get |
|----------|-------------|----------|------------|
| `PORT` | Server port | Yes | `5000` |
| `NODE_ENV` | Environment | Yes | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | Yes | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | [Cloudinary Dashboard](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | [Cloudinary Dashboard](https://cloudinary.com/console) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | [Cloudinary Dashboard](https://cloudinary.com/console) |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | Generate random string (min 32 chars) |
| `JWT_EXPIRE` | JWT expiration time | Yes | `12h`, `1d`, `7d` |

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = Your Railway backend URL
4. Deploy

### Backend Deployment (Railway)

1. Push code to GitHub
2. Create new project in Railway
3. Deploy from GitHub
4. Add all environment variables in Railway dashboard
5. Generate public domain
6. Use this URL as `NEXT_PUBLIC_API_URL` in frontend

---

## 📱 Admin Panel Access

**URL**: `https://your-domain.com/admin/login`

**Default Credentials**:
- Email: `admin@naeemelectric.com`
- Password: `admin123`

**Features**:
- Product Management (CRUD)
- Category Management (CRUD)
- Media Library (Image uploads)
- Admin User Management (Superadmin only)

---

## 🔐 Security Notes

1. **Change default admin password** immediately after deployment
2. **Use strong JWT_SECRET** (random 32+ character string)
3. **Never commit `.env` files** to git
4. **Use environment variables** for all sensitive data
5. **Enable CORS** only for your frontend domain in production

---

## 🛠 Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary (Image hosting)
- JWT Authentication

---

## 📞 Support

For issues or questions, please contact:
- GitHub Issues: [Link to your repo]
- Email: [Your email]

---

## 📄 License

This project is for educational purposes.
