import React from 'react';
import styled from 'styled-components';
import MunecaImage from './../assets/muneca.png';
import device from './../../../utilities/device';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 72%;
  margin: 0 auto;
  align-items: center;
  ${device.mobile} {
    width: 100%;
  }
`;

const NameAndEmailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
  > input {
    width: 47.5%;
  }
  ${device.mobile} {
    flex-direction: column;
    > input {
      width: 100%;
    }
    > input:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 30px;
  padding-left: 20px;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 20px;
  ${device.mobile} {
    padding: 12px;
    font-size: 16px;
  }
`;

const H2 = styled.h2`
  text-align: center;
  margin-top: 40px;
  color: #626363;
  ${device.mobile} {
    width: 40%;
    text-align: left;
    font-size: 16px!important;
    align-self: flex-start;
    margin-top: 10px;
    font-weight: normal;
  }
`;

const TextAreaContainer = styled.div`
  height: 263px;
  width: 100%;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
  ::before {
    position: absolute;
    content: '';
    background-image: url(${MunecaImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    right: 14px;
    top: 13px;
    width: 205px;
    height: 243px;
    z-index: -99;
    ${device.mobile} {
      width: 114px;
      height: 130px;
    }
  }
  ${device.mobile} {
    height: 144px;
  }
`;

const TextArea = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 20px;
  background: none;
  resize: none;
  ${device.mobile} {
    padding: 12px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: #82928c;
  width: 221px;
  height: 49px;
  border: none;
  font-size: 24px;
  color: #ffffff;
  margin-top: 46px;
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    margin-top: 16px;
    width: 152px;
    height: 33px;
    font-size: 14px;
  }
`;

const ContactForm = () => {
  return (
    <Container>
      <H2>Queremos escucharte, déjanos tu mensaje:</H2>
      <NameAndEmailContainer>
        <Input placeholder="Nombre" type="text" />
        <Input placeholder="Correo electrónico" type="text" />
      </NameAndEmailContainer>
      <TextAreaContainer>
        <TextArea placeholder="Mensaje" />
      </TextAreaContainer>
      <Button>Enviar</Button>
    </Container>
  );
};
export default ContactForm;
