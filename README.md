 G-SCORES PROJECT — SETUP GUIDE

1.  Tạo Database MySQL

Mở Terminal hoặc MySQL Workbench và chạy lệnh:

    CREATE DATABASE g_scores 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

2.  Cài đặt và chạy Backend (g-scores-backend)

➤ Di chuyển vào thư mục backend

    cd g-scores-backend

➤ (Chỉ chạy lần đầu) Cài đặt các dependencies

    npm install

➤ (Chỉ chạy lần đầu) Chạy migration để tạo bảng

    npx sequelize-cli db:migrate

➤ (Chỉ chạy lần đầu) Chạy seeder để insert dữ liệu từ CSV

    npx sequelize-cli db:seed:all

➤ Khởi chạy backend

    npm run dev

Backend mặc định chạy tại: http://localhost:3000
Có thể kiểm tra API tại: http://localhost:3000/api-docs

3.  Chạy Frontend (g-scores-frontend)

➤ Di chuyển vào thư mục frontend

    cd g-scores-frontend

➤ (Chỉ chạy lần đầu) Cài đặt các dependencies

    npm install

➤ Chạy frontend

    npm run dev

Frontend mặc định chạy tại: http://localhost:5173
