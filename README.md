
# Ecommerce - Retail Commerce Website

It is a full-stack retail commerce platform designed to provide a seamless online shopping experience. The website is built using modern technologies like ReactJS, Node.JS, MongoDB and TailWind.

## Ecommerce
- **Product Browsing**: Users can easily explore products categorized for quick navigation.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Optimized for all devices, providing a smooth user experience on mobile, tablet, and desktop.
- **Fast & Scalable**: Built with Node.JS for get the product details by uisng API's as backend and ReactJS for frontend ensuring high performance and scalability.

## Tech Stack
- **Node.js**: Backend of the application, enabling server-side rendering and API routes for optimized performance.
- **ReactJS**: Frontend of the application, used to style and build the user interface of the website.
- **MongoDB**: NoSQL database used to store all product, user, and order-related data.

## Setup & Installation

### Prerequisites
1. **Node.js** must be installed.
- Download and Install Node.js
- Go to the official Node.js website: https://nodejs.org/
- Download and install the LTS (Long-Term Support) version.
  
### 1. Clone the repository:

```bash
git clone https://github.com/raagvitech/ecommerce.git
```

### 2. Change the repositary from main to  master remote repository at the bottom left corner from the VS code.

### 3. Navigate to the project directory:

```bash
cd ecommerce
```

### 4. Install dependencies:

```bash
npm install
```

### 5. Set up Database 

- Install Mongoose -> MongoDB Shell Download
- Then Connect with localhost
- Create new DB with Name is “ecommerce” and collection name “users”
- Then import Collection Data that I shared in specific Collection.
  [ecommerce.users.json](https://github.com/user-attachments/files/18865549/ecommerce.users.json)

  
  [ecommerce.products.json](https://github.com/user-attachments/files/18865552/ecommerce.products.json)

  
  [ecommerce.orders.json](https://github.com/user-attachments/files/18865554/ecommerce.orders.json)

  
  [ecommerce.categories.json](https://github.com/user-attachments/files/18865553/ecommerce.categories.json)



Note : Backend and Frontend Project should at a time because we are using localhost connect between backend and frontend.

### 6. Run the development server:

```bash
npm run dev
```


