module.exports = {
  siteMetadata: {
    title: 'New Marias',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/json`,
      },
    },
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
        // icon: '', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/tienda/checkout/*`] },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-cockpit',
      options: {
        host: 'https://admin.newmarias.com',
        accessToken: '8e126ac75a4c97897cd52dfab00650',
        collectionName: ['Product', 'Category'],
      },
    },
  ],
};
