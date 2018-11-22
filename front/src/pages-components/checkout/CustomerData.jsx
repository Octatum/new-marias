import React from 'react';
import { Link } from '@reach/router';

import styled from 'styled-components';
import device from '../../utilities/device';
import { Formik, Form } from 'formik';
import Text from '../../components/Text';
import Input from '../../components/Input';
import validationSchema from './formValidation';
import FormikSelect from '../../components/FormikSelect';

const Info = styled.div`
  box-sizing: border-box;
  margin: 20px 0;
  width: 100%;
  padding-left: 25%;
  padding-right: 10%;
  border-right: 3px solid ${({ theme }) => theme.colors.gray};
`;

const Container = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  ${device.mobile} {
    > div:nth-child(1) {
      width: 100%;
      border: none;
    }
    > div:nth-child(2) {
      width: 0%;
    }
  }
`;

const InputRow = styled.div`
  width: 100%;
  min-height: 35px;
  display: flex;
  flex-direction: row;
  margin-bottom: 9px;

  > * {
    flex: 1;
  }

  > :not(:first-child) {
    margin-left: 0.3rem;
  }

  ${device.mobile} {
    flex-wrap: ${({ breakdown }) => (breakdown ? 'wrap' : 'no-wrap')};
    > input,
    > select {
      width: ${({ breakdown }) => (breakdown ? '100%' : '33%')};
    }
    > input {
      margin: 0;
    }
    > input:not(:last-child) {
      margin-bottom: 10px;
    }
    > select {
      margin-bottom: ${({ breakdown }) => (breakdown ? '9px' : '0px')};
    }
    margin-bottom: ${({ breakdown }) => (breakdown ? '47px' : '10px')};
  }
`;

const Fieldset = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`;

const PaddedText = styled(Text)`
  margin-bottom: 0.5em;
`;

const Button = styled.button`
  height: 50px;
  width: 37%;
  border: none;
  background-color: #d4ad9f;
  color: #ffffff;
  float: right;
  margin-top: 29px;
  margin-bottom: 100px;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
`;

const BackButton = styled.button`
  margin-top: 43px;
  border: none;
  background: transparent;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  :hover {
    cursor: pointer;
  }
`;

const stateList = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosi',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

const CustomerData = props => {
  const { onSubmit, initialValues } = props;

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={({ setFieldValue, values }) => (
        <Container>
          <Info>
            <Fieldset>
              <PaddedText bold>Información de contacto</PaddedText>
              <InputRow>
                <Input name="email" placeholder="Correo electrónico" />
              </InputRow>
            </Fieldset>
            <Fieldset>
              <PaddedText bold>Dirección de envío</PaddedText>
              <InputRow breakdown>
                <Input
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Nombre (s)"
                />
                <Input
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Apellidos"
                />
              </InputRow>
              <InputRow>
                <Input
                  name="street"
                  autoComplete="street-address"
                  placeholder="Calle y número"
                />
              </InputRow>
              <InputRow>
                <Input
                  name="suburb"
                  autoComplete="address-line3"
                  placeholder="Colonia"
                />
              </InputRow>
              <InputRow>
                <Input
                  name="city"
                  autoComplete="address-line2"
                  placeholder="Ciudad"
                />
              </InputRow>
              <InputRow>
                <FormikSelect
                  setFieldValue={setFieldValue}
                  autoComplete="country"
                  name="country"
                  options={['México']}
                  placeholder="País"
                  values={values}
                />
                <FormikSelect
                  setFieldValue={setFieldValue}
                  placeholder="Estado"
                  options={stateList}
                  autoComplete="address-line1"
                  name="state"
                  values={values}
                />
                <Input
                  autoComplete="postal-code"
                  name="zipCode"
                  placeholder="Código Postal"
                />
              </InputRow>
              <InputRow>
                <Input
                  autoComplete="tel-national"
                  name="phone"
                  placeholder="Teléfono"
                />
              </InputRow>
            </Fieldset>
            <Link to="/tienda/carrito">
              <BackButton> {'<'} Volver a carrito</BackButton>
            </Link>
            <Button type="submit">Continuar</Button>
          </Info>
        </Container>
      )}
    />
  );
};
export default CustomerData;
