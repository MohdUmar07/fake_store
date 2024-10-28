import React, { useEffect, useState } from 'react';

const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    }
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ProductDetail;
