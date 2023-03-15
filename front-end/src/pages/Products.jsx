import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import '../styles/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
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
        jwtDecode(user.token);
      } catch (err) {
        console.error(err);
        history.push('/login');
      }
    };
    requireAuth();
  }, [history]);

  const checkout = () => {
    history.push('/customer/checkout');
  };

  const allProducts = products.map((p) => (
    <div key={ p.id } className="card">
      <h2 data-testid={ `customer_products__element-card-title-${p.id}` }>{p.name}</h2>
      <img
        src={ p.urlImage }
        alt="imagem do produto"
        data-testid={ `customer_products__img-card-bg-image-${p.id}` }
      />
      <p data-testid={ `customer_products__element-card-price-${p.id}` }>
        {p.price.replace('.', ',')}
      </p>
      <div className="card-btn-group">
        <button
          type="button"
          onClick={ () => handleAddToCart(p, (
            cartItems.find((i) => i.id === p.id)?.quantity || 0) + 1) }
          data-testid={ `customer_products__button-card-add-item-${p.id}` }
        >
          +
        </button>
        <input
          type="number"
          value={ cartItems.find((item) => item.id === p.id)?.quantity || 0 }
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
            cartItems.find((item) => item.id === p.id)?.quantity || 0) - 1) }
          data-testid={ `customer_products__button-card-rm-item-${p.id}` }
        >
          -
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        <Navbar />
        <div className="checkout-container">
          <button
            type="button"
            className="checkout-button"
            onClick={ () => checkout() }
            disabled={ cartItems.length < 1 }
            data-testid="customer_products__button-cart"
          >
            VER CARRINHO:
          </button>
          <button
            type="button"
            className="checkout-button"
            onClick={ () => checkout() }
            disabled={ cartItems.length < 1 }
            // não entendi o pq dos 2 botões, além disso não sei qual tem que redirecionar para rota de checkout então vou deixar nos 2 até ser descoberto posteriormente
            data-testid="customer_products__checkout-bottom-value"
          >
            { `R$ ${totalPrice.toString().replace('.', ',')}` }
          </button>
        </div>
        <div className="products-container">{ allProducts }</div>
      </div>
    </div>
  );
}
