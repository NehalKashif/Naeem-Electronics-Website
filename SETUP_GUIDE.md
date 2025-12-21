# 🚀 Quick Start Guide - Naeem Electric Store

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## 🛠️ Backend Setup

### 1. Navigate to Backend folder
```bash
cd Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values:
# - MongoDB URI (local or Atlas)
# - JWT Secret
# - Cloudinary credentials
```

### 4. Create first superadmin
```bash
npm run create-admin
```

This will create:
- Email: `admin@naeemelectric.com`
- Password: `admin123`
- **⚠️ Change this password after first login!**

### 5. Start the backend server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Backend will run on: `http://localhost:5000`

### 6. Test the API
Visit: `http://localhost:5000/` to see available endpoints

## 🎨 Frontend Setup

### 1. Navigate to project root
```bash
cd ..  # If you're in Backend folder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
# Copy the example file
cp .env.example .env.local

# The default API URL is already set:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the development server
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🔐 Admin Panel Access

1. **Start both servers** (backend on 5000, frontend on 3000)

2. **Login to admin panel**:
   - Visit: `http://localhost:3000/admin/login`
   - Email: `admin@naeemelectric.com`
   - Password: `admin123`

3. **Change default password**:
   - Go to Admin → Admins → Edit your account
   - Change the password immediately

## 📁 Project Structure

```
.
├── Backend/                    # Express.js API (Port 5000)
│   ├── config/                # Database config
│   ├── controllers/           # Route handlers
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── middleware/            # Auth, logging, etc.
│   ├── utils/                 # Helper scripts
│   ├── .env                   # Backend environment vars
│   └── server.js              # Entry point
│
├── src/                       # Next.js Frontend (Port 3000)
│   ├── app/                   # Pages (App Router)
│   │   ├── admin/            # Admin panel pages
│   │   ├── products/         # Public product pages
│   │   └── checkout/         # Checkout page
│   ├── components/            # React components
│   │   └── admin/            # Admin-specific components
│   ├── contexts/              # React contexts
│   ├── services/              # API service layer
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript types
│
└── .env.local                 # Frontend environment vars
```

## 🎯 Available Features

### Public Store (Frontend)
- ✅ Browse products by category
- ✅ Product details page
- ✅ Shopping cart
- ✅ WhatsApp checkout
- ✅ Responsive design

### Admin Panel
- ✅ Dashboard with stats
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ Media library management
- ✅ Admin user management
- ✅ Order management
- ✅ Protected routes with JWT auth
- ✅ Role-based access control

## 🔑 API Endpoints

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - List all categories

### Auth Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (can be disabled in production)
- `GET /api/auth/me` - Get current user

### Protected Endpoints (Require JWT token)

#### Products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

#### Media
- `GET /api/media` - List all media
- `POST /api/media` - Upload media
- `PUT /api/media/:id` - Update media
- `DELETE /api/media/:id` - Delete media

#### Admins (Superadmin only)
- `GET /api/admins` - List all admins
- `POST /api/admins` - Create admin
- `PUT /api/admins/:id` - Update admin
- `DELETE /api/admins/:id` - Delete admin

#### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

## 🔒 Authentication Flow

1. **Login**: POST to `/api/auth/login` with email/password
2. **Receive JWT token** in response
3. **Store token** in localStorage (frontend does this automatically)
4. **Include token** in Authorization header: `Bearer <token>`
5. **Protected routes** verify token and attach user to request

## 📦 Database Models

### Admin
- username, email, password (hashed)
- role (admin | superadmin)
- isActive

### Category
- value (unique, lowercase)
- label, icon, description
- isActive, order

### Product
- name, category
- originalPrice, discountPercent
- image, badge, badgeColor
- shortDescription, fullDescription
- features[], specifications (Map)
- reviews[], isFeatured
- stock, sku, brand

### Media
- filename, url, publicId
- fileType, mimeType, size
- dimensions, folder, tags
- uploadedBy (ref Admin)

### Order
- orderNumber, customer info
- items[], shippingAddress
- totalAmount, status
- paymentMethod, paymentStatus

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running
- Check if port 5000 is available

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### Login not working
- Create superadmin: `cd Backend && npm run create-admin`
- Check JWT_SECRET is set in backend `.env`
- Check browser console for errors

### Images not uploading
- Verify Cloudinary credentials in backend `.env`
- Check file size limits in multer config
- Verify upload folder permissions

## 🔄 Development Workflow

### Adding a new product
1. Login to admin panel
2. Go to Products → Add Product
3. Fill in details and upload image
4. Product appears on public store immediately

### Managing categories
1. Go to Categories in admin panel
2. Add/edit categories with icons
3. Products can use these categories
4. Categories appear in public store navigation

### Managing media
1. Go to Media in admin panel
2. Upload images to Cloudinary
3. Copy URL to use in products
4. Media is tracked in database

## 📝 Next Steps

See [ADMIN_PANEL_INTEGRATION.md](./ADMIN_PANEL_INTEGRATION.md) for:
- Remaining admin pages to create
- Form components to build
- How to connect frontend to backend APIs
- Complete feature list

## 🚀 Deployment

### Backend (Separate Repository)
1. Move Backend folder to separate repo
2. Deploy to Heroku, Railway, or DigitalOcean
3. Update MONGODB_URI to production database
4. Set strong JWT_SECRET
5. Configure CORS for production domain

### Frontend
1. Deploy to Vercel (recommended for Next.js)
2. Set `NEXT_PUBLIC_API_URL` to production backend URL
3. Configure domain and SSL

## 📞 Support

For issues or questions:
1. Check [ADMIN_PANEL_INTEGRATION.md](./ADMIN_PANEL_INTEGRATION.md)
2. Review backend logs
3. Check browser console for frontend errors

---

**Happy coding! 🎉**
