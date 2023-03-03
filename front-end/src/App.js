import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <CartContextProvider>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </CartContextProvider>
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}
export default App;
