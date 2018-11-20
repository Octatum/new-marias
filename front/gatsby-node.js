const path = require('path');
const productTemplate = path.resolve('src/templates/ProductoDetalle.jsx');
const productGridView = path.resolve('src/templates/ProductsByCategory.jsx')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `CockpitProduct`) {
    const slug = `/tienda/producto-${node.id}`;
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

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/tienda\/checkout/)) {
    page.matchPath = "/tienda/checkout/*"
    createPage(page)
  }
}

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
          path: `/tienda/categoria/${node.fields.cleanName}`,
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
