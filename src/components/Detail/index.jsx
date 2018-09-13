import React from 'react'
import shoppingCartImg from './assets/shoppingcart.png';
import styled from 'styled-components';

const Container = styled.div`
    display: block;
    max-width: 352px;
    margin-left: 60px;
`
const Button = styled.button`
    width: 74%;
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
`
const Cart = styled.div`
    height: 100%;
    width: 100%;
    font-family: 'Archivo Narrow', sans-serif;
    background-image: url(${shoppingCartImg});
    background-size: cover;                      
    background-repeat: no-repeat;
    background-position: center center;
    position: relative; 
    ::after {
        position: absolute;
        left: 34px;
        top: 20px;
        content: "${props => props.quantity}";
        color: #ffffff;
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
`
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
`

const CartContainer = styled.div`
    display: inline-block;
    width: 69px;
    height: 60px;
    position: relative;
    left: 40px;
    top: 20px;
`

const Description = styled.p`
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 18px;
    line-height: normal;
    color: #626363;    
`

const ColorContainer = styled.div`
    width: 40%;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 12px;
    color: #626363;
    float: left;
    label {
        display: block;
    }
    select {
        margin-top: 7px;
        width: 100%;
    }
`

const QuantityContainer = styled.div`
    width: 20%;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 12px;
    color: #626363;
    float: left;
    margin-left: 70px;
    label {
        display: block;
    }
    select {
        margin-top: 7px;
        width: 100%;
    }
`

const Detail = (props) => (
    <Container>
        <Name>{props.name}</Name>
        <Price>${props.price.toFixed(2)}</Price>
        <ColorContainer>
            <label>Color:</label>
            <select>
                <option>Azul</option>
                <option>Rojo</option>
                <option>Amarillo</option>        
            </select>
        </ColorContainer>
        <QuantityContainer>
            <label>Cantidad:</label>
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>        
            </select>
        </QuantityContainer>
        <Button>Agregar al carrito</Button>
        <CartContainer>        
            <Cart quantity={1}/>
        </CartContainer>
        <Description>{props.description}</Description>
    </Container>
)

export default Detail;