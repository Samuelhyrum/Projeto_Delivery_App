import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
// jwt não funciona no navegador, se usar a aplicação quebra.
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MIN_CHAR_PASSWORD = 6;
const MIN_CHAR_NAME = 12;

export default function AdminManage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [disabled, setDisabled] = useState(true);
  const [registerFailed, setRegisterFailed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const requireAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token || user.role !== 'administrator') {
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
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/users');
        const nonAdminUsers = data.filter((u) => u.role !== 'administrator');
        setUsers(nonAdminUsers);
      } catch (e) {
        console.error(e);
      }
    };
    getAllUsers();
    const regex = /\S+@\S+\.\S+/;

    const validateEmail = () => regex.test(email);
    const validatePassword = () => password.length >= MIN_CHAR_PASSWORD;
    const validateName = () => name.length >= MIN_CHAR_NAME;

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isNameValid = validateName();

    if (isEmailValid && isPasswordValid && isNameValid) return setDisabled(false);
    return setDisabled(true);
  }, [name, email, password, users, history]);

  const handleChange = ({ target }) => {
    setRegisterFailed(false);
    const { value, type, name: nameElement } = target;
    if (type === 'email') setEmail(value);
    if (type === 'text') setName(value);
    if (type === 'password') setPassword(value);
    if (nameElement === 'select') setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password, role };
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:3001/users/admin', data, {
        headers: {
          Authorization: token,
        },
      });
    } catch (er) {
      console.error(er);
      setRegisterFailed(true);
    }
  };

  const handleRemotion = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
    } catch (er) {
      console.error(er);
    }
  };

  const allTds = users.map((u, index) => (
    <tr key={ index }>
      <td
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        { index === 0 ? 1 : index + 1 }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        { u.name }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        { u.email }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        { u.role }
      </td>
      <td>
        <button
          onClick={ () => handleRemotion(u.id) }
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
          type="button"
        >
          Excluir
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        Nome
        <input
          data-testid="admin_manage__input-name"
          type="text"
          value={ name }
          onChange={ (event) => handleChange(event) }
        />
        Email
        <input
          data-testid="admin_manage__input-email"
          type="email"
          value={ email }
          onChange={ (event) => handleChange(event) }
        />
        Senha
        <input
          data-testid="admin_manage__input-password"
          type="password"
          value={ password }
          onChange={ (event) => handleChange(event) }
        />
        <select
          data-testid="admin_manage__select-role"
          name="select"
          onChange={ (event) => handleChange(event) }
        >
          <option value="seller">vendedor</option>
          <option value="customer">cliente</option>
          <option value="administrator">administrador</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          disabled={ disabled }
        >
          CADASTRAR
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { allTds }
        </tbody>
      </table>
      { registerFailed && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          Usuário não registrado!
        </p>) }
    </div>
  );
}
