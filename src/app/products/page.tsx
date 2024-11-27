import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MarketPlace from '@/components/Marketplace';  // Assuming the path to the MarketPlace component

const Products = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <MarketPlace />
      <Footer />
    </main>
  );
};

export default Products;
