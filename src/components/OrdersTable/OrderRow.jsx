import React from 'react';
import styled from 'styled-components';
import device from '../../utilities/device';
import Text from '../Text';
import { useProducts } from '../CartContext';

const Layout = styled('div')`
  display: flex;
  padding: 0 0.5em;

  ${device.tablet} {
    padding: 1rem;
  }
`;

const FlexCell = styled('div')`
  flex: ${({ flex }) => flex || 4};
  padding: 0.5em 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ hideTablet }) =>
    hideTablet &&
    `
    ${device.tablet} {
      display: none;
    }
  `}
`;

const ButtonText = styled(Text)`
  cursor: pointer;
  border: none;
  background: none;

  ${device.tablet} {
    font-size: 2em;
  }
`;

const Thumbnail = styled('img')`
  max-height: 100px;
  max-width: 100%;
`;

const Button = styled.button`
  width: 20%;
  border: none;
  background-color: ${({ theme }) => theme.colors.pink};
  color: #ffffff;
  width: 1rem;
  ${device.tablet} {
    width: 2rem;
    height: 3rem;
  }
`;

const CustomFlexCell = styled(FlexCell)`
  > * {
    background-color: ${({ theme }) => theme.colors.pink};
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > *:not(:last-child):not(:first-child) {
    margin: 0 0.2rem;
    width: 3.5rem;
  }
`;

const NumberDisplay = styled(Text)`
  background: ${({ theme }) => theme.colors.pink};
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 3rem;
`;

const ResponsiveText = styled(Text)`
  text-align: center;
  width: 100%;

  ${device.tablet} {
    text-align: left;
    flex: 1;
  }
`;

const ResponsiveFlexCell = styled(FlexCell)`
  ${device.tablet} {
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0.5rem;
  }
`;

const TabletFlexCell = styled(FlexCell)`
  display: none;
  width: 100%;
  flex-direction: column;
  > * {
    width: 100%;
  }

  ${device.tablet} {
    display: flex;
    padding: 0;
  }
`;

const OtherFlexCell = styled(FlexCell)`
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0;
`;

function OrderRow(props) {
  const { product, updateQuantity, removeProduct } = props;

  const { title: name, quantity: amount, variant } = product;
  const thumbnail = variant.image.src;
  const price = Number(variant.price);
  const { title: variantTitle } = variant;
  const DEFAULT_SIZE = 1.5;

  async function decreaseProductAmount(product) {
    const { id, quantity } = product;

    if (quantity === 1) return;

    try {
      await updateQuantity(id, quantity - 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function increaseProductAmount(product) {
    const { id, quantity } = product;

    try {
      await updateQuantity(id, quantity + 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <FlexCell>
        <Thumbnail src={thumbnail} />
      </FlexCell>
      <ResponsiveFlexCell>
        <ResponsiveText size={DEFAULT_SIZE} align="center">
          {name} <br />{' '}
          {variantTitle !== 'Default Title' && `(${variantTitle})`}
        </ResponsiveText>
        <TabletFlexCell flex={9}>
          <OtherFlexCell>
            <Text color="pink" size={4}>
              ${parseFloat(price * amount).toFixed(2)}
            </Text>
          </OtherFlexCell>
          <OtherFlexCell>
            <Button onClick={() => decreaseProductAmount(product)}>-</Button>
            <NumberDisplay color="white" size={DEFAULT_SIZE} align="center">
              {amount}
            </NumberDisplay>
            <Button onClick={() => increaseProductAmount(product)}>+</Button>
          </OtherFlexCell>
        </TabletFlexCell>
      </ResponsiveFlexCell>
      <FlexCell hideTablet>
        <Text size={DEFAULT_SIZE} align="center">
          ${parseFloat(price).toFixed(2)}
        </Text>
      </FlexCell>
      <CustomFlexCell hideTablet>
        <Button onClick={() => decreaseProductAmount(product)}>-</Button>
        <Text color="white" size={DEFAULT_SIZE} align="center">
          {amount}
        </Text>
        <Button onClick={() => increaseProductAmount(product)}>+</Button>
      </CustomFlexCell>
      <FlexCell hideTablet>
        <Text size={DEFAULT_SIZE} align="center">
          ${parseFloat(price * amount).toFixed(2)}
        </Text>
      </FlexCell>
      <FlexCell flex={1}>
        <ButtonText
          onClick={() => removeProduct(product.id)}
          as="button"
          alt="eliminar producto"
          align="center"
          lineHeight="1em"
          size={DEFAULT_SIZE}
        >
          &times;
        </ButtonText>
      </FlexCell>
    </Layout>
  );
}

export default OrderRow;
