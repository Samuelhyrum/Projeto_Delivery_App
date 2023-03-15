import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../styles/Register.css';

const MIN_CHAR_NAME = 12;
const MIN_CHAR_PASSWORD = 6;
const MSG_ERROR = 'Email ou nome já cadastrados!';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [registerFailed, setRegisterFailed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;

    const validateEmail = () => regex.test(email);
    const validatePassword = () => password.length >= MIN_CHAR_PASSWORD;
    const validateName = () => name.length >= MIN_CHAR_NAME;

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isNameValid = validateName();

    if (isEmailValid && isPasswordValid && isNameValid) return setDisabled(false);
    return setDisabled(true);
  }, [name, email, password]);

  const handleChange = ({ target }) => {
    setRegisterFailed(false);
    const { value, type } = target;
    if (type === 'email') return setEmail(value);
    if (type === 'password') return setPassword(value);
    return setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      const result = await axios.post('http://localhost:3001/users', data);
      const { token } = result.data;
      // decodifica o token para obter as informações necessárias
      const decodedToken = jwtDecode(token);
      const { name: nameData, email: emailData, role } = decodedToken;
      // cria o objeto com as informações do usuário e o token original
      const user = {
        name: nameData,
        email: emailData,
        role,
        token,
      };
      // salva o objeto no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/customer/products');
    } catch (er) {
      console.error(er);
      setRegisterFailed(true);
    }
  };

  return (
    <div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        Nome
        <input
          data-testid="common_register__input-name"
          type="text"
          value={ name }
          onChange={ (event) => handleChange(event) }
        />
        Email
        <input
          data-testid="common_register__input-email"
          type="email"
          value={ email }
          onChange={ (event) => handleChange(event) }
        />
        Senha
        <input
          data-testid="common_register__input-password"
          type="password"
          value={ password }
          onChange={ (event) => handleChange(event) }
        />
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ disabled }
        >
          CADASTRAR
        </button>
      </form>
      { registerFailed
      && (
        <p
          className="register-failed"
          data-testid="common_register__element-invalid_register"
        >
          {MSG_ERROR}
        </p>) }
    </div>
  );
}
