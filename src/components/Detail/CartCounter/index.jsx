import React from 'react';
import styled from 'styled-components';
import shoppingCartImg from './../assets/shoppingcart.png';

const Container = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const Counter = styled.div`
    height: 100%;
    width: 100%;
    font-family: 'Archivo Narrow', sans-serif;
    background-image: url(${shoppingCartImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    text-align: center;
    ::after {
        top: calc(50% - ${props => props.height}px);
        position: absolute;
        content: "${props => props.quantity}";
        color: #ffffff;
    }
`;

const CartCounter = ({height, width, quantity}) => (
    <Container height={height} width={width}>
        <Counter quantity={quantity} height={10}/>
    </Container>
);
export default CartCounter;