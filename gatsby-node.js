/* eslint-disable import/no-unused-modules */
const path = require('path');
const fetch = require('node-fetch');
const shopifyProductTemplate = path.resolve(
  'src/templates/ProductoDetalle.shopify.jsx'
);
const shopifyProductGridView = path.resolve(
  'src/templates/ProductsByCategory.shopify.jsx'
);

function toUrlCase(string) {
  return string
    .replace(' ', '-')
    .replace(/\W/g, '')
    .toLowerCase();
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `ShopifyProduct`) {
    const mainCategory = node.productType || 'Otros';
    createNodeField({
      node,
      name: `mainCategory`,
      value: mainCategory,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  return new Promise(resolve => {
    graphql(`
      {
        shopifyProducts: allShopifyProduct {
          edges {
            node {
              handle
            }
          }
        }
        categories: allShopifyProduct {
          group(field: productType) {
            fieldValue
          }
        }
      }
    `).then(result => {
      const { createPage } = actions;

      result.data.shopifyProducts.edges.forEach(({ node: { handle } }) => {
        createPage({
          path: `/tienda/producto/${handle}`,
          component: shopifyProductTemplate,
          context: {
            handle,
          },
        });
      });

      result.data.categories.group.forEach(({ fieldValue }) => {
        const cleanName = toUrlCase(fieldValue);
        createPage({
          path: `/tienda/categoria/${cleanName}`,
          component: shopifyProductGridView,
          context: {
            categoryName: fieldValue,
          },
        });
      });

      createPage({
        path: `/tienda/categoria/otros`,
        component: shopifyProductGridView,
        context: {
          categoryName: 'Otros',
        },
      });

      resolve();
    });
  });
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  return new Promise(async resolve => {
    const { createNode } = actions;

    // fetch raw data from the randomuser api
    const allSingletons = await fetch(
      'https://admin.newmarias.com/api/singletons/listSingletons?token=8e126ac75a4c97897cd52dfab00650'
    );
    const singletonsData = await allSingletons.json();

    await Promise.all(
      singletonsData.map(async singletonName => {
        const res = await fetch(
          `https://admin.newmarias.com/api/singletons/get/${singletonName}?token=8e126ac75a4c97897cd52dfab00650`
        );
        const responseData = await res.json();
        console.info(`Fetching data for ${singletonName}`);

        const nodeMeta = {
          id: createNodeId(`page-data-${singletonName}`),
          parent: null,
          children: [],
          internal: {
            type: 'PageContent',
            mediaType: 'text/html',
            content: JSON.stringify(responseData),
            contentDigest: createContentDigest(responseData),
          },
          _pageId: singletonName,
        };
        const node = Object.assign({}, responseData, nodeMeta);

        createNode(node);
        console.info(`Node created for ${singletonName}`);
      })
    );
    resolve();
  });
};
