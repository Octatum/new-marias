import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import device from '../utilities/device';
import CartCounter from './CartCounter';
import Select from './Select';
import Button from './Button';
import Text from './Text';

const Description = styled.p`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  line-height: normal;
  color: #626363;

  ${device.tablet} {
    order: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${device.tablet} {
    & > ${Description} {
      order: 1;
    }
  }
`;

const SelectsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    order: 3;
  }
`;

const Name = styled.h1`
  width: 110%;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 40px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #626363;
  margin: 0;
  padding: 0;
  ${device.laptop} {
    font-size: 30px;
  }
  ${device.tablet} {
    display: none;
    font-size: 25px;
  }
`;

const Price = styled(Text)`
  ${device.tablet} {
    order: 2;
    margin: 1em 0;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  ${device.tablet} {
    margin: 20px 0;
    order: 4;
    > :not(button) {
      display: none;
    }
    > button {
      flex: 1;
      margin: 0 auto;
    }
  }
`;

const AmountContainer = styled('div')`
  flex: 1;
  margin-right: 10%;

  ${device.tablet} {
    margin: 0;
  }
`;

const ColorContainer = styled('div')`
  flex: 3;
  margin-right: 20%;

  ${device.tablet} {
    margin: 0;
  }
`;

const Detail = props => {
  const {
    product,
    onColorChange,
    onQuantityChange,
    addToCartHandler,
    className,
  } = props;

  const { name: productName, description: productDescription, price } = product;
  const productPrice = price[0].amount / 100;

  // const colors = gallery.map(g => g.value.color);

  return (
    <Container {...{ className }}>
      <Name>{productName}</Name>
      <Price as="h3" size={2}>
        Precio:{' '}
        <Text color="orange" size={2} as="span">
          ${parseFloat(productPrice).toFixed(2)}
        </Text>
      </Price>
      <SelectsContainer>
        {/*
        <ColorContainer>
          <Select
            name="Color o tipo"
            onChange={onColorChange}
            options={colors}
            required
          />
        </ColorContainer>
        */}
        <AmountContainer>
          <Select
            name="Cantidad"
            onChange={onQuantityChange}
            options={[1, 2, 3, 4, 5, 6]}
            required
          />
        </AmountContainer>
      </SelectsContainer>
      <AddToCartContainer>
        <Button fontSize="1.5em" onClick={addToCartHandler}>
          Agregar al carrito
        </Button>
        <CartCounter width="69" height="61" />
      </AddToCartContainer>
      <Description>{productDescription}</Description>
    </Container>
  );
};

export default observer(Detail);
