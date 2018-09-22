import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Breadcrumb from "./../components/Breadcrumb";
import BreadcrumbItem from "./../components/Breadcrumb/BreadcrumbItem";
import OrdersTable from "./../components/OrdersTable";
import Cart from "./../ShoppingCart";
import { products } from "./../constants/productsInfo";
import {observer} from 'mobx-react';


const AppLayout = styled.div`
 
`;

const Container = styled.div`
    width: 75%;
    margin: 0 auto;
    padding-bottom: 40px;
`

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
`;

const TotalSummary = styled.div`
    font-family: 'Archivo Narrow', sans-serif;
    text-align: right;
    font-size: 18px;
    color: #626363;
    margin-bottom: 30px;
    p {
        margin: 5px 0;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    display: block;
    button {
        background-color: #d4ad9f;
        border: none;
        height: 40px;
        margin: 5px 0;
        color: #ffffff;
        font-size: 18px;
        float: right;
        width: ${props => props.width}px;
        :hover {
            cursor: pointer;
        }
    }
    ::after {
        content: "";
        clear: both;
        display: table;
    }
`

class Carrito extends Component {

    deleteOrder = (index) => {
        Cart.deleteOrder(index);
        Cart.decrement();
    }

    decreaseQuantityHandler(index){
        Cart.decreaseQuantity(index);
    }

    increaseQuantityHandler(index){
        Cart.increaseQuantity(index);
    }

    getSubtotal = () => {
        let subTotal = 0.0;
        const orders = Cart.orders;
        for (let i = 0; i < orders.length; i++){
            const price = products.find(p => p.id === orders[i].productId).price;
            subTotal += price * orders[i].quantity;
        }
        return subTotal;
    }

    render() {
        const subTotal = this.getSubtotal();
        return (
            <AppLayout>
                <Navbar/>
                <BreadcrumbContainer>
                    <Breadcrumb>
                        <BreadcrumbItem active>Carrito</BreadcrumbItem>  
                        <BreadcrumbItem>Información del cliente</BreadcrumbItem>  
                        <BreadcrumbItem>Envío</BreadcrumbItem>  
                        <BreadcrumbItem>Pago y facturación</BreadcrumbItem>  
                    </Breadcrumb>
                </BreadcrumbContainer>
                <Container>
                    <OrdersTable 
                        deleteOrderHandler={this.deleteOrder}
                        onDecreaseQuantity={this.decreaseQuantityHandler}
                        onIncreaseQuantity={this.increaseQuantityHandler}/>
                    <TotalSummary>
                        <p>SUBTOTAL</p>
                        <p>${subTotal.toFixed(2)} MXN</p>
                    </TotalSummary>
                    <ButtonContainer width={115}>
                        <button>Regresar</button>
                    </ButtonContainer>
                    <ButtonContainer width={156}>
                        <button>Continuar</button>
                    </ButtonContainer>
                </Container>
            </AppLayout>
        );
    }
}
//);
export default observer(Carrito);