import React from 'react';
import './../components/setup.css';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import device from './../utilities/device';
import { StaticQuery, graphql } from 'gatsby';
import Cart from './../ShoppingCart';

const AppLayout = styled.div`
    margin-top: 190px;
    ${device.mobile} {
        margin-top: 95px;
    }
    font-family: 'Archivo Narrow', sans-serif;
    color: #626363;
    box-sizing: border-box;
`

const Container = styled.div`
    margin: 0 auto;
    width: 75%;
`

const Title = styled.h1`
    font-size: 28px;
`

const OrderSummary = styled.div`
    background-color: #f2f3f5;
    width: 100%;
    margin-top: 32px;
    margin-bottom: 50px;
    box-sizing: border-box;

    padding: 15px 32px;

    display: flex;
    flex-direction: row;

    > div {
        width: 30%;
    }

    > table {
        width: 70%;
        align-self: center;
        padding: 0;
        margin: 0;
    }

    table th {
        text-align: left;
    }

    table tr td {
        padding: 20px 20px 20px 0;
    }

`

const ProductoPreview = styled.div`
    display: flex;
    flex-direction: row;
    > div:first-child {
        flex-grow: 0;
    }
    > table {
        margin-left: 25px;
    }
`

const Img = styled.div`
    width: 90px;
    height: 90px;
    background-color: #c4c4c4;
    display: block;
    background: url(${({ src }) => src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`

const Products = styled.div`
    display: flex;
    flex-direction: column;
    > div:not(:last-child) {
        margin-bottom: 20px;
    }
`

const OrderDetails = styled.div`
    box-sizing: border-box;
    padding: 5px 10px 15px 10px;
    margin-top: 10px;
    width: 100%;
    border: 1px solid #000000;
    display: flex;
    flex-direction: row;
    > div {
        display: flex;
        flex-direction: column;
    }
    > div:nth-child(1) {
        width: 33%;
    }
    > div:nth-child(2) {
        width: 23%;
    }
    > div:nth-child(3) {
        width: 45%;
    }
    > div > p:first-child {
        margin-bottom: 5px;  
    }
`

const SummaryField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
`

const Label = styled.h2`
    font-size: 20px;
    color: #d4ad9f;
    margin-left: 13px;
`

const Button = styled.button`
    height: 50px;
    width: 20%;
    border: none;
    background-color: #d4ad9f;
    color: #ffffff;
    float: right;
    margin-top: 25px; 
    margin-bottom: 100px;
    font-size: 18px;
    :hover {
        cursor: pointer;
    }
`

const query = graphql`
    query{
        allProductsJson {
            edges {
                node {
                    price,
                    name,
                    id,
                    imagesBlue
                }
            }
        }
    }
`

const getSubtotal = (products) => {
    let subTotal = 0.0;
    const orders = Cart.orders;
    for (let i = 0; i < orders.length; i++) {
      const price = products.find(p => p.id == orders[i].productId).price;
      subTotal += price * orders[i].quantity;
    }
    return subTotal;
}

const shippingCost = 0;

const Resumen = () => {
    return (
        <StaticQuery
            query={query}
            render={data => {
                const products = data.allProductsJson.edges.map(edge => edge.node);
                const prodRows = Cart.orders.map((o, index) => {
                    const prod = products.find(p => o.productId == p.id);
                    return (
                        <ProductoPreview>
                            <Img
                                src={prod.imagesBlue[0]}/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>({o.quantity}) {prod.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </ProductoPreview>
                    );
                });
                return (
                    <AppLayout>
                    <Navbar />
                    <Container>
                        <Title>Tu pedido con New Marías</Title>
                        <OrderSummary>
                            <Products>
                               {prodRows}
                            </Products>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Precio</th>
                                        <th>Enviar a</th>
                                        <th>Número de orden</th>
                                        <th>Fecha de pedido</th>
                                    </tr>     
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${getSubtotal(products).toFixed(2)} MXN</td>
                                        <td>Nombre de usuario y dirección</td>
                                        <td>############</td>
                                        <td>00/00/0000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </OrderSummary>
                        <Label>Detalles del pedido</Label>
                        <OrderDetails>
                            <div>
                                <p>Dirección de envío</p>
                                <p>María Elisa Rios cantú</p>
                                <p>Cerrada del Acueducto #5312, Col Del
                                    Paseo Residencial, Monterrey, N.L., México</p>
                            </div>
                            <div>
                                <p>Método de pago</p>
                                <p>##############</p>
                            </div>
                            <div>
                                <p>Resumen del pedido</p>   
                                <SummaryField>
                                    <p>Productos:</p>
                                    <p>${getSubtotal(products).toFixed(2)}</p>   
                                </SummaryField> 
                                <SummaryField>
                                    <p>Envío:</p>
                                    <p>${shippingCost.toFixed(2)}</p>   
                                </SummaryField> 
                                <SummaryField>
                                    <p>Subtotal:</p>
                                    <p>${(getSubtotal(products) + shippingCost).toFixed(2)}</p>   
                                </SummaryField> 
                                <SummaryField>
                                    <p>Total:</p>
                                    <p>${(getSubtotal(products) + shippingCost).toFixed(2)}</p>   
                                </SummaryField> 
                            </div>   
                        </OrderDetails>
                        <Button>Descargar Resumen</Button>
                    </Container>
                </AppLayout>
             );
        }}/>
    );
}
export default Resumen;


/**
 
  <AppLayout>
            <Navbar />
            <Container>
                <Title>Tu pedido con New Marías</Title>
                <OrderSummary>
                    <Products>
                        <ProductoPreview>
                            <Img/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>(1) Vasija</td>
                                    </tr>
                                </tbody>
                            </table>
                        </ProductoPreview>
                    </Products>
                    <table>
                        <thead>
                            <tr>
                                <th>Precio</th>
                                <th>Enviar a</th>
                                <th>Número de orden</th>
                                <th>Fecha de pedido</th>
                            </tr>     
                        </thead>
                        <tbody>
                            <tr>
                                <td>$1,600.00 MXN</td>
                                <td>Nombre de usuario y dirección</td>
                                <td>############</td>
                                <td>00/00/0000</td>
                            </tr>
                        </tbody>
                    </table>
                </OrderSummary>
                <Label>Detalles del pedido</Label>
                <OrderDetails>
                    <div>
                        <p>Dirección de envío</p>
                        <p>María Elisa Rios cantú
                            Cerrada del Acueducto #5312, Col Del
                            Paseo Residencial, Monterrey, N.L., México </p>
                    </div>
                    <div>
                        <p>Método de pago</p>
                        <p>##############</p>
                    </div>
                    <div>
                        <p>Resumen del pedido</p>   
                        <SummaryField>
                            <p>Productos:</p>
                            <p>$800.00</p>   
                        </SummaryField> 
                        <SummaryField>
                            <p>Envío:</p>
                            <p>$800.00</p>   
                        </SummaryField> 
                        <SummaryField>
                            <p>Subtotal:</p>
                            <p>$1,600.00</p>   
                        </SummaryField> 
                        <SummaryField>
                            <p>Total:</p>
                            <p>$1,600.00</p>   
                        </SummaryField> 
                    </div>   
                </OrderDetails>
                <Button>Descargar Resumen</Button>
            </Container>
        </AppLayout>


 */