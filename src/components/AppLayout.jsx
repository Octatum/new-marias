import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';
import { CartProvider } from './CartContext';

function AppLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
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
            <html lang="en" />
          </Helmet>
          <div>
            <Navbar />
            <div>
              {children}
              <Footer />
            </div>
          </div>
        </React.Fragment>
      </CartProvider>
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
