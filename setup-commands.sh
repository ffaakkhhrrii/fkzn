#!/bin/bash

# Step 1: Create Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Step 2: Install dependencies
npm install

# Step 3: Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Step 4: Initialize Tailwind CSS
npx tailwindcss init -p

# Step 5: Install React Router for navigation
npm install react-router-dom

# Step 6: Install React Router types
npm install -D @types/react-router-dom

# Step 7: Install additional utilities (optional but recommended)
npm install clsx

# Step 8: Start development server (run this after setup is complete)
# npm run dev
