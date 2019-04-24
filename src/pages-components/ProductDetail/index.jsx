import React, { useState, useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import Helmet from 'react-helmet';
import GatsbyLink from 'gatsby-link';
import { Flex, Box } from 'rebass';
import ImageGallery from 'react-image-gallery';

import toTitleCase from '../../utilities/toTitleCase';
import AppLayout, { MoltinGatewayContext } from '../../components/AppLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import CartCounter from '../../components/CartCounter';
import device from '../../utilities/device';
import backButtonImg from './assets/backButton.svg';
import { useProducts } from '../../components/CartContext';
import RebassText from '../../components/RebassText';
import Select from '../../components/Select';
import RebassButton from '../../components/RebassButton';

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

const StyledGallery = styled(Box)`
  --thumbnails-width: 150px;
  height: 500px;

  div.image-gallery-thumbnails-wrapper.left {
    width: var(--thumbnails-width);
  }
  .image-gallery-slide-wrapper.left {
    width: calc(100% - var(--thumbnails-width) - 5px);
  }
  .image-gallery-thumbnails-container > * {
    width: calc(100% - 8px);
  }
`;

const actions = {
  setProduct: 'SET_PRODUCT',
  setImages: 'SET_IMAGES',
  setSKU: 'SET_SKU',
};

function productReducer(state, action) {
  switch (action.type) {
    case actions.setProduct:
      return { ...state, product: action.payload, loaded: true };
    case actions.setImages:
      return { ...state, images: action.payload };
    case actions.setSKU:
      return { ...state, sku: action.payload };
    default:
      throw new Error("Wrong action sent to reducer 'productReducer'");
  }
}

const images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    thumbnail: 'http://lorempixel.com/250/150/nature/1/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    thumbnail: 'http://lorempixel.com/250/150/nature/2/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    thumbnail: 'http://lorempixel.com/250/150/nature/3/',
  },
];

const imagesCache = {};

function ProductDetailContainer(props) {
  const [state, dispatch] = useReducer(productReducer, {
    images: [],
    product: {},
    loaded: false,
    sku: '',
  });
  const [currentVariationIndex, setCurrentVariationIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const moltinClient = useContext(MoltinGatewayContext);
  const { addProduct } = useProducts();
  const { moltinProduct } = props.data;
  const categoryName = moltinProduct.fields.mainCategory;
  const cleanCategoryName = categoryName.replace(/\W/g, '').toLowerCase();
  const productName = moltinProduct.name.toLowerCase();
  const productPrice = moltinProduct.price[0].amount / 100;

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

  function addProductToCart() {
    let { sku } = state;

    const product = {
      amount: quantity,
      sku,
    };

    console.log({ product });

    // addProduct(product);
  }

  async function getMoltinProduct(id) {
    const response = await moltinClient.get(`products/${id}?include=files`);
    return response;
  }

  useEffect(() => {
    if (currentVariationIndex === null) return;

    const currentVariationId =
      state.product.relationships.children.data[currentVariationIndex].id;

    getMoltinProduct(currentVariationId).then(response => {
      imagesCache[currentVariationId] = response.included.files.map(
        file => file.link.href
      );
      dispatch({
        type: actions.setImages,
        payload: imagesCache[currentVariationId],
      });
      dispatch({ type: actions.setSKU, payload: response.data.sku });
    });
  }, [currentVariationIndex]);

  useEffect(() => {
    getMoltinProduct(moltinProduct.id).then(response => {
      const product = response.data;
      dispatch({ type: actions.setProduct, payload: product });
      if (!product.meta.variations) {
        const images = response.included.files.map(file => file.link.href);
        dispatch({ type: actions.setImages, payload: images });
        console.log(product);
        dispatch({ type: actions.setSKU, payload: product.sku });
      } else {
        setCurrentVariationIndex(0);
      }
    });
  }, []);

  const imageGalleryProps = {
    thumbnailPosition: 'left',
    items: images,
    showPlayButton: false,
    showFullscreenButton: false,
    lazyLoad: true,
  };

  return (
    <AppLayout>
      <Layout>
        <Helmet title={toTitleCase(productName)} />
        <BreadcrumbContainer>
          <Breadcrumbs links={breadcrumbItems} />
        </BreadcrumbContainer>
        <MobileHeader>
          <BackButton to="/tienda" />
          <Par>{productName}</Par>
          <CartCounter width={50} height={40} />
        </MobileHeader>
        <Flex
          flexDirection={['column', 'row']}
          style={{ maxWidth: 1200, width: '100%' }}
          mx="auto"
        >
          <StyledGallery p={2} width={3 / 4}>
            <ImageGallery {...imageGalleryProps} />
          </StyledGallery>
          <Box p={2} width={1 / 4} style={{ minWidth: 350 }}>
            <Flex flexDirection="column">
              <Box pb={3}>
                <RebassText py={1} fontSize={[6]}>
                  {toTitleCase(productName)}
                </RebassText>
                <RebassText py={1} fontSize={[3]}>
                  Precio:{' '}
                  <RebassText fontSize={[4]} as="span" color="orange">
                    ${parseFloat(productPrice).toFixed(2)}
                  </RebassText>
                </RebassText>
                <Flex flexDirection="column">
                  <Box pb={3}>
                    <Select
                      name="tipo"
                      onChange={() => {}}
                      options={[1, 2, 3, 4, 5]}
                      labelText="Tipo"
                      required
                    />
                  </Box>
                  <Box pb={3}>
                    <Select
                      name="cantidad"
                      onChange={() => {}}
                      options={[1, 2, 3, 4, 5]}
                      labelText="Cantidad"
                      required
                    />
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <RebassButton fontSize={3} px={4} py={3}>
                    Agregar al carrito
                  </RebassButton>
                  <Box>
                    <CartCounter width="69" height="61" />
                  </Box>
                </Flex>
              </Box>

              <Box py={1}>
                <RebassText>{moltinProduct.description}</RebassText>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </AppLayout>
  );
}

export default ProductDetailContainer;
