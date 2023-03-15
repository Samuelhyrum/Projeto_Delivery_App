import Swal from 'sweetalert';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import '../styles/Checkout.css';

export default function Checkout() {
  const { cartItems, totalPrice, handleAddToCart } = useContext(CartContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [userSellers, setUserSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getUserSellers = async () => {
      try {
        const { data: allUsers } = await axios.get('http://localhost:3001/users');
        const sellers = allUsers.filter((userDb) => userDb.role === 'seller');
        setUserSellers(sellers);
      } catch (er) {
        console.error(er);
      }
    };
    getUserSellers();
  }, []);

  const handleChange = ({ target }) => {
    const { value, type, name } = target;
    if (type === 'text') setDeliveryAddress(value);
    if (type === 'number') setDeliveryNumber(value);
    if (name === 'seller') setSellerId(parseInt(value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { email, token } = user;

      const { data: allUsers } = await axios.get('http://localhost:3001/users');
      const { id: userId } = allUsers.find((userDb) => userDb.email === email);

      const copyCart = [...cartItems];
      const arrayWithoutUrlImg = copyCart.map((product) => {
        const { urlImage: _urlImage, ...objectWithoutUrlImg } = product;
        return objectWithoutUrlImg;
      });

      const data = {
        sale: {
          userId,
          sellerId: sellerId || userSellers[0].id,
          totalPrice: totalPrice.toString(),
          deliveryAddress,
          deliveryNumber,
          status: 'Pendente',
        },
        products: [...arrayWithoutUrlImg],
      };

      const { data: { id } } = await axios.post('http://localhost:3001/sales', data, {
        headers: {
          Authorization: token,
        },
      });
      history.push(`/customer/orders/${id}`);
    } catch (er) {
      console.error(er);
      Swal(`Oops! ocorreu um erro. Por favor, tente novamente mais tarde. ${er}`);
    }
  };

  const allTds = cartItems.map((p, index) => (
    <tr key={ index }>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index === 0 ? 1 : index + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { p.name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { p.quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { p.price.toString().replace('.', ',') }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { (parseFloat(p.price) * p.quantity).toFixed(2).toString().replace('.', ',') }
      </td>
      <td c>
        <button
          onClick={ () => handleAddToCart(p, 0) }
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
        >
          Remover
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Navbar />
      <h2>Informações do pedido</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { allTds }
        </tbody>
        <div
          className="price-total"
          data-testid="customer_checkout__element-order-total-price"
        >
          { `PREÇO TOTAL: ${totalPrice.toString().replace('.', ',')}` }
        </div>
      </table>
      <form
        className="card-form"
        onSubmit={ (e) => handleSubmit(e) }
      >
        <h2>Detalhe e Endereço para Entrega</h2>
        <label htmlFor="customer_checkout__select-seller">
          P. Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            onChange={ (e) => handleChange(e) }
          >
            { userSellers.map((seller, index) => (
              <option key={ index } value={ seller.id }>
                { seller.name }
              </option>
            )) }
          </select>
        </label>
        <input
          type="text"
          value={ deliveryAddress }
          onChange={ (e) => handleChange(e) }
          placeholder="rua exemplo"
          data-testid="customer_checkout__input-address"
        />
        <input
          type="number"
          placeholder="500"
          value={ deliveryNumber }
          onChange={ (e) => handleChange(e) }
          data-testid="customer_checkout__input-address-number"
        />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}
