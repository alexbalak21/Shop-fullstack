# E-commerce App Testing Guide with Mock Data

This guide will walk you through testing the e-commerce application using the mock backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git (optional, for version control)

## Getting Started

### 1. Clone the Repository (if not already done)
```bash
git clone <repository-url>
cd Shop-fullstack
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd mock-backend
npm install
```

#### Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Starting the Servers

### 1. Start the Mock Backend
```bash
# In the mock-backend directory
npm start
```

Expected output:
```
JSON Server is running on http://0.0.0.0:4000
Products API: http://localhost:4000/products
Single product example: http://localhost:4000/products/1
```

### 2. Start the Frontend
```bash
# In the frontend directory
npm start
```

The application should automatically open in your default browser at `http://localhost:3000`.

## Testing the Application

### Available Test Data

#### Product Categories
- **Men's** (3 products)
- **Women's** (3 products)
- **Kids** (3 products)

### API Endpoints

#### Products
- `GET /products` - Get all products
- `GET /products?category=men` - Filter by category (men, women, kid)
- `GET /products/1` - Get single product by ID
- `POST /addtocart` - Add item to cart (requires authentication)
- `GET /getcart` - Get cart items (requires authentication)

#### Authentication
- `POST /login` - User login
- `POST /signup` - User registration

### Testing Scenarios

#### 1. Browse Products
1. Open the homepage (`http://localhost:3000`)
2. Navigate through different categories
3. Verify products are displayed with images and prices

#### 2. View Product Details
1. Click on any product
2. Verify all product information is displayed:
   - Product images
   - Title and description
   - Price and discount (if any)
   - Available sizes and colors
   - Product details and specifications
   - Related products

#### 3. Test Search Functionality
1. Use the search bar to find products
2. Verify search results match the query

#### 4. Test Filtering and Sorting
1. Apply different filters (category, price range, etc.)
2. Sort products by price, popularity, etc.
3. Verify results update accordingly

#### 5. Test User Authentication
1. Click on "Login"
2. Use test credentials or register a new account
3. Verify successful login and session persistence

#### 6. Test Shopping Cart
1. Add products to cart
2. View cart to verify items are added
3. Update quantities
4. Remove items
5. Proceed to checkout (if implemented)

#### 7. Test Responsive Design
1. Resize the browser window
2. Test on different devices or use browser's device emulation
3. Verify all elements are properly displayed and functional

## Testing API Endpoints Directly

You can test the API endpoints directly using tools like Postman, curl, or your browser:

### Get All Products
```bash
curl http://localhost:4000/products
```

### Get Single Product
```bash
curl http://localhost:4000/products/1
```

### Filter Products by Category
```bash
curl "http://localhost:4000/products?category=men"
```

### Add to Cart (requires authentication)
```bash
curl -X POST http://localhost:4000/addtocart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId": 1, "quantity": 1}'
```

## Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if port 4000 is available
   - Verify all dependencies are installed
   - Check the console for error messages

2. **Frontend not connecting to backend**
   - Ensure the backend is running
   - Check the API URL in frontend configuration
   - Look for CORS errors in the browser console

3. **Images not loading**
   - Check image URLs in the console
   - Verify image paths in the mock data
   - Ensure the images are accessible via the provided URLs

## Mock Data Structure

The mock data includes the following fields for each product:

```json
{
  "id": 1,
  "name": "Product Name",
  "category": "men|women|kid",
  "image": "main-image-url.jpg",
  "images": ["image1.jpg", "image2.jpg"],
  "new_price": 49.99,
  "old_price": 69.99,
  "description": "Detailed product description",
  "sizes": ["S", "M", "L"],
  "colors": ["Red", "Blue"],
  "stock": 20,
  "rating": 4.5,
  "reviews": 128,
  "tags": ["tag1", "tag2"],
  "details": ["Detail 1", "Detail 2"]
}
```

## Conclusion

This testing guide covers the essential scenarios to verify the application's functionality with mock data. For more comprehensive testing, consider adding unit tests, integration tests, and end-to-end tests using frameworks like Jest, React Testing Library, or Cypress.
