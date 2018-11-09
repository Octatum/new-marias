import React from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 29px;
  color: #82928c;
  text-align: center;
  margin-bottom: 10px;
`

const P = styled.p`
  font-size: 22px;
  color: #626363;
  text-align: center;
  line-height: 1.64;
  width: 85%;
  margin: 0 auto;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Archivo Narrow', sans-serif;
`

const Picture = styled.div`
    display: block;
    width: 100%;
    padding-bottom: 90%;
    margin-top: 10px;
    background-color: #c4c4c4;
    background-image: url(${({src}) => src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    :hover {
        cursor: pointer;
    }
`

const Sucursal = (props) => {
    return(
        <Container>
          <H3>{props.name}</H3>
          <P>{props.address}</P>
          <P>Tel. {props.telephone}</P>
          <Picture />
        </Container>
    );
}
export default Sucursal;