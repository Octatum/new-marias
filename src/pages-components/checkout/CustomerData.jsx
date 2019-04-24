import React from 'react';
import { Link } from '@reach/router';
import Helmet from 'react-helmet';

import styled from 'styled-components';
import device from '../../utilities/device';
import { Formik, Form } from 'formik';
import Text from '../../components/Text';
import Input from '../../components/Input';
import validationSchema from './formValidation';
import FormikSelect from '../../components/FormikSelect';
import Button from '../../components/Button';

const Info = styled.div`
  box-sizing: border-box;
  margin: 20px 0;
  width: 100%;
  padding-left: 25%;
  padding-right: 10%;
  border-right: 3px solid ${({ theme }) => theme.colors.gray};

  ${device.tablet} {
    padding: 0 5%;
    border: none;
  }
`;

const Container = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
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
`;

const Fieldset = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`;

const PaddedText = styled(Text)`
  margin-bottom: 0.5em;
`;

const FlexRow = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const CustomButton = styled(Button)`
  margin-right: 0;
  font-size: 18px;
  cursor: pointer;
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
    <React.Fragment>
      <Helmet title="Datos de cliente" />
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
              <FlexRow style={{ padding: 0 }}>
                <Text as={Link} to="/tienda/carrito">
                  {'<'} Volver al carrito
                </Text>
                <CustomButton color="pink" type="submit">
                  Continuar
                </CustomButton>
              </FlexRow>
            </Info>
          </Container>
        )}
      />
    </React.Fragment>
  );
};
export default CustomerData;
