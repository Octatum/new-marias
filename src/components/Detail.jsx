import React from 'react';
import styled from 'styled-components';
import device from '../utilities/device';
import CartCounter from './CartCounter';
import Select from './Select';
import Button from './Button';
import Text from './Text';

const Description = styled.p`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  line-height: normal;
  color: #626363;

  ${device.tablet} {
    order: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${device.tablet} {
    & > ${Description} {
      order: 1;
    }
  }
`;

const SelectsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    order: 3;
  }
`;

const Name = styled.h1`
  width: 110%;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 40px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #626363;
  margin: 0;
  padding: 0;
  ${device.laptop} {
    font-size: 30px;
  }
  ${device.tablet} {
    display: none;
    font-size: 25px;
  }
`;

const Price = styled(Text)`
  ${device.tablet} {
    order: 2;
    margin: 1em 0;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  ${device.tablet} {
    margin: 20px 0;
    order: 4;
    > :not(button) {
      display: none;
    }
    > button {
      flex: 1;
      margin: 0 auto;
    }
  }
`;

const AmountContainer = styled('div')`
  flex: 1;
  margin-right: 10%;

  ${device.tablet} {
    margin: 0;
  }
`;

const VariationContainer = styled('div')`
  flex: 3;
  margin-right: 20%;

  ${device.tablet} {
    margin: 0;
    padding-bottom: 1em;
  }
`;

const Detail = props => {
  const {
    product,
    variationChangeHandler,
    onQuantityChange,
    addToCartHandler,
    className,
  } = props;

  const { name, description, price, meta } = product;
  const { variations = [] } = meta;
  const productPrice = price[0].amount / 100;
  console.log(product);

  return (
    <Container className={className}>
      <Name>{name}</Name>
      <Price as="h3" size={2}>
        Precio:{' '}
        <Text color="orange" size={2} as="span">
          ${parseFloat(productPrice).toFixed(2)}
        </Text>
      </Price>
      <SelectsContainer>
        {variations.map(variation => (
          <VariationContainer key={variation.name}>
            <Select
              name={variation.name}
              onChange={e => variationChangeHandler(e.target.value)}
              options={variation.options.map(item => ({
                value: item.id,
                name: item.name,
              }))}
              labelText={variation.name}
              required
            />
          </VariationContainer>
        ))}

        <AmountContainer>
          <Select
            name="Cantidad"
            labelText="Cantidad"
            onChange={onQuantityChange}
            options={[1, 2, 3, 4, 5, 6]}
            required
          />
        </AmountContainer>
      </SelectsContainer>
      <AddToCartContainer>
        <Button fontSize="1.5em" onClick={addToCartHandler}>
          Agregar al carrito
        </Button>
        <CartCounter width="69" height="61" />
      </AddToCartContainer>
      <Description>{description}</Description>
    </Container>
  );
};

export default Detail;
