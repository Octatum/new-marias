import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Button from '../../components/Button';
import device from '../../utilities/device';
import Text from '../../components/Text';

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

  > * {
    margin-top: 3rem;
  }

  ${device.tablet} {
    padding: 0 5%;
    border: none;
  }
`;

const CellItem = styled('div')`
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1em 0.75em;
  box-sizing: border-box;
  justify-content: space-between;

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
`;

const TextFlexCell = styled(Text)`
  flex: ${({ flex }) => flex || 1};
  justify-content: ${({ justify }) => justify || 'initial'};
`;

const ShippingItems = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;

  > :not(:last-child) {
    border-bottom: none;
  }
`;

const PaddedText = styled(Text)`
  margin-bottom: 0.5em;
`;

const ShippingOption = styled('button')`
  --radius: 1rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 0.3rem;
  border-radius: 100%;
  box-sizing: border-box;
  width: var(--radius);
  height: var(--radius);
  background: white;
  transition: 0.3s ease-in-out all;
  cursor: pointer;
  transition: none;

  :hover {
    background: ${({ theme }) => theme.colors.gray};
  }

  ${({ selected }) =>
    selected &&
    `
    padding: 0.2rem;
    border-width: calc(var(--radius) / 3.5);

    :hover {
      background: white;
    }
  `}
`;

const NextStepButton = styled(Button)`
  margin: 0;
  font-size: 18px;
`;

const shippingsOptions = [
  {
    id: 1,
    name: 'Envío 1',
    price: 800,
  },
  {
    id: 2,
    name: 'Envío 2',
    price: 1000,
  },
];

class ShippingSelection extends Component {
  constructor(props) {
    super(props);

    const { setShipping } = this.props;

    setShipping(shippingsOptions[0]);
  }

  setShippingOption(option) {
    const { setShipping } = this.props;

    setShipping(option);
  }

  render() {
    const { customerAddress, selectedShipping } = this.props;

    return (
      <Container>
        <Helmet title="Datos de envío" />
        <Info>
          <Field>
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
          </Field>
          <Field>
            <ShippingItems>
              <PaddedText bold>Selección de método de envío</PaddedText>
              {shippingsOptions.map(option => (
                <CellItem center key={option.id}>
                  <TextFlexCell justify="center">
                    <ShippingOption
                      onClick={() => this.setShippingOption(option)}
                      selected={option.id === selectedShipping.id}
                    />
                  </TextFlexCell>
                  <TextFlexCell flex={8}>{option.name}</TextFlexCell>
                  <TextFlexCell align="right">
                    ${parseFloat(option.price).toFixed(2)}
                  </TextFlexCell>
                </CellItem>
              ))}
            </ShippingItems>
          </Field>
          <Field style={{padding: 0}}>
            <Text as={Link} to="/tienda/checkout/cliente">
              {'<'} Volver a información de cliente
            </Text>
            <NextStepButton
              as={Link}
              to="/tienda/checkout/facturacion"
              color="pink"
            >
              Continuar
            </NextStepButton>
          </Field>
        </Info>
      </Container>
    );
  }
}

export default ShippingSelection;
