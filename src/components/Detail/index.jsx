import React from 'react';
import shoppingCartImg from './assets/shoppingcart.png';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import CounterStore from './../../ShoppingCart';
import device from './../../utilities/device';
import CartCounter from './CartCounter';
import Select from './Select';
import './../setup.css';

const Container = styled.div`
  display: block;
  width: 30%;
  margin-left: 5%;
  ${device.mobile} {
    width: 77%;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const Button = styled.button`
  width: 65%;
  padding: 14px 10px;
  background-color: #626363;
  border: none;
  margin-right: 25px;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  :hover {
    cursor: pointer;
  }
  ${device.laptop} {
    font-size: 20px;
    width: 60%;
    padding: 10px;
  }
  ${device.tablet} {
    font-size: 17px;
    width: 60%;
    padding: 5px;
  }
  ${device.mobile} {
    width: 100%;
    margin-top: 56px;
    height: 65px;
    font-size: 28px;
  }
`;

const SelectsContainer = styled.div`

  ::after {
    content: "";
    clear: both;
    display: table;
  }

  /*display: block;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    flex-grow: 1;
  }
  
  > div:last-child {
    margin-left: 70px;
    flex-grow: 0.2;
  }

  ${device.mobile} {
    display: block;
    > div:nth-child(1),
    > div:nth-child(2) {
      display:block;
      width: 100%;
      margin-left: 0px;
    }
  }

`

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
      content: "Precio:\00a0\00a0\00a0";
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
  width: 110%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > button, > div {
    align-self: center;
  }
  margin: 30px 0;
  ${device.tablet}{
    margin: 20px 0;
  }
  ${device.mobile}{
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
`

const Detail = props => {
  return (
  <Container>
    <div>
      <Name>{props.name}</Name>
      <Price>${props.price.toFixed(2)}</Price>
      <SelectsContainer>
        <Select name="Color" onChange={props.onChange}>
          <option value="Blue">Azul</option>
          <option value="Red">Rojo</option>
          <option value="Yellow">Amarillo</option>
        </Select>
        <Select name="Cantidad" onChange={props.onChangeQuantity}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </SelectsContainer>
      <AddToCartContainer>
        <Button
          onClick={() => {
            CounterStore.increment();
            props.addingOrderHandler();
          }}>
          Agregar al carrito
        </Button>
        <CartCounter
            quantity={CounterStore.counter}
            width="69"
            height="61"/>
      </AddToCartContainer>
    </div>
    <div>
      <Description>{props.description}</Description>
    </div>
  </Container>
)};

export default observer(Detail);
