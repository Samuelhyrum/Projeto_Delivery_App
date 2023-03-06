import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SalesSellerDetails() {
  const [sales, setSales] = useState([]);
  const { id: idPage } = useParams();

  useEffect(() => {
    const getSaleBySeller = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/sales/${idPage}`);
        const { data } = result;
        setSales(data);
      } catch (er) {
        console.error(er);
      }
    };
    getSaleBySeller();
  }, []);
  console.log(sales);
  //   const saleByIdSeller = Promise.all(sales.products.map((p, index2) => (
  //     <tr key={ `${sales.id}-${index2}` }>
  //       <td
  //         data-testid={ `seller_order_details__element-order-table-item-number-${index2}` }
  //       >
  //         {index2 === 0 ? 1 : index2 + 1}
  //       </td>
  //       <td
  //         data-testid={ `seller_order_details__element-order-table-name-${index2}` }
  //       >
  //         {p.productName}
  //       </td>
  //       <td
  //         data-testid={ `seller_order_details__element-order-table-quantity-${index2}` }
  //       >
  //         {p.quantity}
  //       </td>
  //       <td
  //         data-testid={ `seller_order_details__element-order-table-unit-price-${index2}` }
  //       >
  //         {p.price.toString().replace('.', ',')}
  //       </td>
  //       <td
  //         data-testid={ `seller_order_details__element-order-table-sub-total-${index2}` }
  //       >
  //         {(parseFloat(p.price) * p.quantity).toFixed(2).toString().replace('.', ',')}
  //       </td>
  //       { index2 === 0 && (
  //         <td>
  //           <div
  //             data-testid="seller_order_details__element-order-total-price"
  //           >
  //             TOTAL:
  //             { sales.totalPrice.toString().replace('.', ',') }
  //           </div>
  //         </td>
  //       )}
  //     </tr>
  //   )));

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
          {
            sales.products.map((p, index2) => (
              <tr key={ `${sales.id}-${index2}` }>
                <td
                  data-testid={ `seller_order_details__element-order-table-item-number-${index2}` }
                >
                  {index2 === 0 ? 1 : index2 + 1}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-table-name-${index2}` }
                >
                  {p.productName}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-table-quantity-${index2}` }
                >
                  {p.quantity}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-table-unit-price-${index2}` }
                >
                  {p.price.toString().replace('.', ',')}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-table-sub-total-${index2}` }
                >
                  {(parseFloat(p.price) * p.quantity).toFixed(2).toString().replace('.', ',')}
                </td>
                { index2 === 0 && (
                  <td>
                    <div
                      data-testid="seller_order_details__element-order-total-price"
                    >
                      TOTAL:
                      { sales.totalPrice.toString().replace('.', ',') }
                    </div>
                  </td>
                )}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
