**Product Management Backend API**

This repository contains the solution for a Backend Developer Coding Test. The task was to build a Product Management System using Node.js, Express, JWT Authentication, and MongoDB.
**Features**

Authentication & Authorization:
User login with JWT token generation (POST /auth/login).
Role-based authorization for admin-protected routes.

Product Management:
POST /products: Add new products (admin only).
GET /products: Retrieve all products with pagination (10 per page).
GET /products/:id: Retrieve a product by its ID.
PUT /products/:id: Update product details (admin only).
DELETE /products/:id: Delete a product (admin only).

Input Validation:
Used Express Validator for validating inputs:
productModel,categoryModel and also userModel (find it as a middelware validation)

Database:
Used MongoDB to store product data.
product schema example:
{
  "name": "Sample Product",
  "category": "Electronics",
  "price": 100,
  "quantity": 50,
  "createdAt": "2023-12-01T00:00:00.000Z",
  "updatedAt": "2023-12-01T00:00:00.000Z"
}


**how to run the project**
1-Clone the repository:git clone https://github.com/salmahammad436/productManagement-backend.git
2-npm install
3-Create a .env file and configure the following variables:
PORT=3000
DB_URL=mongodb://localhost:27017 (you can use your localhost db)
SECRET_KEY=PRODUCTSMANAGEMNETNEWYCORP

4-Start the server:
npm start

Usage:
Test the endpoints using tools like Postman.
Ensure to include a valid JWT token in the Authorization header for protected routes.



# you can find challengeTwo in the same repo in challengeTwo folder