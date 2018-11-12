import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import device from '../utilities/device';
import CartCounter from './CartCounter';
import Select from './Select';
import Button from './Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${device.mobile} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const SelectsContainer = styled.div`
  /*display: block;*/
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${device.mobile} {
    display: block;
    > div:nth-child(1),
    > div:nth-child(2) {
      display: block;
      width: 100%;
      margin-left: 0px;
    }
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
  ${device.mobile} {
    display: none;
  }
  ${device.laptop} {
    font-size: 30px;
  }
  ${device.tablet} {
    font-size: 25px;
  }
`;
const Price = styled.h3`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #626363;
  margin: 7px 0;
  ${device.mobile} {
    color: #d4ad9f;
    ::before {
      content: 'Precio:\00a0\00a0\00a0';
      color: #626363;
      font-size: 14px;
    }
  }
  ${device.tablet} {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  line-height: normal;
  color: #626363;
`;

const AddToCartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  ${device.tablet} {
    margin: 20px 0;
  }

  ${device.mobile} {
    width: 93%;
    margin: 56px auto;
    > div {
      display: none;
    }
    > button {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const AmountContainer = styled('div')`
  flex: 1;
  margin-right: 10%;
`;

const ColorContainer = styled('div')`
  flex: 3;
  margin-right: 20%;
`;

const Detail = props => {
  const { product, onColorChange, onQuantityChange, addToCartHandler } = props;

  const {
    name: productName,
    description: productDescription,
    price: productPrice,
    gallery,
  } = product.entry;

  const colors = gallery.map(g => g.value.color);

  return (
    <Container>
      <Name>{productName}</Name>
      <Price>${parseFloat(productPrice).toFixed(2)}</Price>
      <SelectsContainer>
        <ColorContainer>
          <Select name="Color o tipo" onChange={onColorChange}>
            {colors.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </ColorContainer>

        <AmountContainer>
          <Select name="Cantidad" onChange={onQuantityChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Select>
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
