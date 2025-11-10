@echo off
cd backend
start cmd /k "npm run dev"
cd ..
cd next-write
start cmd /k "npm run dev"