import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CustomerProd() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getSaleByUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = jwtDecode(user.token);
        const result = await axios.get(`http://localhost:3001/sales/user/${id}`);
        const { data } = result;
        setSales(data);
      } catch (er) {
        console.error(er);
      }
    };
    getSaleByUser();
  }, []);

  const DetailsProducts = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  const salesUser = sales.map((sale) => (

    <div key={ sale.id }>
      <button
        type="button"
        onClick={ () => DetailsProducts(sale.id) }
      >
        <p data-testid={ `customer_orders__element-order-id-${sale.id}` }>
          {sale.id}
        </p>
        <p
          data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
        >
          {sale.status}
        </p>
        <p data-testid={ `customer_orders__element-order-date-${sale.id}` }>
          {new Date(sale.saleDate.split('T')[0])
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${sale.id}` }
        >
          {sale.totalPrice.replace('.', ',')}
        </p>
      </button>
    </div>
  ));
  return (
    <div>
      <Navbar />
      {salesUser}
    </div>
  );
}