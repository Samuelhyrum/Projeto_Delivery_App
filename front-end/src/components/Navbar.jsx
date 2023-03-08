import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const [userName, setUserName] = useState();
  const [sellerUser, setSellerUser] = useState(false);
  const [customerUser, setCustomerUser] = useState(false);
  const [administratorUser, setAdministratorUser] = useState(false);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'seller') {
      setSellerUser(true);
    }
    if (user.role === 'customer') {
      setCustomerUser(true);
    }
    if (user.role === 'administrator') {
      setAdministratorUser(false);
    }
    const { name } = user;
    setUserName(name);
  }, []);

  return (
    <div>
      <nav>
        {customerUser && (
          <Link to="/customer/products">
            <div data-testid="customer_products__element-navbar-link-products">
              Produtos
            </div>
          </Link>
        )}
        {customerUser && (
          <Link to="/customer/orders">
            <div data-testid="customer_products__element-navbar-link-orders">
              Meus Pedidos
            </div>
          </Link>
        )}
        {sellerUser && (
          <Link to="/seller/orders">
            <div data-testid="customer_products__element-navbar-link-orders">
              Meus Pedidos
            </div>
          </Link>
        )}
        {administratorUser && (
          <Link to="/admin/manage">
            <div data-testid="customer_products__element-navbar-link-orders">
              GERENCIAR USUÁRIOS
            </div>
          </Link>
        )}
        <div data-testid="customer_products__element-navbar-user-full-name">
          <p>{userName}</p>
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
