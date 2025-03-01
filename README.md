# Sales Management Application

A robust Node.js-based sales management system with real-time order tracking, customer management, and SKU handling capabilities.

## Deployed Link
   
   https://salesapp-mc98.onrender.com/
   
## How to Use 

   User (Salesperson): The user can sign up and then log in using the authentication APIs. After logging in, they will be able to create customers, orders, and SKUs. They can create SKUs and retrieve all the SKUs they have created. Similarly, they can create customers and view only those they have created. After that, they can create an order with all the customers and SKUs they have created, which will be dynamically displayed to them. After creation, they will be able to see the most recent order updates as well.

   Admin: An admin can be assigned through a manual change in MongoDB Atlas. After that, they will have access to all the orders stored in the database, receive instant notifications through WebSockets for orders made, and receive hourly updates. They can either use the API to display hourly updates at regular intervals of one hour or utilize the socket client for periodic summary notifications.The admin credentials are provided below : 

## Default Admin Access

For initial system access, use the following admin credentials:

```json
{
"username": "admin",
"password": "1234"
}
```

## Features

- **Authentication System**
  - User registration and login
  - Role-based access control (Admin/User)
  - JWT-based authentication

- **Real-time Updates**
  - Live order notifications using Socket.IO to Admins
  - Hourly sales summaries to admins
  - Real-time dashboard updates 

- **Order Management**
  - Create and track orders
  - Automatic order ID generation
  - Tax calculation based on SKU rates
  - Order history viewing

- **Customer Management**
  - Customer creation and management
  - Address tracking
  - Customer-specific order history

- **SKU Management**
  - Create and manage SKUs
  - 
  - User-specific SKU catalogs

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Scheduling**: node-cron for automated tasks

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:

## API Documentation

### Authentication Endpoints

#### Register User
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "message": "User already exists"
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "JWT_TOKEN",
    "role": "user|admin"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

### Customer Endpoints

#### Create Customer
- **URL**: `/api/customers`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Body**:
  ```json
  {
    "name": "string",
    "address": "string"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "Customer created successfully",
    "customer": {
      "name": "string",
      "address": "string",
      "createdBy": "user_id",
      "createdAt": "timestamp"
    }
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "message": "Customer with this name and address already exists"
  }
  ```

#### Get All Customers
- **URL**: `/api/customers`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  [
    {
      "name": "string",
      "address": "string",
      "createdBy": "user_id",
      "createdAt": "timestamp"
    }
  ]
  ```

### SKU Endpoints

#### Create SKU
- **URL**: `/api/skus`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Body**:
  ```json
  {
    "sku_name": "string",
    "unit_of_measurement": "string",
    "tax_rate": "number"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "sku_name": "string",
    "unit_of_measurement": "string",
    "tax_rate": "number",
    "createdBy": "user_id",
    "createdAt": "timestamp"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "message": "SKU with this name already exists for the user"
  }
  ```

#### Get All SKUs
- **URL**: `/api/skus`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  [
    {
      "sku_name": "string",
      "unit_of_measurement": "string",
      "tax_rate": "number",
      "createdBy": "user_id",
      "createdAt": "timestamp"
    }
  ]
  ```

### Order Endpoints

#### Create Order
- **URL**: `/api/orders`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Body**:
  ```json
  {
    "customer_id": "string",
    "sku_id": "string",
    "quantity": "number",
    "rate": "number"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "order_id": "string",
    "customer": "customer_id",
    "sku": "sku_id",
    "quantity": "number",
    "rate": "number",
    "total_amount": "number",
    "createdBy": "user_id",
    "createdAt": "timestamp"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "message": "An order with this customer and SKU already exists for this user"
  }
  ```

#### Get All Orders (Admin Only)
- **URL**: `/api/orders`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Authorization**: Admin only
- **Success Response**: `200 OK`
  ```json
  [
    {
      "order_id": "string",
      "customer": {
        "name": "string",
        "address": "string"
      },
      "sku": {
        "sku_name": "string",
        "unit_of_measurement": "string"
      },
      "quantity": "number",
      "rate": "number",
      "total_amount": "number",
      "createdAt": "timestamp"
    }
  ]
  ```

#### Get User Orders
- **URL**: `/api/orders/order`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Success Response**: `200 OK`
  ```json
  [
    {
      "order_id": "string",
      "customer": "customer_id",
      "sku": "sku_id",
      "quantity": "number",
      "rate": "number",
      "total_amount": "number",
      "createdAt": "timestamp"
    }
  ]
  ```

#### Get Order Summary
- **URL**: `/api/orders/summary`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Authorization**: Admin only
- **Success Response**: `200 OK`
  ```json
  {
    "total_orders": "number",
    "total_amount": "number",
    "timestamp": "date"
  }
  ```

### Authentication

All protected endpoints require a Bearer token in the Authorization header: 


## Socket.IO Client Implementation

To receive real-time updates from the server, you can implement the Socket.IO client as follows:

### Basic Socket Connection

```json

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("new_order", (data) => {
  console.log("New order notification:", data);
});

socket.on('hourly_summary', (data) => {
  console.log('Hourly summary:', data);
});


socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

```