"use client"; // Enables client-side rendering

import { useState, useEffect } from "react";

// Define the product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  is_secondhand: boolean;
};

const MarketPlace = () => {
  const [credits, setCredits] = useState(1000); // User's credits
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [secondHandMarket, setSecondHandMarket] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setAvailableProducts(data.filter((product: Product) => !product.is_secondhand));
      setSecondHandMarket(data.filter((product: Product) => product.is_secondhand));
    };

    fetchProducts();
  }, []);

  // Handle buying a product
  const handleBuy = (productId: number) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (product && credits >= product.price) {
      setCredits(credits - product.price);
      setAvailableProducts(availableProducts.filter((p) => p.id !== productId));

      // After buying, ask if the user wants to list it in the second-hand market
      const confirmMoveToSecondHand = window.confirm("Do you want to list this product in the second-hand market?");
      if (confirmMoveToSecondHand) {
        // Move to the second-hand market in the backend
        fetch(`http://localhost:5000/api/products/${productId}/secondhand`, {
          method: "PUT",
        })
          .then((res) => res.json())
          .then(() => {
            setSecondHandMarket([...secondHandMarket, product]);
          });
      }
      alert(`You bought ${product.name}!`);
    } else {
      alert("Not enough credits!");
    }
  };

  // Filter products based on the search query
  const filteredProducts = availableProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Marketplace</h1>
      <p className="mb-4 text-lg text-gray-600">Available Credits: {credits}</p>

      {/* Search Bar */}
      <div className="mb-6">
  <input
    type="text"
    placeholder="Search for products..."
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ color: "black" }} // Ensures the text is black
  />
</div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{product.name}</h2>
            <p className="text-lg font-medium text-gray-500 mb-4">
              Price: <span className="text-green-600">{product.price} credits</span>
            </p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handleBuy(product.id)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Second-Hand Market */}
      <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Your Second-Hand MarketPlace </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secondHandMarket.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>Price: {product.price} credits</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
