#!/usr/bin/env node

/**
 * SFITBot Setup Test Script
 * Run this to verify your setup is correct
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 SFITBot Setup Test\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Make sure you\'re in the sfit-chatbot directory.');
  process.exit(1);
}

// Check package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
console.log('✅ package.json found');

// Check key files
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'tailwind.config.js',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'vercel.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check environment file
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('VITE_OPENAI_API_KEY=') && !envContent.includes('your_openai_api_key_here')) {
    console.log('✅ OpenAI API key appears to be configured');
  } else {
    console.log('⚠️  OpenAI API key needs to be configured in .env');
  }
} else if (fs.existsSync(envExamplePath)) {
  console.log('⚠️  .env file not found, but env.example exists');
  console.log('   Copy env.example to .env and add your OpenAI API key');
} else {
  console.log('❌ No environment configuration found');
}

// Check node_modules
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules found (dependencies installed)');
} else {
  console.log('❌ node_modules not found - run "npm install"');
}

console.log('\n📋 Next Steps:');
console.log('1. If any files are missing, check your project structure');
console.log('2. Run "npm install" to install dependencies');
console.log('3. Copy env.example to .env and add your OpenAI API key');
console.log('4. Run "npm run dev" to start development server');
console.log('5. Run "npm run build" to test production build');

if (allFilesExist) {
  console.log('\n🎉 Setup looks good! You\'re ready to develop SFITBot.');
} else {
  console.log('\n⚠️  Some files are missing. Please check the project structure.');
  process.exit(1);
}
