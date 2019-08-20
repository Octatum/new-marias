import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';
import { ShopifyClientProvider } from './ShopifyContext';
import WelcomePopup from './WelcomePopup';

function AppLayout({ children }) {
  return (
    <ShopifyClientProvider>
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
          <WelcomePopup />
          <Navbar />
          {children}
          <Footer />
        </React.Fragment>
      </ThemeProvider>
    </ShopifyClientProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
