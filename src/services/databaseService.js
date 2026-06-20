import * as SQLite from 'expo-sqlite';

let db = null;

const DatabaseService = {
  async init() {
    if (db) return; // ya inicializado, no repetir
    db = await SQLite.openDatabaseAsync('naturapp.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        quantity INTEGER DEFAULT 1
      );
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        added_date TEXT DEFAULT (datetime('now'))
      );
    `);
  },

  async getDB() {
    if (!db) await this.init();
    return db;
  },

  async addToCart(product) {
    const database = await this.getDB();
    const result = await database.runAsync(
      `INSERT OR REPLACE INTO cart
       (product_id, name, price, image, quantity)
       VALUES (?, ?, ?, ?,
         COALESCE((SELECT quantity + 1 FROM cart WHERE product_id = ?), 1))`,
      [product.id, product.name, product.price, product.image, product.id]
    );
    return result.lastInsertRowId;
  },

  async getCartItems() {
    const database = await this.getDB();
    return await database.getAllAsync('SELECT * FROM cart ORDER BY id DESC');
  },

  async updateCartQuantity(productId, quantity) {
    if (quantity <= 0) return this.removeFromCart(productId);
    const database = await this.getDB();
    await database.runAsync(
      'UPDATE cart SET quantity = ? WHERE product_id = ?',
      [quantity, productId]
    );
  },

  async removeFromCart(productId) {
    const database = await this.getDB();
    await database.runAsync('DELETE FROM cart WHERE product_id = ?', [productId]);
  },

  async getCartTotal() {
    const database = await this.getDB();
    const result = await database.getFirstAsync(
      'SELECT SUM(price * quantity) as total FROM cart'
    );
    return result?.total || 0;
  },

  async clearCart() {
    const database = await this.getDB();
    await database.runAsync('DELETE FROM cart');
  },

  async getCartCount() {
    const database = await this.getDB();
    const result = await database.getFirstAsync(
      'SELECT SUM(quantity) as count FROM cart'
    );
    return result?.count || 0;
  },

  async addFavorite(product) {
    const database = await this.getDB();
    await database.runAsync(
      `INSERT OR IGNORE INTO favorites (product_id, name, price, image) VALUES (?, ?, ?, ?)`,
      [product.id, product.name, product.price, product.image]
    );
  },

  async removeFavorite(productId) {
    const database = await this.getDB();
    await database.runAsync('DELETE FROM favorites WHERE product_id = ?', [productId]);
  },

  async isFavorite(productId) {
    const database = await this.getDB();
    const row = await database.getFirstAsync(
      'SELECT id FROM favorites WHERE product_id = ?', [productId]
    );
    return !!row;
  },

  async getFavorites() {
    const database = await this.getDB();
    return await database.getAllAsync('SELECT * FROM favorites ORDER BY added_date DESC');
  },
};

export default DatabaseService;