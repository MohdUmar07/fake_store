import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (id) => {
    setSelectedProduct(id);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <Header />
      {selectedProduct ? (
        <ProductDetail productId={selectedProduct} onBack={handleBack} />
      ) : (
        <ProductsList onSelectProduct={handleSelectProduct} />
      )}
      <Footer />
    </div>
  );
}

export default App;
