import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Orders.css';

export default function SellerSales() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getSaleByUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = jwtDecode(user.token);
        const result = await axios.get(`http://localhost:3001/sales/seller/${id}`);
        const { data } = result;
        setSales(data);
      } catch (er) {
        console.error(er);
      }
    };
    getSaleByUser();
  }, []);

  const DetailsProdSeller = (id) => {
    history.push(`/seller/orders/${id}`);
  };

  const salesSeller = sales.map((sale) => (

    <div className="card-order" key={ sale.id }>
      <button
        type="button"
        onClick={ () => DetailsProdSeller(sale.id) }
      >
        <p
          data-testid={ `seller_orders__element-order-id-${sale.id}` }
        >
          {sale.id}
        </p>
        <p
          data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
        >
          {sale.status}
        </p>
        <p data-testid={ `seller_orders__element-order-date-${sale.id}` }>
          {new Date(sale.saleDate.split('T')[0])
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
        </p>
        <p
          data-testid={ `seller_orders__element-card-price-${sale.id}` }
        >
          {sale.totalPrice.replace('.', ',')}
        </p>
        <p
          data-testid={ `seller_orders__element-card-address-${sale.id}` }
        >
          {sale.deliveryAddress.concat(',', sale.deliveryNumber)}
        </p>
      </button>
    </div>
  ));
  return (
    <div>
      <Navbar />
      <div className="card-container-order">
        {salesSeller}
      </div>
    </div>
  );
}
