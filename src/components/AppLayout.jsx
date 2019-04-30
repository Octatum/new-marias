import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Shopkit as ShopkitProvider } from '@moltin/react-shopkit';
import { createClient } from '@moltin/request';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';

const client = new createClient({
  client_id: process.env.GATSBY_MOLTIN_CLIENT_ID,
});

export const MoltinGatewayContext = React.createContext(client);

function AppLayout({ children }) {
  return (
    <MoltinGatewayContext.Provider>
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
            >
              <html lang="es" />
            </Helmet>
            <div>
              <Navbar />
              <div>
                {children}
                <Footer />
              </div>
            </div>
          </React.Fragment>
        </ThemeProvider>
      </ShopkitProvider>
    </MoltinGatewayContext.Provider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
