import React from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { Router, navigate } from '@reach/router';
import AppLayout from '../../components/AppLayout';
import OrderSummary from '../../components/OrderSummary';
import CustomerData from './CustomerData';
import getCustomerDataInitialState from './getInitialState';
import ShippingSelection from './ShippingSelection';
import PaymentMethodSelection from './PaymentMethodSelection';
import FinalSummary from './FinalSummary';

function CheckoutPage() {
  const [customerData, setCustomerData] = useLocalStorage(
    'costumer_personal_data',
    getCustomerDataInitialState()
  );
  const [shippingData, setShippingData] = useLocalStorage(
    'customer_shipping_data',
    {
      id: -1,
      name: '',
      price: 0,
    }
  );

  const onCustomerFormSubmit = values => {
    setCustomerData(values);
    navigate('/tienda/checkout/envio');
  };

  const setShipping = values => {
    setShippingData(values);
  };

  return (
    <AppLayout>
      <Router>
        <OrderSummary path="/tienda/checkout" shippingData={shippingData}>
          <CustomerData
            path="cliente"
            initialValues={customerData}
            onSubmit={onCustomerFormSubmit}
          />
          <ShippingSelection
            path="envio"
            customerAddress={customerData}
            selectedShipping={shippingData}
            setShipping={setShipping}
          />
          <PaymentMethodSelection
            path="facturacion"
            customerAddress={customerData}
            selectedShipping={shippingData}
          />
        </OrderSummary>
        <FinalSummary
          path="/tienda/checkout/resumen/:pago"
          customerAddress={customerData}
          selectedShipping={shippingData}
        />
      </Router>
    </AppLayout>
  );
}

export default CheckoutPage;
