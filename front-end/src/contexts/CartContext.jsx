import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setCartItems(cart);
    }
  }, []);

  const handleAddToCart = (product, quantity) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (quantity <= 0) {
      // Se a quantidade é menor ou igual a zero, remove o item do carrinho
      const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } else if (itemIndex >= 0) {
      // Se o item já existe no carrinho, atualiza a quantidade
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity = quantity;
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } else {
      // Se o item não existe no carrinho, adiciona o item com a quantidade informada
      const newCartItem = { ...product, quantity };
      const updatedCartItems = [...cartItems, newCartItem];
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
  };

  const getTotalPrice = () => {
    const result = cartItems
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    return result.toFixed(2);
  };

  const contextValue = useMemo(() => ({
    cartItems,
    handleAddToCart,
    totalPrice: getTotalPrice(),
  }), [cartItems, handleAddToCart]);

  return (
    <CartContext.Provider value={ contextValue }>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
