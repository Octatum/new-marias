import React, { useState, useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import Helmet from 'react-helmet';
import GatsbyLink from 'gatsby-link';

import toTitleCase from '../../utilities/toTitleCase';
import Detail from '../../components/Detail';
import AppLayout, { MoltinGatewayContext } from '../../components/AppLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import CartCounter from '../../components/CartCounter';
import device from '../../utilities/device';
import Gallery from '../../components/Gallery';
import backButtonImg from './assets/backButton.svg';
import { useProducts } from '../../components/CartContext';

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem 3rem;

  ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const MobileHeader = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 20px;
  color: #626363;
  display: none;

  ${device.tablet} {
    display: flex;
    align-items: center;
  }
`;

const Par = styled('p')`
  flex: 1;
  padding-left: 1rem;
`;

const BackButton = styled(GatsbyLink)`
  display: block;
  width: 13px;
  height: 29px;
  cursor: pointer;
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: 2rem;

  ${device.tablet} {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;

  ${device.tablet} {
    flex-direction: column;
  }
`;

const StyledGallery = styled(Gallery)`
  flex: 4;
  padding-right: 2rem;
  box-sizing: border-box;

  ${device.tablet} {
    padding: 0;
  }
`;

const StyledDetail = styled(Detail)`
  flex: 2;
`;

const actions = {
  setProduct: 'setProduct',
  setImages: 'setImages',
};

function productReducer(state, action) {
  switch (action.type) {
    case actions.setProduct:
      return { ...state, product: action.payload, loaded: true };
    case actions.setImages:
      return { ...state, images: action.payload };
  }
}

function ProductDetailContainer(props) {
  const [productState, dispatch] = useReducer(productReducer, {
    images: [],
    data: {},
    loaded: false,
  });
  const [currentVariationId, setCurrentVariationId] = useState(null);
  const moltinClient = useContext(MoltinGatewayContext);
  const { addProduct } = useProducts();
  const { moltinProduct } = props.data;

  const categoryName = moltinProduct.fields.mainCategory;
  const cleanCategoryName = categoryName.replace(/\W/g, '').toLowerCase();
  const productName = moltinProduct.name.toLowerCase();

  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
    {
      to: `/tienda/categoria/${cleanCategoryName}`,
      name: categoryName.toLowerCase(),
    },
    {
      name: productName,
    },
  ];

  function addProductToCart() {}

  async function getMoltinProduct(id) {
    const response = await moltinClient.get(`products/${id}?include=files`);
    return response;
  }

  function setVariation(id) {
    setCurrentVariationId(id);
  }

  useEffect(() => {
    if (currentVariationId === null) return;

    getMoltinProduct(currentVariationId).then(response => {
      const images = response.included.files.map(file => file.link.href);
      dispatch({ type: actions.setImages, payload: images });
    });
  }, [currentVariationId]);

  useEffect(() => {
    getMoltinProduct(moltinProduct.id).then(response => {
      const product = response.data;
      dispatch({ type: actions.setProduct, payload: product });
      if (!product.meta.variations) {
        const images = response.included.files.map(file => file.link.href);
        dispatch({ type: actions.setImages, payload: images });
      } else {
        setCurrentVariationId(response.included.childrens[0].id);
      }
    });
  }, []);

  return (
    <AppLayout>
      <Layout>
        <Helmet title={toTitleCase(productName)} />
        <BreadcrumbContainer>
          <Breadcrumbs links={breadcrumbItems} />
        </BreadcrumbContainer>
        <MobileHeader>
          <BackButton to="tienda" />
          <Par>{productName}</Par>
          <CartCounter width={50} height={40} />
        </MobileHeader>
        <Container>
          {productState.loaded && (
            <>
              <StyledGallery images={productState.images} />
              <StyledDetail
                product={productState.product}
                variationChangeHandler={setVariation}
                onQuantityChange={() => {}}
                addToCartHandler={addProductToCart}
              />
            </>
          )}
        </Container>
      </Layout>
    </AppLayout>
  );
}

export default ProductDetailContainer;
