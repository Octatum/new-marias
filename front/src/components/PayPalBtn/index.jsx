import React, { Component } from 'react';

export default class MyApp extends Component {
  paypalComponent = null;

  componentDidMount() {
    this.paypalComponent = require('react-paypal-checkout');
  }

  render() {
    const client = {
      sandbox:
        'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: '<insert production client id>',
    };
    const PaypalButton = this.paypalComponent;

    return (
      <React.Fragment>
        {PaypalButton && <PaypalButton client={client} currency={'MXN'} total={550.0} />}
      </React.Fragment>
    );
  }
}

/* https://www.npmjs.com/package/react-paypal-checkout */
