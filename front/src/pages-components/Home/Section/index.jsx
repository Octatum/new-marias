import React from 'react';
import styled from 'styled-components';
import device from './../../../utilities/device';

const Container = styled.section`
  overflow: visible!important;
  border-top: 1px solid #626363;
  width: 90%;
  padding-top: 30px;
  margin: 0 auto;
  margin-bottom: 100px;
  position: relative;
  h2 {
    font-size: 30px;
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
  }
    p {
        font-family: 'Archivo Narrow', sans-serif;
        color: #626363;
        font-size: 20px;
    }
    ::before {
        position: absolute;
        top: -30px;
        height: 50px;
        width: ${({titleWidth}) => titleWidth};
        content: '';
        background-color: #ffffff;
        background-image: url(${({titleSrc}) => titleSrc});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    ${device.mobile}{
        margin-bottom: 60px;
    }
`

const Section = (props) => {
    console.log(props.children);
    return(
        <Container 
            titleSrc={props.titleSrc}
            titleWidth={props.titleWidth}>
            {props.children}
        </Container>
    )
}
export default Section;