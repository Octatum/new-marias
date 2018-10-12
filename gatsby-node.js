const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`)
const productTemplate = path.resolve('src/templates/ProductoDetalle.jsx');

const getAllFilesQuery = `
  query GetAllContentFiles {
    products: allProductsJson {
        edges {
          node {
            path
          }
        }
      }
`;

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `ProductsJson`) {
        const slug = `/${node.path}/`;
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
  }

  exports.createPages = ({ graphql, actions }) => {
    return new Promise((resolve, reject) => {
      graphql(`
        {
          allProductsJson {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
  ).then(result => {
        const { createPage } = actions
        result.data.allProductsJson.edges.forEach(({ node }) => {
            createPage({
              path: node.fields.slug,
              component: productTemplate,
              context: {
                slug: node.fields.slug,
              },
            })
          })
        resolve();
      })
    })
  }
