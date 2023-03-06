import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DataIdStat = 'customer_order_details__element-order-details-label-delivery-status';
const DataOrdNum = 'customer_order_details__element-order-table-item-number-';
const DataUnitPr = 'customer_order_details__element-order-table-unit-price-';
const DataSubTot = 'customer_order_details__element-order-table-sub-total-';
const DataQuanti = 'customer_order_details__element-order-table-quantity-';

export default function OrderDetails() {
  const [sales, setSales] = useState([]);
  const { id: idPage } = useParams();

  useEffect(() => {
    const getSalesByUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/sales/${idPage}`);
        const dataArray = [data];
        // Itera sobre as vendas e faz uma nova requisição para obter o nome do vendedor
        const salesWithSellerName = await Promise.all(
          dataArray.map(async ({
            userId, sellerId, deliveryAddress, deliveryNumber, ...rest }) => {
            const sellerResult = await axios.get(`http://localhost:3001/users/${sellerId}`);
            const { name: sellerName } = sellerResult.data;
            return { ...rest, sellerName };
          }),
        );
        setSales(salesWithSellerName);
      } catch (er) {
        console.error(er);
      }
    };
    getSalesByUser();
  }, [idPage]);

  const allTds = sales.map((s, index) => (
    <>
      <tr key={ `${s.id}-${index}` }>
        <td
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          NÚMERO DO PEDIDO:
          { s.id }
        </td>
        <td
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend:
          { s.sellerName }
        </td>
        <td
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          DATA DO PEDIDO:
          {new Date(s.saleDate.split('T')[0])
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
        </td>
        <td
          data-testid={ `${DataIdStat}${index}` }
        >
          { s.status }
        </td>
        <td>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled
          >
            MARCAR COMO ENTREGUE
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
            data-testid={ `customer_checkout__element-order-table-name-${index2}` }
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
              <div data-testid="customer_order_details__element-order-total-price">
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
      Detalhes do Pedido
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
          { allTds }
        </tbody>
      </table>
    </div>
  );
}
