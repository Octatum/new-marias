const path = require('path');
const productTemplate = path.resolve('src/templates/ProductoDetalle.jsx');
const productGridView = path.resolve('src/templates/ProductsByCategory.jsx');

function getCleanString(string) {
  return string.replace(/\W/g, '').toLowerCase();
}

exports.createPages = ({ graphql, actions }) => {
  return new Promise(resolve => {
    graphql(`
      {
        products: allMoltinProduct {
          edges {
            node {
              slug
            }
          }
        }

        categories: allMoltinCategory {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `).then(result => {
      const { createPage } = actions;
      result.data.products.edges.forEach(({ node }) => {
        createPage({
          path: `/tienda/producto/${node.slug}`,
          component: productTemplate,
          context: {
            slug: node.slug,
          },
        });
      });

      result.data.categories.edges.forEach(({ node }) => {
        const cleanName = getCleanString(node.name);
        createPage({
          path: `/tienda/categoria/${cleanName}`,
          component: productGridView,
          context: {
            categoryId: node.id,
          },
        });
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
        console.log(`Fetching data for ${singletonName}`);

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
