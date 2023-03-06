import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const [userName, setUserName] = useState();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const { name } = userObj;
    setUserName(name);
  }, []);

  return (
    <div>
      <nav>
        <Link to="/customer/products">
          <div data-testid="customer_products__element-navbar-link-products">
            Produtos
          </div>
        </Link>

        <Link to="/customer/orders">
          <div data-testid="customer_products__element-navbar-link-orders">
            Meus Pedidos
          </div>
        </Link>

        <Link to="/customer/products">
          <div data-testid="customer_products__element-navbar-user-full-name">
            <p>{ userName }</p>
          </div>
        </Link>

        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logout() }
        >
          LOGOUT
        </button>
      </nav>
    </div>
  );
}
