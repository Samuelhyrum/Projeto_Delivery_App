import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
      </nav>
    </div>
  );
}
