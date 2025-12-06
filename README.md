G-Scores Project — Setup Guide

1. Tạo Database MySQL

Mở terminal hoặc MySQL Workbench và chạy:

    CREATE DATABASE g_scores CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

2. Cài đặt & chạy Backend (g-scores-backend)

Bước 1: Di chuyển vào thư mục backend
cd g-scores-backend

Bước 2: Chạy migration để tạo bảng
npx sequelize-cli db:migrate

Bước 3: Seed dữ liệu từ CSV vào database
npx sequelize-cli db:seed:all

Bước 4: Run backend
npm run dev

Backend mặc định chạy tại: http://localhost:3000

3. Chạy Frontend (g-scores-frontend)

Bước 1: Di chuyển vào thư mục frontend
cd g-scores-frontend

Bước 2: Chạy frontend
npm run dev

Frontend chạy tại: http://localhost:5173
