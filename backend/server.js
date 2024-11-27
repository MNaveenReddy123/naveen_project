const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naveen@2004",
  database: "marketplace_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as ID " + db.threadId);
});

// Create a table for products if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    is_secondhand BOOLEAN DEFAULT 0
  );
`;

db.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log("Table created or already exists");
});

// API to fetch products
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching products" });
      return;
    }
    res.json(results);
  });
});

// API to add product to the second-hand market
app.put("/api/products/:id/secondhand", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE products SET is_secondhand = 1 WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating product" });
      return;
    }
    res.json({ message: "Product added to second-hand market" });
  });
});

// API to add product
app.post("/api/products", upload.single('image'), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.path : ''; // Handle file upload
  const query = "INSERT INTO products (name, price, image) VALUES (?, ?, ?)";
  db.query(query, [name, price, image], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding product" });
      return;
    }
    res.status(201).json({ message: "Product added successfully!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
