import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MIN_CHAR_PASSWORD = 6;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { value, type } = target;
    if (type === 'email') return setEmail(value);
    return setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const result = await axios.post('http://localhost:3001/login', data);
      console.log(result);
      setLoginFailed(false);
      history.push('/customer/products');
    } catch (er) {
      console.log(er);
      setLoginFailed(true);
    }
  };

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
        >
          Ainda não tenho conta
        </button>
      </form>
      { loginFailed
      && <p data-testid="common_login__element-invalid-email">Email não registrado!</p>}
    </div>
  );
}
