import React, { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { Flex, Box, Image as RebassImage } from 'rebass';
import ImageGallery from 'react-image-gallery';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Link } from 'gatsby';

import headerLogo from '../../components/assets/header-icon.svg';
import Breadcrumbs from '../../components/Breadcrumbs';
import CartCounter from '../../components/CartCounter';
import device from '../../utilities/device';
import backButtonImg from './assets/backButton.svg';
import RebassText, { MarkdownText } from '../../components/RebassText';
import Select from '../../components/Select';
import RebassButton from '../../components/RebassButton';
import {
  useShopifyClient,
  useShopifyFunctions,
} from '../../components/ShopifyContext';
import { formatPrice } from '../../utilities/lib';

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem 3rem;
  margin-bottom: 6rem;

  ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const MobileHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
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

const BackButton = styled(Link)`
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
  .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails {
    position: initial;
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
  enableButton: 'ENABLE_BUTTON',
  hideDialog: 'HIDE_DIALOG',
  showDialog: 'SHOW_DIALOG',
  setCurrentCartTotal: 'SET_CURRENT_TOTAL',
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
    case actions.enableButton:
      return {
        ...state,
        disable: false,
      };
    case actions.showDialog:
      return {
        ...state,
        showDialog: true,
      };
    case actions.setCurrentCartTotal:
      return {
        ...state,
        currentCartTotal: action.payload,
      };
    case actions.hideDialog:
      return {
        ...state,
        showDialog: false,
      };
    default:
      throw new Error(
        `Wrong action sent to reducer 'productReducer'. Action type: ${action.type}`
      );
  }
}

function ProductDetailContainer(props) {
  const [state, dispatch] = useReducer(reducer, {
    images: [],
    sku: '',
    id: '',
    name: '',
    amount: 1,
    unitsAvailable: false,
    inventoryLoaded: false,
    currentVariationIndex: 0,
    disableButton: false,
    showDialog: false,
    currentCartTotal: 0,
  });

  const galleryRef = useRef(null);

  const shopifyClient = useShopifyClient();
  const { addItem } = useShopifyFunctions();
  const { shopifyProduct: product } = props.data;
  const categoryName = product.fields.mainCategory;
  const cleanCategoryName = categoryName.replace(/\W/g, '');
  const productName = product.title;
  const productPrice = Number(
    product.variants[state.currentVariationIndex].price
  );
  const formattedPrice = formatPrice(productPrice);
  const productVariations = product.variants;
  const productHasVariations = productVariations.length > 1;
  const inputDisabled = !state.inventoryLoaded || !state.unitsAvailable;
  const subtotal = formatPrice(productPrice * state.amount);
  const formattedCurrentSubtotal = formatPrice(state.currentCartTotal);

  async function addProductToCart() {
    let { amount, id } = state;
    dispatch({ type: actions.disableButton });

    try {
      const checkout = await addItem({
        variantId: id,
        quantity: Number(amount),
      });
      const currentTotal = Number(checkout.subtotalPrice);
      dispatch({ type: actions.setCurrentCartTotal, payload: currentTotal });
      dispatch({ type: actions.showDialog });
    } catch (exception) {
      console.error(exception);
      dispatch({ type: actions.enableButton });
    }
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

  // Efecto que cambia la imagen seleccionada actualmente en la galería por la
  // correspondiente a la de la variación seleccionada
  useEffect(() => {
    if (galleryRef === null) return;
    const index = state.images.findIndex(
      image =>
        image.originalSrc ===
        productVariations[state.currentVariationIndex].image.originalSrc
    );
    galleryRef.current.slideToIndex(index >= 0 ? index : 0);
  }, [state.currentVariationIndex, state.images, productVariations]);

  useEffect(() => {
    if (state.id === '') return;

    async function getProductInventory(id) {
      const response = await shopifyClient.product.fetch(product.shopifyId);
      const p = response.variants.find(item => item.id === id);
      return p;
    }

    // eslint-disable-next-line no-unused-vars
    async function getProductInventoryData() {
      const { available } = await getProductInventory(state.id);

      dispatch({
        type: actions.setUnitsAvailable,
        payload: available,
      });
    }

    getProductInventoryData();
  }, [shopifyClient, state.id]);

  // Efecto secundario que se ejecuta cuando el usuario cambia la variación
  // que está seleccionada actualmente. En caso de que el producto no
  // contenga variaciones, se asignan las imágenes del producto
  // principal a la vista, si el producto contiene variaciones,
  // se asignan a la vista las imágenes de la variación
  // elegida.
  useEffect(() => {
    // Obtener los datos del producto de la variación seleccionada
    const images = product.images;
    const { shopifyId: id, title: name } = product.variants[
      state.currentVariationIndex
    ];

    dispatch({ type: actions.setIdentifiers, payload: { id, name } });
    dispatch({ type: actions.setImages, payload: images });
  }, [product, state.currentVariationIndex]);

  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
    {
      to: `/tienda/categoria/${cleanCategoryName.toLowerCase()}`,
      name: categoryName,
    },
    {
      name: productName,
    },
  ];

  const imageGalleryProps = {
    thumbnailPosition: 'left',
    items: state.images.map(i => ({
      original: i.originalSrc,
      thumbnail: i.originalSrc,
    })),
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
          <ImageGallery ref={galleryRef} {...imageGalleryProps} />
        </StyledGallery>
        <Box p={2} width={[1, 1, 1 / 4, 0.3]} style={{ minWidth: 290 }}>
          <Flex flexDirection={['column-reverse', 'column', 'column']}>
            <Box pb={[0, 3]}>
              <RebassText py={1} fontSize={[5, 6]}>
                {productName}
              </RebassText>
              <RebassText pt={1} pb={2} fontSize={[3]}>
                Precio:{' '}
                <RebassText fontSize={[4]} as="span" color="orange">
                  {formattedPrice}
                </RebassText>
              </RebassText>
              <Flex flexDirection="column">
                {productHasVariations && (
                  <Box pb={2}>
                    <Select
                      name="variation"
                      onChange={setVariationIndex}
                      options={product.variants.map((item, index) => ({
                        name: item.title,
                        value: index,
                      }))}
                      labelText={product.options[0].name}
                      required
                    />
                  </Box>
                )}

                <Box pb={3}>
                  <Select
                    name="cantidad"
                    onChange={setAmount}
                    options={
                      !inputDisabled ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : []
                    }
                    disabled={inputDisabled}
                    labelText="Cantidad"
                    required
                  />
                </Box>
              </Flex>
              {state.inventoryLoaded && !state.unitsAvailable && (
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
              <MarkdownText escapeHtml={false}>
                {product.description}
              </MarkdownText>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Dialog
        onDismiss={() => dispatch({ type: actions.hideDialog })}
        isOpen={state.showDialog}
        style={{ position: 'relative' }}
      >
        <Box
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            outline: '1px solid #626363',
            opacity: 0.5,
          }}
          m={3}
        >
          <RebassButton
            bg="transparent"
            p={1}
            onClick={() => dispatch({ type: actions.hideDialog })}
          >
            <VisuallyHidden>Close</VisuallyHidden>
            <div aria-hidden style={{ width: 12, height: 12 }}>
              <svg
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#626363"
                fill="grey"
                style={{ width: 12, height: 12, display: 'block' }}
              >
                <path d="M0 0 L12 12" stroke-width="1" />
                <path d="M12 0 L0 12" stroke-width="1" />
              </svg>
            </div>
          </RebassButton>
        </Box>
        <Flex flexDirection="column" alignItems="center">
          <Box pb={[3]}>
            <Flex justifyContent="center">
              <RebassImage
                src={headerLogo}
                alt="Logotipo new marias"
                aria-hidden
                style={{ maxWidth: '60%' }}
                borderRadius={0}
              />
            </Flex>
          </Box>

          <RebassText pb={3}>
            Acabas de añadir{' '}
            <RebassText fontWeight="bold" as="strong">
              ({state.amount})
            </RebassText>{' '}
            artículo(s) a tu carrito:
          </RebassText>

          <Box pb={[3, 4]}>
            <Flex justifyContent="center">
              <img
                src={
                  productVariations[state.currentVariationIndex].image
                    .originalSrc
                }
                alt="Logotipo new marias"
                aria-hidden
                style={{ maxWidth: 150, maxHeight: 150, display: 'block' }}
              />
            </Flex>
          </Box>

          <Box width={[1, 0.8, 0.6, 0.5]} pb={3}>
            <Flex justifyContent="center">
              <Box width={1}>
                <Flex flexDirection="column">
                  <Flex pb={2}>
                    <RebassText width={0.6}>Subtotal (producto):</RebassText>
                    <RebassText textAlign="right" width={0.4}>
                      {' '}
                      {subtotal}
                    </RebassText>
                  </Flex>
                  <Flex>
                    <RebassText fontWeight="bold" color="pink" width={0.6}>
                      Total del carrito:{' '}
                    </RebassText>
                    <RebassText
                      fontWeight="bold"
                      color="pink"
                      textAlign="right"
                      width={0.4}
                    >
                      {' '}
                      {formattedCurrentSubtotal}
                    </RebassText>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box width={[1, 0.8, 0.6, 0.5]}>
            <Flex
              justifyContent={['initial', 'space-between']}
              flexDirection={['column', 'column', 'row', 'row']}
            >
              <RebassButton
                as={Link}
                to="/tienda/carrito"
                px={[3, 4]}
                py={3}
                mb={[2, 2, 0]}
                bg="orange"
                style={{ textDecoration: 'none' }}
              >
                <RebassText fontSize={1} color="white">
                  Ir a check-out
                </RebassText>
              </RebassButton>
              <RebassButton
                as={Link}
                to="/tienda"
                px={[3, 4]}
                py={3}
                style={{ textDecoration: 'none' }}
              >
                <RebassText fontSize={1} color="white">
                  Seguir comprando
                </RebassText>
              </RebassButton>
            </Flex>
          </Box>
        </Flex>
      </Dialog>
    </Layout>
  );
}

export default ProductDetailContainer;
