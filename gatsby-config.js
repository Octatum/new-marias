require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: 'New Marias',
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/tienda/checkout/*`] },
    },
    'gatsby-plugin-offline',
    {
      resolve: `@moltin/gatsby-source-moltin`,
      options: {
        client_id: process.env.GATSBY_MOLTIN_CLIENT_ID,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
