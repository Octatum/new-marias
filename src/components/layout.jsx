import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import './setup.css';
import theme from '../utilities/theme';

const ChildrenLayout = styled.section`
  display: flex;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <React.Fragment>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content: 'Artesanías Mexicanas New Marias',
                },
                { name: 'keywords', content: 'artesanias, mexico' },
              ]}>
              <html lang="en" />
            </Helmet>
            <ChildrenLayout>{children}</ChildrenLayout>
          </React.Fragment>
        )}
      />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
