import React from 'react';
import styled from 'styled-components';
import device from '../../utilities/device';
import Text from '../Text';

const Layout = styled('div')`
  display: flex;
  padding: 0 0.5em;
`;

const FlexCell = styled('div')`
  flex: ${({ flex }) => flex || 4};
  padding: 0.5em 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  cursor: pointer;
  border: none;
  background: none;
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

function OrderRow(props) {
  const {
    increaseProductAmount,
    decreaseProductAmount,
    removeProduct,
    product,
  } = props;

  const { name, price, amount, thumbnail, id } = product;
  const DEFAULT_SIZE = 1.5;

  return (
    <Layout>
      <FlexCell>
        <Thumbnail
          src={`https://admin.newmarias.com${thumbnail}?w=200&h=200`}
        />
      </FlexCell>
      <FlexCell>
        <Text size={DEFAULT_SIZE} align="center">
          {name}
        </Text>
      </FlexCell>
      <FlexCell>
        <Text size={DEFAULT_SIZE} align="center">
          ${parseFloat(price).toFixed(2)}
        </Text>
      </FlexCell>
      <CustomFlexCell>
        <Button onClick={() => decreaseProductAmount(product.id)}>-</Button>
        <Text color="white" size={DEFAULT_SIZE} align="center">
          {amount}
        </Text>
        <Button onClick={() => increaseProductAmount(product.id)}>+</Button>
      </CustomFlexCell>
      <FlexCell>
        <Text size={DEFAULT_SIZE} align="center">
          ${parseFloat(price * amount).toFixed(2)}
        </Text>
      </FlexCell>
      <FlexCell flex={1}>
        <ButtonText
          onClick={() => removeProduct(id)}
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
