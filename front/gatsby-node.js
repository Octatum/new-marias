const path = require('path');
const productTemplate = path.resolve('src/templates/ProductoDetalle.jsx');
const productGridView = path.resolve('src/templates/ProductsByCategory.jsx')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `CockpitProduct`) {
    const slug = `/producto-${node.id}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  if (node.internal.type === `CockpitCategory`) {
    const cleanName = node.entry.name.replace(/\W/g, '');
    createNodeField({
      node,
      name: `cleanName`,
      value: cleanName,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve) => {
    graphql(`
      {
        products: allCockpitProduct {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }

        categories: allCockpitCategory {
          edges {
            node {
              id
              fields {
                cleanName
              }
            }
          }
        }
      }
    `).then(result => {
      const { createPage } = actions;
      result.data.products.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: productTemplate,
          context: {
            slug: node.fields.slug,
          },
        });
      });

      result.data.categories.edges.forEach(({ node }) => {
        createPage({
          path: `/categoria/${node.fields.cleanName}`,
          component: productGridView,
          context: {
            categoryId: node.id
          }
        })
      });

      resolve();
    });
  });
};
