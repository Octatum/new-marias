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

const NoMobileBox = styled(Box)`
  ${device.mobile} {
    display: none;
  }
`;

const StyledGallery = styled(Box)`
  --thumbnails-width: 150px;
  min-height: 500px;

  & > * {
    height: 100%;

    > * {
      height: 100%;
    }
  }

  div.image-gallery-thumbnails-wrapper.left {
    width: var(--thumbnails-width);
    height: 100% !important;

    ${device.tablet} {
      height: 0 !important;
    }
  }
  .image-gallery-slide-wrapper.left {
    width: calc(100% - var(--thumbnails-width) - 5px);

    > span {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
    }
  }
  .image-gallery-thumbnails-container > * {
    width: calc(100% - 8px);
  }
  .image-gallery-swipe {
    width: 80%;
    margin: 0 auto;
  }

  ${device.tablet} {
    --thumbnails-width: 0;
    min-height: auto;
  }
`;

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

const GalleryNav = styled('button')`
  transform: ${({ dataRotate }) => dataRotate && 'rotate(180deg)'};
  background-image: url('${backButtonImg}');
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  min-width: 24px;
  width: 10%;
  height: 100%;
  background-size: 40%;
`;

function renderLeftNav(onClick, disabled) {
  return (
    <GalleryNav
      className="image-gallery-custom-left-nav"
      disabled={disabled}
      onClick={onClick}
    />
  );
}

function renderRightNav(onClick, disabled) {
  return (
    <GalleryNav
      className="image-gallery-custom-right-nav"
      disabled={disabled}
      onClick={onClick}
      dataRotate
    />
  );
}

const actions = {
  setImages: 'SET_IMAGES',
  setIdentifiers: 'SET_SKU',
  setAmount: 'SET_AMOUNT',
  setVariationIndex: 'SET_VARIATION_INDEX',
  disable: 'DISABLE',
  enable: 'ENABLE',
};

function reducer(state, action) {
  switch (action.type) {
    case actions.setImages:
      return { ...state, images: action.payload };
    case actions.setIdentifiers:
      const { sku, id } = action.payload;
      return { ...state, sku, id };
    case actions.setAmount:
      return { ...state, amount: action.payload };
    case actions.setVariationIndex:
      return {
        ...state,
        currentVariationIndex: action.payload,
      };
    case actions.disable:
      return { ...state, disabled: true };
    case actions.enable:
      return { ...state, disabled: false };
    default:
      throw new Error("Wrong action sent to reducer 'productReducer'");
  }
}

function ProductDetailContainer(props) {
  const [state, dispatch] = useReducer(reducer, {
    images: [],
    sku: '',
    id: '',
    amount: 1,
    disabled: true,
    unitsAvailable: 0,
    currentVariationIndex: 0,
  });

  const moltinClient = useContext(MoltinGatewayContext);
  const { addProduct } = useProducts();
  const { moltinProduct } = props.data;
  const categoryName = moltinProduct.fields.mainCategory;
  const cleanCategoryName = categoryName.replace(/\W/g, '').toLowerCase();
  const productName = moltinProduct.name.toLowerCase();
  const productPrice = moltinProduct.price[0].amount / 100;
  const productVariations = moltinProduct.meta.variations;
  const productHasVariations = productVariations !== null;

  function addProductToCart() {
    let { sku, amount } = state;

    const product = {
      amount,
      sku,
    };

    // addProduct(product);
  }

  async function getMoltinProduct(id) {
    const response = await moltinClient.get(`products/${id}?include=files`);
    return response;
  }

  function setAmount(event) {
    const amount = event.target.value;

    dispatch({ type: actions.setAmount, payload: amount });
  }

  function setVariationIndex(event) {
    const index = event.target.value;

    dispatch({ type: actions.setVariationIndex, payload: index });
  }

  useEffect(() => {
    dispatch({ type: actions.disable });
  }, [state.id]);

  useEffect(() => {
    let images = [];
    let sku = '';
    let id = '';

    if (!productHasVariations) {
      images = moltinProduct.files.map(({ href }) => ({
        thumbnail: href,
        original: href,
      }));
      ({ sku, id } = moltinProduct);
      dispatch({ type: actions.enable });
    } else {
      const product = moltinProduct.children[state.currentVariationIndex];
      images = product.files.map(({ href }) => ({
        thumbnail: href,
        original: href,
      }));
      ({ sku, id } = product);
    }
    dispatch({ type: actions.setIdentifiers, payload: { sku, id } });
    dispatch({ type: actions.setImages, payload: images });
  }, [state.currentVariationIndex]);

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

  const imageGalleryProps = {
    thumbnailPosition: 'left',
    items: state.images.length > 0 ? state.images : images,
    showPlayButton: false,
    showFullscreenButton: false,
    lazyLoad: true,
    renderLeftNav,
    renderRightNav,
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
          <StyledGallery p={2} width={[1, 1, 3 / 4, 0.7]}>
            <ImageGallery {...imageGalleryProps} />
          </StyledGallery>
          <Box p={2} width={[1, 1, 1 / 4, 0.3]} style={{ minWidth: 290 }}>
            <Flex flexDirection={['column-reverse', 'column', 'column']}>
              <Box pb={[0, 3]}>
                <RebassText py={1} fontSize={[5, 6]}>
                  {toTitleCase(productName)}
                </RebassText>
                <RebassText pt={1} pb={2} fontSize={[3]}>
                  Precio:{' '}
                  <RebassText fontSize={[4]} as="span" color="orange">
                    ${parseFloat(productPrice).toFixed(2)}
                  </RebassText>
                </RebassText>
                <Flex flexDirection="column">
                  {productHasVariations && (
                    <Box pb={2}>
                      <Select
                        name="variation"
                        onChange={setVariationIndex}
                        options={moltinProduct.children.map((child, index) => ({
                          name: child.name,
                          value: index,
                        }))}
                        labelText={productVariations[0].name}
                        required
                      />
                    </Box>
                  )}

                  <Box pb={3}>
                    <Select
                      name="cantidad"
                      onChange={setAmount}
                      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      labelText="Cantidad"
                      required
                    />
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" mt={[2, 0]}>
                  <RebassButton
                    fontSize={3}
                    width={[1, 'auto']}
                    onClick={addProductToCart}
                    disabled={state.disabled}
                    px={[2, 3]}
                    py={[3]}
                  >
                    Agregar al carrito
                  </RebassButton>
                  <NoMobileBox>
                    <CartCounter width="69" height="61" />
                  </NoMobileBox>
                </Flex>
              </Box>
              <Box pb={[2, 1]} pt={[0, 1]}>
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
