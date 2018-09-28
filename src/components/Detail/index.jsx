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
  max-width: 352px;
  margin-left: 60px;
  ${device.mobile} {
    max-width: 77%;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
  }
`;
const Button = styled.button`
  width: 73%;
  height: 65px;
  background-color: #626363;
  border: none;
  margin: 40px 0;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 28px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    width: 100%;
    margin-top: 56px;
  }
`;

const SelectsContainer = styled.div`
  ::after {
    content: "";
    clear: both;
    display: table;
  }

  display: block;
  width: 100%;

  > div {
    float: left;
  }

  > div:nth-child(1) {
    width: 40%;
  }

  > div:nth-child(2) {
    width: 20%;
    margin-left: 70px;
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
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 50px;
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
`;

const CartContainer = styled.div`
  display: inline-block;
  position: relative;
  left: 40px;
  top: 20px;
  ${device.mobile} {
    display:none;
  }
`;

const Description = styled.p`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  line-height: normal;
  color: #626363;
`;

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
      <Button
        onClick={() => {
          CounterStore.increment();
          props.addingOrderHandler();
        }}>
        Agregar al carrito
      </Button>
      <CartContainer>
        <CartCounter
          quantity={CounterStore.counter}
          width="69"
          height="61"/>
      </CartContainer>
    </div>
    <div>
      <Description>{props.description}</Description>
    </div>
  </Container>
)};

export default observer(Detail);
