# Naeem Electric Store - Admin Panel Integration

## ✅ Completed Work

### Backend Updates

#### 1. Models Updated to Match Frontend
- **Product.js**: Updated to match frontend Product interface
  - Added: `category` (string), `originalPrice`, `discountPercent`, `badge`, `badgeColor`
  - Added: `shortDescription`, `fullDescription`, `isFeatured`, `features[]`, `specifications` (Map), `reviews[]`
  - Removed: ObjectId reference to Category (now using string)
  
- **Category.js**: Updated to match frontend Category interface
  - Changed: `name` → `value` (lowercase string)
  - Added: `label`, `icon`, `order`
  
- **Media.js**: NEW model for media file management
  - Tracks uploaded files with metadata
  - Links to admin who uploaded
  - Supports tagging and search

#### 2. Controllers Enhanced
- **productController.js**: Updated all CRUD operations
- **categoryController.js**: Updated to handle new schema
- **mediaController.js**: Complete rewrite with database integration
- **adminController.js**: NEW - Full CRUD for admin management

#### 3. Routes Protected with Auth
- All admin routes now use `protect` middleware
- Admin management routes use `restrictTo('superadmin')`
- New routes added:
  - `/api/admins` - Admin CRUD operations
  - `/api/media` - Media file management with full CRUD
  - `/api/products` - Enhanced with update endpoint
  - `/api/categories` - Enhanced with includeInactive query

### Frontend Implementation

#### 1. API Infrastructure
- **API Client** (`src/lib/apiClient.ts`):
  - Centralized HTTP client with auth token management
  - Automatic token injection in headers
  - Support for FormData and JSON
  
- **API Configuration** (`src/config/api.ts`):
  - All API endpoints defined
  - Environment-based API URL configuration

#### 2. Service Layer (Complete)
- `src/services/authService.ts` - Authentication
- `src/services/productService.ts` - Product management
- `src/services/categoryService.ts` - Category management
- `src/services/mediaService.ts` - Media file management
- `src/services/adminService.ts` - Admin user management

#### 3. Auth System
- `src/contexts/AuthContext.tsx` - Global auth state
- Login/logout functionality
- Persistent sessions with localStorage
- Automatic token refresh check

#### 4. Admin Panel UI (Partial)
- **Created:**
  - `/admin/login` - Login page
  - `/admin` - Dashboard with stats
  - `/admin/products` - Products listing page
  - Admin layout with sidebar navigation
  - Protected route wrapper

## 🚧 Remaining Admin Pages to Create

You need to create these pages to complete the admin panel:

### 1. Product Form Pages
```typescript
// src/app/admin/products/new/page.tsx
// - Form to create new product
// - Image upload
// - Dynamic features/specifications input
// - Category dropdown

// src/app/admin/products/[id]/page.tsx
// - Edit existing product
// - Load current data
// - Same form as create
```

### 2. Category Management
```typescript
// src/app/admin/categories/page.tsx
// - List all categories
// - Inline edit for order/active status
// - Delete confirmation

// src/app/admin/categories/new/page.tsx
// - Create category form
// - Icon selector
// - Order input

// src/app/admin/categories/[id]/page.tsx
// - Edit category
```

### 3. Media Management
```typescript
// src/app/admin/media/page.tsx
// - Grid view of uploaded images
// - Upload button with drag-drop
// - Search and filter
// - Delete functionality
// - Copy URL to clipboard

// Optionally: Media picker component for products
```

### 4. Admin Management
```typescript
// src/app/admin/admins/page.tsx
// - List all admins
// - Role badges
// - Deactivate/activate users
// - Delete (only for superadmin)

// src/app/admin/admins/new/page.tsx
// - Create new admin form
// - Role selector
// - Password input

// src/app/admin/admins/[id]/page.tsx
// - Edit admin details
// - Change password
// - Role management
```

### 5. Orders Management
```typescript
// src/app/admin/orders/page.tsx
// - List all orders
// - Status filter
// - Search by order number
// - View details modal

// src/app/admin/orders/[id]/page.tsx
// - Order details
// - Update status
// - Customer info
// - Items list
```

## 🔌 Connect Frontend to Backend

### 1. Update Data Sources
Replace static data files with API calls:

**src/data/products.ts**:
```typescript
// OLD: export const products: Product[] = [...]
// NEW: Use productService.getAll() in components
```

**src/data/categories.ts**:
```typescript
// OLD: export const categories: Category[] = [...]
// NEW: Use categoryService.getAll() in components
```

### 2. Update Components to Use APIs

**Update src/components/HomePage.tsx**:
- Use `useEffect` to fetch products from API
- Replace static `products` import with `productService.getAll()`

**Update src/components/CategoryCarousel.tsx**:
- Fetch categories from API: `categoryService.getAll()`

**Update src/app/products/page.tsx**:
- Load products via API
- Implement filters with API params

**Update src/app/products/[id]/page.tsx**:
- Fetch single product: `productService.getById(id)`

