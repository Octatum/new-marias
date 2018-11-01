import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import './setup.css';
import theme from '../utilities/theme';

const ChildrenLayout = styled.section`
  display: flex;
  flex-direction: column;
`;

function AppLayout({ children }) {
  return (
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
          <html lang="en" />
        </Helmet>
        <ChildrenLayout>{children}</ChildrenLayout>
      </React.Fragment>
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
