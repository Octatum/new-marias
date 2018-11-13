import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import './setup.css';
import { CartProvider } from './CartContext';

const ChildrenLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Container = styled.div`
  flex: 3;
  overflow-y: scroll;
`;

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
          <ChildrenLayout>
            <Navbar />
            <Container>
              {children}
              <Footer />
            </Container>
          </ChildrenLayout>
        </React.Fragment>
      </CartProvider>
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
