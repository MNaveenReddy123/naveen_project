const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to buy a product
router.post('/buy', productController.buyProduct);

// Route to add a second-hand product
router.post('/second-hand', productController.addToSecondHandMarket);

module.exports = router;
