import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Shopkit as ShopkitProvider } from '@moltin/react-shopkit';
import { createClient, createCartIdentifier } from '@moltin/request';
import createPersistedState from 'use-persisted-state';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';

const client = new createClient({
  client_id: process.env.GATSBY_MOLTIN_CLIENT_ID,
});

export const MoltinGatewayContext = React.createContext(null);
export const CartIdContext = React.createContext(null);

const LOCAL_STORAGE_ID = 'cart_id';
const useMoltinCart = createPersistedState(LOCAL_STORAGE_ID);

function AppLayout({ children }) {
  const [cartId, setCartId] = useMoltinCart(null);

  function generateNewCartId() {
    const newCartId = createCartIdentifier();
    setCartId(newCartId);
  }

  useEffect(() => {
    if (!!cartId) return;
    generateNewCartId();
  }, [cartId]);

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <CartIdContext.Provider value={{ id: cartId, generateNewCartId }}>
        <MoltinGatewayContext.Provider value={client}>
          <ShopkitProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
            <ThemeProvider theme={theme}>
              <React.Fragment>
                <Helmet
                  titleTemplate={`%s - New Marias`}
                  meta={[
                    {
                      name: 'description',
                      content: 'Artesanías Mexicanas New Marias',
                    },
                    { name: 'keywords', content: 'artesanias, mexico' },
                  ]}
                />
                <Navbar />
                {children}
                <Footer />
              </React.Fragment>
            </ThemeProvider>
          </ShopkitProvider>
        </MoltinGatewayContext.Provider>
      </CartIdContext.Provider>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
