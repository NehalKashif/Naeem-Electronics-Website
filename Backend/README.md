# Naeem Electric Store - Backend API

Backend API for Naeem Electric e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- Cloudinary account

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials

# Create super admin
node utils/createSuperadmin.js

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## 🔧 Environment Variables

Create a `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NaeemElectric

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Authentication
JWT_SECRET=your-super-secret-random-string-min-32-chars
JWT_EXPIRE=12h
```

### How to Get Credentials

**MongoDB Atlas**:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace `<username>` and `<password>`

**Cloudinary**:
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, API Secret

**JWT Secret**:
Generate random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📁 Project Structure

```
Backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth & error handling
├── models/          # MongoDB schemas
├── routes/          # API routes
├── utils/           # Helper functions
├── lib/             # Third-party integrations
├── server.js        # Entry point
└── .env             # Environment variables
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (disabled in production)
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (auth required)
- `PUT /api/categories/:id` - Update category (auth required)
- `DELETE /api/categories/:id` - Delete category (auth required)

### Media
- `GET /api/media` - Get all media (auth required)
- `POST /api/media` - Upload image (auth required)
- `DELETE /api/media/:id` - Delete image (auth required)

### Admins (Superadmin only)
- `GET /api/admins` - Get all admins
- `POST /api/admins` - Create admin
- `PUT /api/admins/:id` - Update admin
- `DELETE /api/admins/:id` - Delete admin

## 🧪 Testing

Test all API endpoints:
```bash
node test-all-apis.js
```

## 👤 Default Admin

After running `node utils/createSuperadmin.js`:

- **Email**: `admin@naeemelectric.com`
- **Password**: `admin123`

⚠️ **Change password immediately after first login!**

## 🌐 Deployment

### Railway Deployment

1. Push to GitHub
2. Create Railway project
3. Deploy from GitHub
4. Add environment variables
5. Generate public domain

### Environment Variables in Railway

Add all variables from `.env`:
- `PORT` = `5000`
- `NODE_ENV` = `production`
- `MONGODB_URI` = Your MongoDB connection string
- `CLOUDINARY_CLOUD_NAME` = Your cloud name
- `CLOUDINARY_API_KEY` = Your API key
- `CLOUDINARY_API_SECRET` = Your API secret
- `JWT_SECRET` = Random secure string
- `JWT_EXPIRE` = `12h`

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcrypt
- CORS enabled for frontend domain
- Request validation
- Error handling middleware
- File upload restrictions

## 📦 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cloudinary` - Image hosting
- `multer` - File uploads
- `dotenv` - Environment variables
- `cors` - CORS middleware

## 🛠 Scripts

```bash
npm run dev       # Development with nodemon
npm start         # Production server
```

## 📝 API Response Format

All endpoints return JSON:

**Success**:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

**Error**:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## 📞 Support

For issues: Create GitHub issue or contact developer

## 📄 License

Educational project
