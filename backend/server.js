const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'data', 'db.json');
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// GET todos los productos (con filtro por categoría)
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let { products } = readDB();
  if (category) products = products.filter(p => p.category === category);
  res.json(products);
});

// GET producto por ID
app.get('/api/products/:id', (req, res) => {
  const { products } = readDB();
  const p = products.find(p => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'No encontrado' });
  res.json(p);
});

// GET búsqueda
app.get('/api/products/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const { products } = readDB();
  res.json(products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  ));
});

// GET categorías
app.get('/api/categories', (req, res) => {
  res.json(readDB().categories);
});

// POST crear pedido
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const order = {
    id: Date.now().toString(),
    ...req.body,
    status: 'pendiente',
    date: new Date().toISOString(),
  };
  db.orders.push(order);
  writeDB(db);
  res.status(201).json(order);
});

// GET historial de pedidos
app.get('/api/orders', (req, res) => {
  res.json(readDB().orders);
});

// GET pedido por ID
app.get('/api/orders/:id', (req, res) => {
  const { orders } = readDB();
  const o = orders.find(o => o.id === req.params.id);
  if (!o) return res.status(404).json({ error: 'No encontrado' });
  res.json(o);
});

// POST login (simulado)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Campos requeridos' });
  res.json({
    token: 'fake-token-123',
    user: { name: 'Usuario NaturApp', email }
  });
});

app.listen(9090, '0.0.0.0', () => {
  console.log('Backend corriendo en http://0.0.0.0:9090');
});