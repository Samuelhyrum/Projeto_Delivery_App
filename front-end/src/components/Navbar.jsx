import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Navbar.css';

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
    <nav>
      <div className="nav-links">
        {customerUser && (
          <Link
            to="/customer/products"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Produtos
          </Link>
        )}
        {customerUser && (
          <Link
            to="/customer/orders"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Meus Pedidos
          </Link>
        )}
        {sellerUser && (
          <Link
            to="/seller/orders"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Meus Pedidos
          </Link>
        )}
        {administratorUser && (
          <Link
            to="/admin/manage"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            GERENCIAR USUÁRIOS
          </Link>
        )}
      </div>
      <div className="nav-user">{userName}</div>
      <button
        id="navbar"
        type="button"
        className="nav-logout"
        onClick={ () => logout() }
      >
        sair
      </button>
    </nav>
  );
}
