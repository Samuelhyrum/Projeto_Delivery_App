import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const result = await axios.get('http://localhost:3001/products');
        console.log(result);
        setProducts(result.data);
      } catch (er) {
        console.log(er);
      }
    };
    getAllProducts();
  }, []);

  const allProducts = products && products.map((p) => (
    <div key={ p.id }>
      <p
        data-testid={ `customer_products__element-card-price-${p.id}` }
      >
        {p.price}
      </p>
      <img
        src={ p.urlImage }
        alt=""
        data-testid={ `customer_products__img-card-bg-image-${p.id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${p.id}` }
      >
        {p.name}
      </p>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${p.id}` }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${p.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${p.id}` }
      >
        +
      </button>
    </div>
  ));
  return (
    <div>
      <nav>
        <div data-testid="customer_products__element-navbar-link-products" />
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div
          data-testid="customer_products__element-navbar-link-logout"
        />
      </nav>
      {
        allProducts
      }
    </div>

  );
}
