import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import CartContextProvider from './contexts/CartContext';
import AdminManage from './pages/AdminManage';
import SellerSales from './pages/SellerSales';
import SalesSellerDetails from './pages/SalesSellerDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/admin/manage" component={ AdminManage } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/seller/orders" component={ SellerSales } />
      <Route exact path="/seller/orders/:id" component={ SalesSellerDetails } />
      <CartContextProvider>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      </CartContextProvider>
    </Switch>
  );
}
export default App;
