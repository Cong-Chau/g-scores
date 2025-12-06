🚀 G-SCORES PROJECT — SETUP GUIDE

1. 🗄️ Tạo Database MySQL

Mở Terminal hoặc MySQL Workbench và chạy lệnh:

    CREATE DATABASE g_scores 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

2. ⚙️ Cài đặt và chạy Backend (g-scores-backend)

➤ Di chuyển vào thư mục backend

    cd g-scores-backend

➤ Chạy migration để tạo bảng

    npx sequelize-cli db:migrate

➤ Chạy seeder để insert dữ liệu từ CSV

    npx sequelize-cli db:seed:all

➤ Khởi chạy backend

    npm run dev

Backend mặc định chạy tại: http://localhost:3000

3. 🎨 Chạy Frontend (g-scores-frontend)

➤ Di chuyển vào thư mục frontend

    cd g-scores-frontend

➤ Chạy frontend

    npm run dev

Frontend mặc định chạy tại: http://localhost:5173
