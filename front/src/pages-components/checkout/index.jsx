import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import AppLayout from '../../components/AppLayout';
import OrderSummary from '../../components/OrderSummary';
import CustomerData from './CustomerData';
import getInitialState from './getInitialState';
import ShippingSelection from './ShippingSelection';
import localStorageManager from '../../utilities/localStorageManager';
import PaymentMethodSelection from './PaymentMethodSelection';

const CUSTOMER_DATA = {
  key: 'costumer_personal_data',
  default: getInitialState(),
};

const SHIPPING_DATA = {
  key: 'customer_shipping_data',
  default: {
    id: -1,
    name: '',
    price: 0,
  },
};

class CheckoutPage extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      customerData: localStorageManager.retrieve(
        CUSTOMER_DATA.key,
        CUSTOMER_DATA.default
      ),
      shippingData: localStorageManager.retrieve(
        SHIPPING_DATA.key,
        SHIPPING_DATA.default
      ),
    };
  }

  componentDidMount() {
    this.setState(() => {
      return {
        customerData: localStorageManager.retrieve(
          CUSTOMER_DATA.key,
          CUSTOMER_DATA.default
        ),
        shippingData: localStorageManager.retrieve(
          SHIPPING_DATA.key,
          SHIPPING_DATA.default
        ),
      };
    });
  }

  onCustomerFormSubmit = values => {
    this.setState(
      () => {
        localStorageManager.set(CUSTOMER_DATA.key, values);
        return {
          customerData: values,
        };
      },
      () => {
        navigate('/tienda/checkout/envio');
      }
    );
  };

  setShipping = shippingData => {
    this.setState(() => {
      localStorageManager.set(SHIPPING_DATA.key, shippingData);
      return {
        shippingData,
      };
    });
  };

  render() {
    return (
      <AppLayout>
        <Router>
          <OrderSummary
            path="/tienda/checkout"
            shippingData={this.state.shippingData}
          >
            <CustomerData
              path="cliente"
              initialValues={this.state.customerData}
              onSubmit={this.onCustomerFormSubmit}
            />
            <ShippingSelection
              path="envio"
              customerAddress={this.state.customerData}
              selectedShipping={this.state.shippingData}
              setShipping={this.setShipping}
            />
            <PaymentMethodSelection 
              path="facturacion"
              customerAddress={this.state.customerData}
              selectedShipping={this.state.shippingData}
            />
          </OrderSummary>
        </Router>
      </AppLayout>
    );
  }
}

export default CheckoutPage;
