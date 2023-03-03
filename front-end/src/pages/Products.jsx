import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const { cartItems, handleAddToCart, totalPrice } = useContext(CartContext);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const result = await axios.get('http://localhost:3001/products');
        const { data } = result;
        setProducts(data);
      } catch (er) {
        console.error(er);
      }
    };
    getAllProducts();

    const requireAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        history.push('/login');
      }
      try {
        const decodedToken = jwtDecode(user.token);
        setUserName(decodedToken.name);
      } catch (err) {
        console.error(err);
        history.push('/login');
      }
    };
    requireAuth();
  }, [history]);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const checkout = () => {
    history.push('/customer/checkout');
  };

  const allProducts = products.map((p) => (
    <div key={ p.id }>
      <p data-testid={ `customer_products__element-card-price-${p.id}` }>
        {p.price.replace('.', ',')}
      </p>
      <img
        src={ p.urlImage }
        alt="imagem do produto"
        data-testid={ `customer_products__img-card-bg-image-${p.id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${p.id}` }>{p.name}</p>
      <button
        type="button"
        onClick={ () => handleAddToCart(p, (
          cartItems.find((i) => i.id === p.id)?.qty || 0) + 1) }
        data-testid={ `customer_products__button-card-add-item-${p.id}` }
      >
        +
      </button>
      <input
        type="number"
        value={ cartItems.find((item) => item.id === p.id)?.qty || 0 }
        min="0"
        data-testid={ `customer_products__input-card-quantity-${p.id}` }
        onFocus={ (e) => e.target.select() }
        onChange={ (e) => {
          const quantity = parseInt(e.target.value, 10);
          handleAddToCart(p, quantity);
        } }
      />
      <button
        type="button"
        onClick={ () => handleAddToCart(p, (
          cartItems.find((item) => item.id === p.id)?.qty || 0) - 1) }
        data-testid={ `customer_products__button-card-rm-item-${p.id}` }
      >
        -
      </button>
    </div>
  ));

  return (
    <div>
      <nav>
        <div data-testid="customer_products__element-navbar-link-products" />
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name">
          <p>{ userName }</p>
        </div>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logout() }
        >
          LOGOUT
        </button>
        <div>
          <button
            type="button"
            onClick={ () => checkout() }
            disabled={ cartItems.length < 1 }
            // não entendi o pq dos 2 botões, além disso não sei qual tem que redirecionar para rota de checkout então vou deixar nos 2 até ser descoberto posteriormente
            data-testid="customer_products__checkout-bottom-value"
          >
            {`PREÇO TOTAL ${totalPrice.toString().replace('.', ',')}`}
          </button>
          <button
            type="button"
            disabled={ cartItems.length < 1 }
            onClick={ () => checkout() }
            data-testid="customer_products__button-cart"
          >
            { totalPrice.toString().replace('.', ',') }
          </button>
        </div>
      </nav>
      { allProducts }
    </div>
  );
}
