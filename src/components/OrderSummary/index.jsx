import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    > h1 {
    margin-left: 2%;
    }
    font-family: 'Archivo Narrow', sans-serif;
    color: #626363;
    font-size: 14px;
    box-sizing: border-box;
    padding: 15px;
    > div:last-child {
        border-bottom: none;
    }
`

const Field = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 5% 12px 5%;
    vertical-align: middle;
    h1 {
        align-self: center;
    }
`

const Section = styled.div`
    border-bottom: 2px solid #d6d8db;
`

const Total = styled.h1`
    font-size: 24px;
`

const ProductImage = styled.div`
    width: 65px;
    height: 65px;
    background: #c4c4c4;
`
const ProductView = styled.div`
    display: flex;
    flex-direction: row;
    h1 {
        margin-left: 15px;
    }
`

const ProductSummary = (props) => (
    <Container>
        <h1>Resumen</h1>
        <Section>
            <Field>
                <ProductView>
                    <ProductImage/>
                    <h1>({props.quantity})</h1>
                    <h1>{props.name}</h1>
                </ProductView>
                <h1>${props.price.toFixed(2)}</h1>
            </Field>
        </Section>
        <Section>
            <Field>
                <h1>Subtotal</h1>
                <h1>${(props.price * props.quantity).toFixed(2)}</h1>
            </Field>
            <Field>
                <h1>Envío</h1>
                <h1>${props.shipping.toFixed(2)}</h1>
            </Field>
        </Section>
        <Section>
            <Field>
                <h1>Total</h1>
                <Total>${(props.price * props.quantity + props.shipping).toFixed(2)}</Total>
            </Field>
        </Section>
    </Container>
);
export default ProductSummary;