import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Checkout() {
  const { cartItems, totalPrice, handleAddToCart } = useContext(CartContext);

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
        { p.qty }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { p.price.toString().replace('.', ',') }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { (parseFloat(p.price) * p.qty).toFixed(2).toString().replace('.', ',') }
      </td>
      <td>
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
      <table>
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
      </table>
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalPrice.toString().replace('.', ',') }
      </div>
      <form>
        Detalhe e Endereço para Entrega
        <label htmlFor="customer_checkout__select-seller">
          P. Vendedora Responsável
          <select data-testid="customer_checkout__select-seller">
            texto pra lint n reclamar
          </select>
        </label>
        <input type="text" data-testid="customer_checkout__input-address" />
        <input type="number" data-testid="customer_checkout__input-address-number" />
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
