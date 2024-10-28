import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import ProductDetail from './ProductDetail';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleBackToCart = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>


      {selectedProduct ? (
        <ProductDetail productId={selectedProduct} onBack={handleBackToCart} />
      ) : (
        <>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h5>{item.title}</h5>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                  
                    <button onClick={() => setSelectedProduct(item.id)} className="view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h4>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h4>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
