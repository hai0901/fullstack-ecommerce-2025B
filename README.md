# Neomall - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. Neomall provides a comprehensive marketplace experience for customers, vendors, and shippers with role-based access and distribution hub management.

## 🏗️ Architecture Overview

### Frontend (React + TypeScript)
- **Framework**: React with React Router for navigation
- **UI Library**: Radix UI components with custom styling
- **State Management**: Redux Toolkit for global state
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and building

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with secure cookie storage
- **File Upload**: Multer for handling image uploads
- **Security**: bcryptjs for password hashing

### Key Features
- **Multi-role System**: Customer, Vendor, and Shipper roles
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add to cart, quantity management, checkout
- **Order Management**: Order tracking, status updates, distribution hub assignment
- **User Profiles**: Role-specific profile management
- **Image Handling**: Profile pictures and product images with cloud storage
- **Search & Filtering**: Advanced product search with category and price filters
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-ecommerce-2025B
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/neomall
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

4. **Start the development servers**

   **Option 1: Manual Start (Recommended for development)**
   ```bash
   # Terminal 1 - Start Backend
   cd backend
   npm run dev

   # Terminal 2 - Start Frontend
   cd frontend
   npm run dev
   ```

   **Option 2: Automated Start (Using npm scripts)**
   
   Add this script to the root `package.json`:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
       "install-all": "npm install --prefix backend && npm install --prefix frontend"
     }
   }
   ```
   
   Then run:
   ```bash
   # Install all dependencies
   npm run install-all
   
   # Start both servers
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 👥 Test Accounts

### Customer Account
- **Username**: `testCustomer`
- **Password**: `testCustomer123!`
- **Role**: Customer
- **Features**: Browse products, add to cart, place orders, manage profile

### Vendor Account
- **Username**: `bosch`
- **Password**: `Bosch123!`
- **Role**: Vendor
- **Features**: Manage products, view sales, update business profile

### Shipper Accounts

#### Ho Chi Minh Distribution Hub
- **Username**: `testShipperHCM`
- **Password**: `testShipperHCM123!`
- **Distribution Hub**: Ho Chi Minh

#### Hanoi Distribution Hub
- **Username**: `testShipperHN`
- **Password**: `testShipperHN123!`
- **Distribution Hub**: Hanoi

#### Da Nang Distribution Hub
- **Username**: `testShipperDaNang`
- **Password**: `testShipperDaNang123!`
- **Distribution Hub**: Da Nang

**Shipper Features**: View assigned orders, update delivery status, manage distribution hub

## 🛠️ Development Scripts

### Backend Scripts
```bash
cd backend
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run seed        # Seed database with sample data
```

### Frontend Scripts
```bash
cd frontend
npm run dev         # Start Vite development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 📁 Project Structure

```
fullstack-ecommerce-2025B/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── uploads/        # File uploads
│   └── index.js        # Server entry point
├── frontend/
│   ├── app/
│   │   ├── components/ # Reusable UI components
│   │   ├── routes/     # Page components
│   │   ├── features/   # Redux slices
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Utility functions
│   ├── public/         # Static assets
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products/shop` - Get products for customers
- `GET /api/products/vendor/:username` - Get vendor products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders/hub/:hub` - Get orders by distribution hub
- `PUT /api/orders/:id` - Update order status

## 🎨 Key Features

### Customer Experience
- Browse products with advanced filtering
- Shopping cart with quantity management
- Secure checkout process
- Order tracking and history
- Profile management

### Vendor Dashboard
- Product management (CRUD operations)
- Sales analytics
- Order management
- Business profile settings

### Shipper Portal
- Distribution hub management
- Order assignment and tracking
- Delivery status updates
- Customer information access

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is part of RMIT University Vietnam's Full Stack Development course (COSC2769) - Assignment 02.

## 👨‍💻 Authors

- Le Duc Trung (s3979718)
- Nguyen Huy Anh (s3956092)

---

**Note**: This is a university project for educational purposes. Please ensure you have the necessary permissions before using this code in production environments.