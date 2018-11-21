import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Button from '../../components/Button';
import device from '../../utilities/device';
import Text from '../../components/Text';
import paypalImage from './assets/paypal.png';

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 35rem;
`;

const Info = styled.div`
  box-sizing: border-box;
  margin: 20px 0;
  width: 100%;
  padding-left: 25%;
  padding-right: 10%;
  border-right: 3px solid ${({ theme }) => theme.colors.gray};

  > *:first-child, > *:last-child {
    margin-top: 3rem;
    margin-bottom: 1em;
  }
`;

const CellItem = styled('div')`
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1em 0.75em;
  box-sizing: border-box;
  justify-content: space-between;

  ${Field} > &:not(:first-child) {
    border-top: none;
  }

  ${({ center }) =>
    center &&
    `
    align-items: center;
  `};
`;

const Field = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({direction}) => direction};
`;

const FlexRow = styled('div')`
  width: 100%;
  margin-bottom: 0.5rem;
`;

const TextFlexCell = styled(Text)`
  flex: ${({ flex }) => flex || 1};
  justify-content: ${({ justify }) => justify || 'initial'};

`;

const PaymentItems = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;

  > :not(:last-child) {
    border-bottom: none;
  }
`;

const PaymentOption = styled('button')`
  --radius: 2rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 100%;
  box-sizing: border-box;
  width: var(--radius);
  height: var(--radius);
  background: white;
  transition: 0.3s ease-in-out all;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.gray};
  }

  ${({ selected }) =>
    selected &&
    `
    border-width: calc(var(--radius) / 3.5);

    :hover {
      background: white;
    }
  `}
`;

const PaymentImage = styled('img')`
  max-height: 100%;

`;

const NextStepButton = styled(Button)`
  margin: 0;
  font-size: 1.5em;
`;

const paymentOptions = [
  {
    id: 'paypal',
    name: 'paypal',
    image: paypalImage,
  }
];

const PaymentItemCell = styled(CellItem)`
  max-height: 4rem;
`;

class PaymentMethodSelection extends Component {

  render() {
    const { customerAddress, selectedShipping } = this.props;

    return (
      <Container>
        <Info>
          <Field direction="column">
            <CellItem>
              <TextFlexCell as="h2" bold>
                Direccion de envío
              </TextFlexCell>
              <TextFlexCell flex={3}>
                {customerAddress.street}, {customerAddress.suburb},{' '}
                {customerAddress.city}, {customerAddress.state},{' '}
                {customerAddress.country}
              </TextFlexCell>
              <TextFlexCell
                align="right"
                as={Link}
                to="/tienda/checkout/cliente"
              >
                Editar
              </TextFlexCell>
            </CellItem>
            <CellItem>
              <TextFlexCell as="h2" bold>
                Envío
              </TextFlexCell>
              <TextFlexCell flex={3}>
                {selectedShipping.name}
              </TextFlexCell>
              <TextFlexCell
                align="right"
                as={Link}
                to="/tienda/checkout/envio"
              >
                Editar
              </TextFlexCell>
            </CellItem>
          </Field>
          <Field direction="column">
            <FlexRow>
              <Text bold>Pagos y facturación</Text>
            </FlexRow>
            <PaymentItems>
              {paymentOptions.map(option => (
                <PaymentItemCell key={option.id}>
                  <TextFlexCell>
                    <PaymentOption />
                  </TextFlexCell>
                  <TextFlexCell flex={9}>
                    <PaymentImage src={option.image} />
                  </TextFlexCell>
                </PaymentItemCell>
              ))}
            </PaymentItems>
          </Field>
          <Field>
            <Text as={Link} to="/tienda/checkout/envio">
              {'<'} Volver a información de cliente
            </Text>
            <NextStepButton
              as={Link}
              to="/tienda/checkout/facturacion"
              color="palebrown"
            >
              Continuar
            </NextStepButton>
          </Field>
        </Info>
      </Container>
    );
  }
}

export default PaymentMethodSelection;
