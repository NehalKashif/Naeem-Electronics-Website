#!/usr/bin/env node

/**
 * Project Setup Checker
 * Run this to verify your environment is ready
 * 
 * Usage: node check-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Naeem Electric Store Setup...\n');

let hasErrors = false;
const checks = [];

// Check if Backend folder exists
const checkBackend = fs.existsSync(path.join(__dirname, 'Backend'));
checks.push({
  name: 'Backend folder',
  status: checkBackend,
  message: checkBackend ? '✅ Found' : '❌ Missing Backend folder'
});

// Check if Backend .env exists
const backendEnv = fs.existsSync(path.join(__dirname, 'Backend', '.env'));
checks.push({
  name: 'Backend .env',
  status: backendEnv,
  message: backendEnv ? '✅ Found' : '⚠️  Missing Backend/.env (copy from .env.example)'
});

// Check if Backend node_modules exists
const backendModules = fs.existsSync(path.join(__dirname, 'Backend', 'node_modules'));
checks.push({
  name: 'Backend dependencies',
  status: backendModules,
  message: backendModules ? '✅ Installed' : '⚠️  Run: cd Backend && npm install'
});

// Check if Frontend .env.local exists
const frontendEnv = fs.existsSync(path.join(__dirname, '.env.local'));
checks.push({
  name: 'Frontend .env.local',
  status: frontendEnv,
  message: frontendEnv ? '✅ Found' : '⚠️  Missing .env.local (copy from .env.example)'
});

// Check if Frontend node_modules exists
const frontendModules = fs.existsSync(path.join(__dirname, 'node_modules'));
checks.push({
  name: 'Frontend dependencies',
  status: frontendModules,
  message: frontendModules ? '✅ Installed' : '⚠️  Run: npm install'
});

// Check if key backend files exist
const keyFiles = [
  'Backend/models/Product.js',
  'Backend/models/Category.js',
  'Backend/models/Media.js',
  'Backend/models/Admin.js',
  'Backend/routes/adminRoutes.js',
  'Backend/controllers/adminController.js',
  'Backend/utils/createSuperadmin.js',
  'src/services/authService.ts',
  'src/services/productService.ts',
  'src/lib/apiClient.ts',
  'src/contexts/AuthContext.tsx',
  'src/app/admin/login/page.tsx',
];

keyFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  checks.push({
    name: file,
    status: exists,
    message: exists ? '✅' : '❌ Missing'
  });
});

// Print results
console.log('📋 Setup Status:\n');
checks.forEach(check => {
  console.log(`${check.message}`);
  if (!check.status) hasErrors = true;
});

console.log('\n' + '='.repeat(60) + '\n');

if (hasErrors) {
  console.log('⚠️  Some issues found. Please address them before continuing.\n');
  console.log('📖 Quick fixes:\n');
  console.log('  1. Install backend dependencies: cd Backend && npm install');
  console.log('  2. Install frontend dependencies: npm install');
  console.log('  3. Copy environment files: cp .env.example .env.local');
  console.log('  4. Copy backend env: cp Backend/.env.example Backend/.env');
  console.log('  5. Edit .env files with your credentials\n');
} else {
  console.log('✅ All checks passed!\n');
  console.log('🚀 Next steps:\n');
  console.log('  1. Start MongoDB (if using local)');
  console.log('  2. Update Backend/.env with your MongoDB URI and Cloudinary credentials');
  console.log('  3. Create superadmin: cd Backend && npm run create-admin');
  console.log('  4. Start backend: cd Backend && npm run dev');
  console.log('  5. Start frontend: npm run dev');
  console.log('  6. Login at: http://localhost:3000/admin/login\n');
}

console.log('📖 For detailed instructions, see SETUP_GUIDE.md\n');

process.exit(hasErrors ? 1 : 0);
