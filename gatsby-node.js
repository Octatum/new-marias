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
     //   console.log("node path: " + node.path);
       // console.log(node.path);
        const slug = `/${node.path}/`;//createFilePath({ node, getNode, basePath: `pages` })
    //    console.log("slug..." + slug);
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
        console.log(JSON.stringify(result, null, 4))
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

/*
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  return graphql(getAllFilesQuery)
    .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
   // result.data.projects.edges.forEach(({node}) => createProjectPage(node, createPage));
    });

};
*/
/*
function createProjectPage(node, createPage) {
  createPage({
    path: `portfolio/${node.path}`,
    component: courseTemplate,
    context: {
      route: node.path
    }
  });
}
*/
/*
function createCoursePage(node, createPage) {
  createPage({
    path: `course/${node.path}`,
    component: courseTemplate,
    context: {
      route: node.path
    }
  });
}
*/