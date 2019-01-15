import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Button from '../../components/Button';
import device from '../../utilities/device';
import Text from '../../components/Text';
import paymentOptions from './paymentOptions';

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

  > *:first-child,
  > *:last-child {
    margin-top: 3rem;
    margin-bottom: 1em;
  }

  ${device.tablet} {
    padding: 0 5%;
    border: none;
  }
`;

const Field = styled('div')`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
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

const FlexRow = styled('div')`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

const TextFlexCell = styled(Text)`
  flex: ${({ flex }) => flex || 1};
  justify-content: ${({ justify }) => justify || 'initial'};
  box-sizing: border-box;
`;

const PaymentItems = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;

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

  ${device.mobile} {
    margin-left: 0.5em;
  }
`;

const NextStepButton = styled(Button)`
  margin: 0;
  font-size: 18px;
  text-align: center;
  padding: 0.6em 1em;

  ${device.tablet} {
    font-size: 1.3em;
    margin-left: 1rem;
  }
`;

const PaymentItemCell = styled(CellItem)`
  max-height: 4rem;
`;

class PaymentMethodSelection extends Component {
  state = {
    selectedPaymentId: paymentOptions[0].id,
  };

  setPaymentMethod = paymentMethodId => {
    this.setState({
      selectedPaymentId: paymentMethodId,
    });
  };

  render() {
    const { customerAddress, selectedShipping } = this.props;

    return (
      <Container>
        <Helmet title="Método de pago" />
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
              <TextFlexCell flex={3}>{selectedShipping.name}</TextFlexCell>
              <TextFlexCell align="right" as={Link} to="/tienda/checkout/envio">
                Editar
              </TextFlexCell>
            </CellItem>
          </Field>
          <Field direction="column">
            <FlexRow>
              <Text bold>Selección de método de pago</Text>
            </FlexRow>
            <PaymentItems>
              {paymentOptions.map(option => (
                <PaymentItemCell key={option.id}>
                  <TextFlexCell>
                    <PaymentOption
                      onClick={() => this.setPaymentMethod(option.id)}
                      selected={option.id === this.state.selectedPaymentId}
                    />
                  </TextFlexCell>
                  <TextFlexCell flex={9}>
                    <PaymentImage src={option.image} />
                  </TextFlexCell>
                </PaymentItemCell>
              ))}
            </PaymentItems>
          </Field>
          <Field style={{padding: 0}}>
            <Text as={Link} to="/tienda/checkout/envio">
              {'<'} Volver a métodos de envío
            </Text>
            <NextStepButton
              as={Link}
              to={`/tienda/checkout/resumen/${this.state.selectedPaymentId}`}
              color="pink"
            >
              Proceder a pago
            </NextStepButton>
          </Field>
        </Info>
      </Container>
    );
  }
}

export default PaymentMethodSelection;
