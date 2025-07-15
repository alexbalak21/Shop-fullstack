const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

// Enable CORS with specific options
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Request logging
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Set default middlewares (logger, static, cors, etc.)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).jsonp({ error: 'Something went wrong!' });
});

// Mock JWT secret
const JWT_SECRET = 'your-secret-key';

// Custom routes
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db.getState();
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.jsonp({
      success: true,
      token,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(401).jsonp({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

server.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const db = router.db.getState();
  
  if (db.users.some(u => u.email === email)) {
    return res.status(400).jsonp({
      success: false,
      message: 'User already exists'
    });
  }
  
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
    cart: []
  };
  
  db.users.push(newUser);
  router.db.write();
  
  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
  
  res.jsonp({
    success: true,
    token,
    name: newUser.name,
    email: newUser.email
  });
});

// Mock authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['auth-token'];
  if (!token) return res.sendStatus(401);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

// Cart endpoints
server.post('/addtocart', authenticate, (req, res) => {
  const { itemId } = req.body;
  const db = router.db.getState();
  const user = db.users.find(u => u.id === req.user.id);
  
  if (user) {
    user.cart = user.cart || [];
    user.cart.push(itemId);
    router.db.write();
    res.jsonp({ success: true, cart: user.cart });
  } else {
    res.status(404).jsonp({ success: false, message: 'User not found' });
  }
});

server.get('/getcart', authenticate, (req, res) => {
  const db = router.db.getState();
  const user = db.users.find(u => u.id === req.user.id);
  
  if (user) {
    const cartItems = user.cart.map(itemId => 
      db.products.find(p => p.id === itemId)
    ).filter(Boolean);
    
    res.jsonp({ success: true, cart: cartItems });
  } else {
    res.status(404).jsonp({ success: false, message: 'User not found' });
  }
});

// Custom routes for frontend
server.get('/allproducts', (req, res) => {
  const db = router.db.getState();
  res.jsonp(db.products);
});

server.get('/newcollections', (req, res) => {
  const db = router.db.getState();
  // Return first 4 products as new collections
  res.jsonp(db.products.slice(0, 4));
});

server.get('/popularinwomen', (req, res) => {
  const db = router.db.getState();
  // Return women's products sorted by rating
  const popular = db.products
    .filter(p => p.category === 'women')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  res.jsonp(popular);
});

// Use default router
server.use(router);

// Start server
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

server.listen(PORT, HOST, () => {
  console.log(`JSON Server is running on http://${HOST}:${PORT}`);
  console.log(`Products API: http://localhost:${PORT}/products`);
  console.log(`Single product example: http://localhost:${PORT}/products/1`);
  console.log('\nMake sure your frontend is making requests to this backend URL!');
});
