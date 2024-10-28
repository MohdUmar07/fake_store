import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './ContextCart'; 

const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    }
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  
  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <button onClick={onBack}>Back</button>

      <button onClick={handleAddToCart} className="addtocart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
