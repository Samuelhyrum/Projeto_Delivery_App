import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
// jwt não funciona no navegador, se usar a aplicação quebra.
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const MIN_CHAR_PASSWORD = 6;
const TIME_MSG_ERROR = 5000;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkLogin = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.token && user.role === 'seller') {
          history.push('/seller/orders');
        }
        if (user.token && user.role === 'customer') {
          history.push('/customer/products');
        }
        if (user.token && user.role === 'administrator') {
          history.push('/admin/manage');
        }
      } catch (er) {
        console.error(er);
      }
    };
    checkLogin();
  }, [history]);

  const handleChange = ({ target }) => {
    const { value, type } = target;
    if (type === 'email') return setEmail(value);
    return setPassword(value);
  };

  const handleLoginFailed = () => {
    setLoginFailed(true);
    setTimeout(() => {
      setLoginFailed(false);
    }, TIME_MSG_ERROR);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const result = await axios.post('http://localhost:3001/login', data);
      const { token } = result.data;
      // decodifica o token para obter as informações necessárias
      const decodedToken = jwtDecode(token);
      const { name, email: emailData, role } = decodedToken;
      // cria o objeto com as informações do usuário e o token original
      const user = {
        name,
        email: emailData,
        role,
        token,
      };
      // salva o objeto no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      if (user.token && user.role === 'seller') {
        history.push('/seller/orders');
      }
      if (user.token && user.role === 'customer') {
        history.push('/customer/products');
      }
      if (user.token && user.role === 'administrator') {
        history.push('/admin/manage');
      }
    } catch (er) {
      console.error(er);
      handleLoginFailed();
    }
  };

  const handleClick = () => history.push('/register');

  useEffect(() => {
    setLoginFailed(false);
    const regex = /\S+@\S+\.\S+/;

    const validateEmail = () => regex.test(email);
    const validatePassword = () => password.length >= MIN_CHAR_PASSWORD;

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) return setDisabled(false);
    return setDisabled(true);
  }, [email, password]);

  return (
    <div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        Login
        <input
          data-testid="common_login__input-email"
          type="email"
          value={ email }
          onChange={ (event) => handleChange(event) }
        />
        Senha
        <input
          data-testid="common_login__input-password"
          type="password"
          value={ password }
          onChange={ (event) => handleChange(event) }
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ disabled }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => handleClick() }
        >
          Ainda não tenho conta
        </button>
      </form>
      { loginFailed
      && (
        <p
          className="login-failed"
          data-testid="common_login__element-invalid-email"
        >
          Email não registrado!
        </p>
      )}
    </div>
  );
}
