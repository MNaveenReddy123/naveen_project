import React, { useState } from "react";
import "./App.css";

const App = () => {
  // Product list (admin-posted)
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 200, image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 300, image: "product3.jpg" },
  ]);

  // User's available credits
  const [credits, setCredits] = useState(1000);

  // Second-Hand Market
  const [secondHandMarket, setSecondHandMarket] = useState([]);

  // Handle buying products
  const handleBuy = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (credits >= product.price) {
      setCredits(credits - product.price);
      setProducts(products.filter((p) => p.id !== productId));
      alert(`You bought ${product.name}! Remaining credits: ${credits - product.price}`);
    } else {
      alert("Not enough credits!");
    }
  };

  // Handle reselling products
  const handleResell = (product) => {
    setSecondHandMarket([...secondHandMarket, product]);
    alert(`${product.name} added to the Second-Hand Market!`);
  };

  return (
    <div className="app">
      <h1>Marketplace</h1>
      <p>Available Credits: {credits}</p>

      <div className="product-list">
        <h2>Available Products</h2>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: {product.price} credits</p>
            <button onClick={() => handleBuy(product.id)}>Buy Now</button>
          </div>
        ))}
      </div>

      <div className="second-hand-market">
        <h2>Second-Hand Market</h2>
        {secondHandMarket.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: {product.price} credits</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
    