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
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        verbose: true,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: '',
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
