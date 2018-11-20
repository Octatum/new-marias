import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import AppLayout from '../../components/AppLayout';
import OrderSummary from '../../components/OrderSummary';
import CustomerData from './CustomerData';
import getInitialState from './getInitialState';
import ShippingData from './ShippingData';

class CheckoutPage extends Component {
  state = {
    customerData: getInitialState(),
    shipping: null,
  };

  onCustomerFormSubmit = values => {
    console.log(values);
    this.setState(() => {
      return {
        customerData: values,
      };
    }, navigate('/tienda/checkout/envio'));
  };

  setShipping = shippingData => {
    this.setState(() => {
      return {
        shipping: shippingData,
      };
    });
  };

  render() {
    return (
      <AppLayout>
        <Router>
          <OrderSummary path="/tienda/checkout">
            <CustomerData
              path="cliente"
              initialValues={this.state.customerData}
              onSubmit={this.onCustomerFormSubmit}
            />
            <ShippingData
              path="envio"
              customerAddress={this.state.customerData}
              shipping={this.state.shipping}
              setShipping={this.setShipping}
            />
          </OrderSummary>
        </Router>
      </AppLayout>
    );
  }
}

export default CheckoutPage;
