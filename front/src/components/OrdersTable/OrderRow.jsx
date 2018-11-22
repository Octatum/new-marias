import React from 'react';
import styled from 'styled-components';
import device from '../../utilities/device';
import Text from '../Text';

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

  ${({hideTablet}) => hideTablet && `
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
  max-height: 150px;
`;

const Button = styled.button`
  width: 20%;
  border: none;
  background-color: ${({ theme }) => theme.colors.palebrown};
  color: #ffffff;
  width: 1rem;
  ${device.mobile} {
    width: 70%;
  }
`;

const CustomFlexCell = styled(FlexCell)`
  > * {
    background-color: ${({ theme }) => theme.colors.palebrown};
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
  }
`;

function OrderRow(props) {
  const {
    increaseProductAmount,
    decreaseProductAmount,
    removeProduct,
    product,
  } = props;

  const { name, price, amount, thumbnail, type } = product;
  const DEFAULT_SIZE = 1.5;

  return (
    <Layout>
      <FlexCell>
        <Thumbnail
          src={`https://admin.newmarias.com${thumbnail}?w=200&h=200`}
        />
      </FlexCell>
      <ResponsiveFlexCell>
        <ResponsiveText size={DEFAULT_SIZE} align="center">
          {name} ({type})
        </ResponsiveText>
        <TabletFlexCell flex={9}>
          <Text color="palebrown" size={4}>${parseFloat(price * amount).toFixed(2)}</Text>
          <FlexCell>
            <Button onClick={() => decreaseProductAmount(product)}>-</Button>
            <Text color="white" size={DEFAULT_SIZE} align="center">
              {amount}
            </Text>
            <Button onClick={() => increaseProductAmount(product)}>+</Button>
          </FlexCell>
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
          onClick={() => removeProduct(product)}
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
