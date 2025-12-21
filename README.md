# ⚡ Naeem Electric Store

A modern, full-stack e-commerce platform for electrical products built with **Next.js**, **Express.js**, and **MongoDB**.

## 🌟 Features

### Public Store
- 🛍️ Browse products by category
- 🔍 Advanced search and filtering
- 📱 Fully responsive design
- 🛒 Shopping cart with WhatsApp checkout
- 💰 Dynamic pricing with discounts
- ⭐ Product reviews and ratings
- 📦 Detailed product specifications

### Admin Panel
- 🔐 Secure JWT authentication
- 👥 Role-based access control (Admin/Superadmin)
- 📊 Dashboard with statistics
- 🏷️ Product management (CRUD)
- 📂 Category management
- 🖼️ Media library with Cloudinary integration
- 👤 Admin user management
- 📦 Order management
- 🔒 Protected routes

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management

### Backend
- **Express.js** - REST API
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 📦 Project Structure

```
├── Backend/                    # Express.js API
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth & error handling
│   ├── lib/                   # Utilities (JWT, Cloudinary)
│   └── utils/                 # Helper scripts
│
├── src/                       # Next.js Frontend
│   ├── app/                   # Pages (App Router)
│   │   ├── admin/            # Admin panel
│   │   ├── products/         # Product pages
│   │   └── checkout/         # Checkout flow
│   ├── components/            # React components
│   │   └── admin/            # Admin components
│   ├── contexts/              # React Context providers
│   ├── services/              # API service layer
│   ├── lib/                   # Utilities
│   ├── types/                 # TypeScript definitions
│   └── config/                # Configuration
│
└── docs/                      # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary account

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd naeem-electric-store
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd Backend
npm install
cd ..
```

3. **Configure environment variables**
```bash
# Frontend
cp .env.example .env.local
# Edit .env.local with your API URL

# Backend
cp Backend/.env.example Backend/.env
# Edit Backend/.env with MongoDB URI, JWT secret, and Cloudinary credentials
```

4. **Create first admin user**
```bash
cd Backend
npm run create-admin
```

5. **Start development servers**
```bash
# Terminal 1 - Backend (Port 5000)
cd Backend
npm run dev

# Terminal 2 - Frontend (Port 3000)
npm run dev
```

6. **Access the application**
- Public Store: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login
- Backend API: http://localhost:5000



## 📖 Documentation

Comprehensive documentation is available:

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[ADMIN_PANEL_INTEGRATION.md](./ADMIN_PANEL_INTEGRATION.md)** - Technical architecture
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview
- **[CHECKLIST.md](./CHECKLIST.md)** - Implementation progress
- **[EXAMPLE_API_INTEGRATION.tsx](./EXAMPLE_API_INTEGRATION.tsx)** - Code examples

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected admin routes
- Input validation
- XSS protection
- CORS configuration

## 🎯 API Endpoints

### Public
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - List categories

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin
- `GET /api/auth/me` - Get current user

### Protected (Require JWT)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/categories` - Create category
- `POST /api/media` - Upload media
- `GET /api/admins` - List admins (Superadmin only)

*See full API documentation in [ADMIN_PANEL_INTEGRATION.md](./ADMIN_PANEL_INTEGRATION.md)*

## 🧪 Testing

```bash
# Check setup
node check-setup.js

# Run backend tests (when implemented)
cd Backend
npm test

# Build frontend for production
npm run build
```

## 🚀 Deployment

### Backend
1. Deploy to Heroku, Railway, or DigitalOcean
2. Set environment variables
3. Connect to production MongoDB
4. Configure CORS for production domain

### Frontend
1. Deploy to Vercel (recommended)
2. Set `NEXT_PUBLIC_API_URL` to production backend
3. Configure domain

*See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions*

## 📝 Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`.env`)
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Muhammad Saud**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Cloudinary for image hosting
- MongoDB for database solutions

---

**Need help?** Check the documentation or open an issue!
