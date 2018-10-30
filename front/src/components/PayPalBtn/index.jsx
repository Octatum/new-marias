/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import paypal from 'react-paypal-checkout';

//var MyCartComponent = window.React.createClass({
class MyCartComponent extends Component {
    render() {
  
        let client = {
          //  ...
        };
  
        let payment = () => {
           // ...
        };
  
        let onAuthorize = (data, actions) => {
           // ...
        };
    
        let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
  
        return (<div className='shoppingCart'>
            <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>
            <PayPalButton
                client={client}
                payment={payment}
                commit={true}
                onAuthorize={onAuthorize} />
        </div>);
    }
    
}

export default MyCartComponent;
*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PaypalBtn from 'react-paypal-checkout';
 
export default class MyApp extends Component {
    render() {
        const client = {
            sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: '<insert production client id>',
        }	
        return (
            <PaypalBtn 
                client={client}
                currency={'MXN'}
                total={550.00}/>
        );
    }
}

/* https://www.npmjs.com/package/react-paypal-checkout */