### 3. Add Environment Variable
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Update Layout to Include AuthProvider
**src/app/layout.tsx**:
```typescript
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

## 🚀 How to Run

### Backend
```bash
cd Backend
npm install
# Add .env file with MongoDB URI and Cloudinary credentials
npm start
```

### Frontend
```bash
npm install
npm run dev
```

### First Admin Setup
1. Use backend auth routes or MongoDB to create first superadmin:
```javascript
// Use Backend/utils/seedData.js or create manually
```

## 📋 Form Components Needed

Create reusable form components:

### ProductForm Component
```typescript
// src/components/admin/ProductForm.tsx
// - All product fields
// - Image upload preview
// - Dynamic features array
// - Specifications key-value pairs
// - Category select
// - Badge color picker
```

### CategoryForm Component
```typescript
// src/components/admin/CategoryForm.tsx
// - Value, label, icon
// - Description textarea
// - Order number
// - Active toggle
```

### AdminForm Component
```typescript
// src/components/admin/AdminForm.tsx
// - Username, email, password
// - Role selector
// - Active status
```

## 🔐 Security Notes

1. **Backend is protected**: All admin routes require JWT token
2. **Frontend uses HttpOnly approach**: Token stored in localStorage (consider HttpOnly cookies for production)
3. **CORS**: Update CORS settings in backend for production
4. **Superadmin protection**: Admin CRUD routes restricted to superadmin role

## 🎨 UI Components to Create

Consider creating these reusable components:

1. **DataTable** - Reusable table with sorting/filtering
2. **Modal** - For confirmations and quick views
3. **ImageUploader** - Drag-drop with preview
4. **FormField** - Standardized form inputs
5. **StatusBadge** - Color-coded status indicators
6. **LoadingSpinner** - Consistent loading states

## 📦 Dependencies to Install

```bash
# If not already installed
npm install axios # Optional: if you prefer axios over fetch
npm install react-hook-form # Form validation
npm install zod # Schema validation
npm install @headlessui/react # Accessible UI components
npm install react-hot-toast # Notifications
```

## 🗂️ File Structure Reference

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                 ✅ Dashboard
│   │   ├── login/page.tsx           ✅ Login
│   │   ├── products/
│   │   │   ├── page.tsx             ✅ List
│   │   │   ├── new/page.tsx         ⚠️ TODO
│   │   │   └── [id]/page.tsx        ⚠️ TODO
│   │   ├── categories/
│   │   │   ├── page.tsx             ⚠️ TODO
│   │   │   ├── new/page.tsx         ⚠️ TODO
│   │   │   └── [id]/page.tsx        ⚠️ TODO
│   │   ├── media/
│   │   │   └── page.tsx             ⚠️ TODO
│   │   ├── orders/
│   │   │   ├── page.tsx             ⚠️ TODO
│   │   │   └── [id]/page.tsx        ⚠️ TODO
│   │   └── admins/
│   │       ├── page.tsx             ⚠️ TODO
│   │       ├── new/page.tsx         ⚠️ TODO
│   │       └── [id]/page.tsx        ⚠️ TODO
├── components/
│   └── admin/
│       ├── AdminLayout.tsx          ✅ Sidebar layout
│       ├── ProtectedRoute.tsx       ✅ Auth guard
│       ├── ProductForm.tsx          ⚠️ TODO
│       ├── CategoryForm.tsx         ⚠️ TODO
│       ├── AdminForm.tsx            ⚠️ TODO
│       └── MediaGrid.tsx            ⚠️ TODO
├── config/
│   └── api.ts                       ✅ API config
├── contexts/
│   ├── AuthContext.tsx              ✅ Auth state
│   └── CartContext.tsx              ✅ Existing
├── lib/
│   └── apiClient.ts                 ✅ HTTP client
├── services/
│   ├── authService.ts               ✅ Complete
│   ├── productService.ts            ✅ Complete
│   ├── categoryService.ts           ✅ Complete
│   ├── mediaService.ts              ✅ Complete
│   └── adminService.ts              ✅ Complete
└── types/
    └── index.ts                     ✅ Updated
```

## 🔄 Next Steps

1. **Create remaining admin pages** (products/new, categories, media, admins)
2. **Update HomePage and other public pages** to fetch from API instead of static data
3. **Test authentication flow** end-to-end
4. **Add form validation** using react-hook-form + zod
5. **Add toast notifications** for success/error messages
6. **Test CRUD operations** for all resources
7. **Deploy backend** separately as planned

## ✨ Features Summary

### Backend API Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/products` - List products (public)
- `POST /api/products` - Create product (auth)
- `PUT /api/products/:id` - Update product (auth)
- `DELETE /api/products/:id` - Delete product (auth)
- `GET /api/categories` - List categories (public)
- `POST /api/categories` - Create category (auth)
- `PUT /api/categories/:id` - Update category (auth)
- `DELETE /api/categories/:id` - Delete category (auth)
- `GET /api/media` - List media (auth)
- `POST /api/media` - Upload media (auth)
- `DELETE /api/media/:id` - Delete media (auth)
- `GET /api/admins` - List admins (superadmin)
- `POST /api/admins` - Create admin (superadmin)
- `PUT /api/admins/:id` - Update admin (superadmin)
- `DELETE /api/admins/:id` - Delete admin (superadmin)

All admin routes protected with JWT authentication!
