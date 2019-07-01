import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';
import { ShopifyClientProvider } from './ShopifyContext';

export const CartIdContext = React.createContext(null);

function AppLayout({ children }) {
  return (
    <ShopifyClientProvider>
      <CartIdContext.Provider>
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
      </CartIdContext.Provider>
    </ShopifyClientProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
