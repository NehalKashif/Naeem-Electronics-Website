# 🎯 Quick Reference Card

## 🚀 Common Commands

### Start Development Servers
```bash
# Backend (Terminal 1)
cd Backend && npm run dev

# Frontend (Terminal 2)  
npm run dev
```

### First-Time Setup
```bash
# 1. Install dependencies
npm install && cd Backend && npm install && cd ..

# 2. Configure environment
cp .env.example .env.local
cp Backend/.env.example Backend/.env

# 3. Create admin
cd Backend && npm run create-admin && cd ..

# 4. Start servers (see above)
```

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Admin Panel | http://localhost:3000/admin/login |
| Backend API | http://localhost:5000 |
| API Docs | http://localhost:5000 |

## 🔑 Default Credentials

**Email**: admin@naeemelectric.com  
**Password**: admin123  
⚠️ Change immediately!

## 📁 Key Files

| File | Purpose |
|------|---------|
| `Backend/.env` | Backend config |
| `.env.local` | Frontend config |
| `Backend/server.js` | API entry point |
| `src/app/layout.tsx` | Root layout |
| `src/services/*.ts` | API calls |

## 🛠️ Useful Scripts

```bash
# Backend
npm run dev          # Start with auto-reload
npm start            # Start production
npm run create-admin # Create superadmin

# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production

# Project
node check-setup.js  # Verify setup
```

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
# Verify .env has correct MONGODB_URI
# Check port 5000 is available
```

### Frontend can't connect
```bash
# Verify backend is running on 5000
# Check NEXT_PUBLIC_API_URL in .env.local
# Open browser console for errors
```

### Login fails
```bash
cd Backend
npm run create-admin
# Try again with default credentials
```

## 📊 Project Status

✅ Backend: 100% Complete  
✅ API Services: 100% Complete  
✅ Auth System: 100% Complete  
⚠️ Admin UI: 40% Complete  
⚠️ Public Site: Needs API integration

## 📖 Documentation

- `SETUP_GUIDE.md` - Full setup
- `ADMIN_PANEL_INTEGRATION.md` - Architecture  
- `PROJECT_SUMMARY.md` - Overview
- `CHECKLIST.md` - Progress tracking

## 🎯 Next Steps

1. Configure .env files
2. Start backend & create admin
3. Start frontend
4. Login to admin panel
5. Create product forms
6. Connect public site to API

## 💡 Pro Tips

- Use Postman to test API first
- Check backend console for errors
- Check browser console for frontend errors
- MongoDB must be running before backend starts
- Keep backend in separate repo for deployment

## 🆘 Need Help?

1. Check error message carefully
2. Review relevant documentation
3. Check browser/terminal console
4. Verify environment variables
5. Try restarting servers

---

**Keep this card handy! 📌**
