import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DataIdStat = 'seller_order_details__element-order-details-label-delivery-status';
const DataOrdNum = 'seller_order_details__element-order-table-item-number-';
const DataUnitPr = 'seller_order_details__element-order-table-unit-price-';
const DataSubTot = 'seller_order_details__element-order-table-sub-total-';
const DataQuanti = 'seller_order_details__element-order-table-quantity-';

export default function SalesSellerDetails() {
  const [sales, setSales] = useState([]);
  const { id: idPage } = useParams();

  useEffect(() => {
    const getSaleBySeller = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/sales/${idPage}`);
        const { data } = result;
        const dataArray = [data];
        setSales(dataArray);
      } catch (er) {
        console.error(er);
      }
    };
    getSaleBySeller();
  }, []);
  console.log(sales);
  const allTds = sales.map((s, index) => (
    <>
      <tr key={ `${s.id}-${index}` }>
        <td
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          NÚMERO DO PEDIDO:
          { s.id }
        </td>
        <td
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          DATA DO PEDIDO:
          {new Date(s.saleDate.split('T')[0])
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
        </td>
        <td
          data-testid={ `${DataIdStat}` }
        >
          { s.status }
        </td>
        <td>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
          >
            PREPARAR PEDIDO
          </button>
        </td>
        <td>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled
          >
            SAIU PRA ENTREGA
          </button>
        </td>
      </tr>

      { s.products.map((p, index2) => (
        <tr key={ `${s.id}-${index2}` }>
          <td
            data-testid={ `${DataOrdNum}${index2}` }
          >
            {index2 === 0 ? 1 : index2 + 1}
          </td>
          <td
            data-testid={ `seller_order_details__element-order-table-name-${index2}` }
          >
            {p.productName}
          </td>
          <td
            data-testid={ `${DataQuanti}${index2}` }
          >
            {p.quantity}
          </td>
          <td
            data-testid={ `${DataUnitPr}${index2}` }
          >
            {p.price.toString().replace('.', ',')}
          </td>
          <td
            data-testid={ `${DataSubTot}${index2}` }
          >
            {(parseFloat(p.price) * p.quantity).toFixed(2).toString().replace('.', ',')}
          </td>
          { index2 === 0 && (
            <td>
              <div data-testid="seller_order_details__element-order-total-price">
                TOTAL:
                { s.totalPrice.toString().replace('.', ',') }
              </div>
            </td>
          )}
        </tr>
      )) }
    </>
  ));

  return (
    <div>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
        </thead>
        <tbody>
          {allTds}
        </tbody>
      </table>
    </div>
  );
}
