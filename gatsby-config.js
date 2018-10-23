module.exports = {
  siteMetadata: {
    title: 'New Marias',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
      },
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
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: "gatsby-source-cockpit",
      options: {
          host: "https://admin.newmarias.com",
          accessToken: "69171f847c92cd3fa589d8e87b89cb",
          collectionName: ["Product"]
      }
    }
  ],
};
