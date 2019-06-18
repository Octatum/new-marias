const path = require('path');
const fetch = require('node-fetch');
const productTemplate = path.resolve('src/templates/ProductoDetalle.jsx');
const productGridView = path.resolve('src/templates/ProductsByCategory.jsx');

function getCleanString(string) {
  return string.replace(/\W/g, '').toLowerCase();
}
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MoltinProduct`) {
    const mainCategory = node.categories ? node.categories[0].name : 'Otros';
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
        products: allMoltinProduct(
          filter: { relationships: { parent: { data: { id: { eq: null } } } } }
        ) {
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
            categoryName: node.name,
          },
        });
      });

      createPage({
        path: `/tienda/categoria/otros`,
        component: productGridView,
        context: {
          categoryName: 'Otros',
        },
      });

      resolve();
    });
  });
};

exports.sourceNodes = ({
  actions,
  getNodesByType,
  createNodeId,
  createContentDigest,
}) => {
  return new Promise(async resolve => {
    const { createNode, createParentChildLink } = actions;

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

    const productNodes = getNodesByType('MoltinProduct');

    productNodes.forEach(productNode => {
      if (!productNode.relationships.parent) return;

      const parent = productNodes.find(
        element => element.id === productNode.relationships.parent.data.id
      );
      console.info(productNode.slug);
      createParentChildLink({ parent, child: productNode });
    });

    resolve();
  });
};
