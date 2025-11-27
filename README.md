AssetMaster

A simple Asset Management System built with the PERN stack (PostgreSQL, Express, React, Node.js). This application allows you to track hardware, software, and furniture assets with full Create, Read, Update, and Delete (CRUD) capabilities.

Features

Manage Assets: Add new assets, update details, or delete records.

Search: Filter assets by name or category instantly.

Database: Persistent storage using PostgreSQL.

Responsive UI: Clean interface built with React and Tailwind CSS.

Tech Stack

Frontend: React (Vite), Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL, Sequelize ORM

Quick Start

1. Database

Create a PostgreSQL database named asset_manager_db.

2. Backend (Server)

Navigate to the server folder, install dependencies, and start the app.

Note: Create a .env file with your DB credentials first (see server/server.js for required variables).

cd server
npm install
npm run dev


3. Frontend (Client)

Open a new terminal, navigate to the client folder, and start the UI.

cd client
npm install
npm run dev


The app will run at http://localhost:5173.
