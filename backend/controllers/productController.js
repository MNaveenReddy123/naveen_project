const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isSecondHand: false } // Only get available products
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buy a product (move to second-hand marketplace)
exports.buyProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      // Move product to second-hand market
      await product.update({ isSecondHand: true });
      res.status(200).json({ message: `Product ${product.name} is now in the second-hand marketplace` });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a product to the second-hand marketplace (optional)
exports.addToSecondHandMarket = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product && !product.isSecondHand) {
      // Add to second-hand market
      await product.update({ isSecondHand: true });
      res.status(200).json({ message: `Product ${product.name} added to second-hand market` });
    } else {
      res.status(404).json({ message: 'Product not found or already second-hand' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
