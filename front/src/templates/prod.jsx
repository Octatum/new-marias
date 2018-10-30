import React, { Component } from 'react';
import './../components/setup.css';
/*
class Prod extends Component {
    render() {
        console.log("props", this.props);
        return (
            <h1>{49049}</h1>
        );
    }
}
*/
export default ({ data }) => {
  /*
        <h1>thumbnail: {data.cockpitProduct.entry.thumbnail}</h1>
    */
  return (
    <div>
      <h1>id: {data.cockpitProduct.id}</h1>
      <h1>product: {data.cockpitProduct.entry.name}</h1>
      <h1>price: {data.cockpitProduct.entry.price}</h1>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    cockpitProduct(fields: { slug: { eq: $slug } }) {
      id
      entry {
        price
        name
      }
    }
  }
`;
