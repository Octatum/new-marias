import React, { useContext, useEffect, useReducer } from 'react';
import { range, clamp } from 'lodash';
import styled from 'styled-components/macro';
import GatsbyLink, { navigate } from 'gatsby-link';
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
import Loading from '../../components/Loading';

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
    ${device.tablet} {
      width: 100%;
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
  setUnitsAvailable: 'SET_UNITS_AVAILABLE',
  disableButton: 'DISABLE_BUTTON',
};

function reducer(state, action) {
  switch (action.type) {
    case actions.setImages:
      return { ...state, images: action.payload };
    case actions.setIdentifiers:
      const { sku, id, name } = action.payload;
      return { ...state, sku, id, name };
    case actions.setAmount:
      return { ...state, amount: action.payload };
    case actions.setVariationIndex:
      return {
        ...state,
        currentVariationIndex: action.payload,
        inventoryLoaded: false,
      };
    case actions.setUnitsAvailable:
      return {
        ...state,
        unitsAvailable: action.payload,
        inventoryLoaded: true,
      };
    case actions.disableButton:
      return {
        ...state,
        disable: true,
      };
    default:
      throw new Error("Wrong action sent to reducer 'productReducer'");
  }
}

function ProductDetailContainer(props) {
  const [state, dispatch] = useReducer(reducer, {
    images: [],
    sku: '',
    id: '',
    name: '',
    amount: 1,
    unitsAvailable: 0,
    inventoryLoaded: false,
    currentVariationIndex: 0,
    disableButton: false,
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
  const clampedInventoryUnits = clamp(state.unitsAvailable, 0, 10);
  const inputDisabled = !state.inventoryLoaded || clampedInventoryUnits === 0;

  async function addProductToCart() {
    let { sku, amount, id, name } = state;

    const product = {
      sku,
      name,
      id,
      price: productPrice,
      thumbnail: state.images[0].thumbnail,
    };

    await addProduct(product, amount);
    navigate('/tienda/carrito');
  }

  async function getProductInventory(id) {
    const response = await moltinClient.get(`inventories/${id}`);
    return response;
  }

  // Función usada para modificar la cantidad en el selector.
  function setAmount(event) {
    const amount = event.target.value;

    dispatch({ type: actions.setAmount, payload: amount });
  }

  // Función utilizada para cambiar el índice de la variación seleccionada
  function setVariationIndex(event) {
    const index = event.target.value;

    dispatch({ type: actions.setVariationIndex, payload: index });
  }

  useEffect(() => {
    if (state.id === '') return;

    async function getProductInventoryData() {
      const inventory = (await getProductInventory(state.id)).data;

      dispatch({
        type: actions.setUnitsAvailable,
        payload: inventory.available,
      });
    }

    getProductInventoryData();
  }, [state.id]);

  // Efecto secundario que se ejecuta cuando el usuario cambia la variación
  // que está seleccionada actualmente. En caso de que el producto no
  // contenga variaciones, se asignan las imágenes del producto
  // principal a la vista, si el producto contiene variaciones,
  // se asignan a la vista las imágenes de la variación
  // elegida.
  useEffect(() => {
    let product = moltinProduct;

    if (productHasVariations) {
      product = moltinProduct.children[state.currentVariationIndex];
    }

    // Obtener los datos del producto de la variación seleccionada
    const images = product.files.map(({ href }) => ({
      thumbnail: href,
      original: href,
    }));
    const { sku, id, name } = product;

    dispatch({ type: actions.setIdentifiers, payload: { sku, id, name } });
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
    items: state.images,
    showPlayButton: false,
    showFullscreenButton: false,
    lazyLoad: true,
    renderLeftNav,
    renderRightNav,
  };

  return (
    <Layout>
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
                    options={
                      !inputDisabled ? range(1, clampedInventoryUnits + 1) : []
                    }
                    disabled={inputDisabled}
                    labelText="Cantidad"
                    required
                  />
                </Box>
              </Flex>
              {state.inventoryLoaded && state.unitsAvailable === 0 && (
                <Box>
                  <RebassText color="red" fontSize={3} pb={3}>
                    No hay unidades disponibles
                  </RebassText>
                </Box>
              )}

              <Flex justifyContent="space-between" mt={[2, 0]}>
                <RebassButton
                  fontSize={3}
                  width={[1, 'auto']}
                  onClick={addProductToCart}
                  disabled={inputDisabled || state.disableButton}
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
  );
}

export default ProductDetailContainer;
