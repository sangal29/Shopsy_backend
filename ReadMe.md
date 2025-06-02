# 🛒 ShoppyGlobe Backend API

A robust RESTful API built using **Node.js**, **Express**, and **MongoDB** to power the backend of an e-commerce platform. It supports **user authentication**, **product management**, and **shopping cart functionality**.

---

## 🔗 GitHub Repository

> [https://github.com/sangal29/Shopsy_backend.git](https://github.com/sangal29/Shopsy_backend.git)

---

## ✨ Features

- **User Authentication**
  - Secure registration and login using hashed passwords with JWT-based access control.
- **Product Management**
  - Full CRUD operations: create, read, update, and delete products.
- **Cart Management**
  - Add, update, and remove individual items or entire carts.
- **Middleware Support**
  - Centralized error handling
  - Field validation
  - JWT authentication middleware
- **MongoDB Integration**
  - Stores user, product, and cart data using Mongoose.

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following are installed on your system:

- Node.js (v14 or later)
- MongoDB (local or cloud – e.g., MongoDB Atlas)

---

### 📦 Installation

1. **Clone the repository:**


git clone https://github.com/sangal29/Shopsy_backend.git
cd Shopsy_backend
Install dependencies:

npm install
Create a .env file in the root directory with the following variables:


PORT=3000
DATABASE_NAME=Backend_Assignment
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
Start the development server:


npm start
By default, the server will run on: http://localhost:3000

📡 API Endpoints
👤 Users
Method	Endpoint	Description
POST	/users/register	Register a new user
POST	/users/login	Login and get token

📦 Products
Method	Endpoint	Description
GET	/products	Get all products
GET	/products/:id	Get product by ID
POST	/products	Add a new product
PUT	/products/:id	Update product by ID
DELETE	/products/:id	Delete product by ID

🛒 Cart
Method	Endpoint	Description
GET	/cart/:id	Get all cart items for a user
GET	/cart/items/:id	Get a single cart item
POST	/cart	Add an item to the cart
PUT	/cart/items/:id	Update item quantity in the cart
DELETE	/cart/:id	Remove a single item from the cart
DELETE ALL	/cart/all/:id	Remove all items for a user from the cart

🔐 Note: All cart routes are protected and require a valid JWT token.

🧱 Project Structure
bash
Copy
Edit
Shopsy_backend/
├── config/            # Database and app configuration
├── controllers/       # Route logic (business layer)
├── middlewares/       # Error handling & auth middleware
├── models/            # Mongoose schemas/models
├── routes/            # Express route definitions
├── server.js          # Main application entry point
└── .env               # Environment variables

🔧 Tech Stack

Node.js – JavaScript runtime

Express.js – Web framework

MongoDB + Mongoose – Database and ODM

JWT – Token-based authentication

Bcrypt.js – Password encryption

Dotenv – Environment config

🧪 Testing
~
Use Thunder Client (VS Code extension) or Postman to test endpoints.

Test all routes using the sample body provided.

Make sure to add the JWT token in the Authorization tab as a Bearer Token.