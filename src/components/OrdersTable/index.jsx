import React from 'react';
import styled from 'styled-components';
import OrderRow from "./OrderRow";
import Cart from "./../../ShoppingCart";
import { products } from "./../../constants/productsInfo";

const ContentTable = styled.table`
    margin: 0 auto;
    margin-top: 20px;
    font-size: 20px;
    width: 100%;
    font-family: 'Archivo Narrow', sans-serif;
    color: #ffffff;
`;

const TableHead = styled.thead`
    background-color: #d4ad9f;
    width: 100%;
    text-align: center;
    th {
        width: 19%;
        height: 47px;
        line-height: 47px;
        border: none;
    }
    th:last-child {
        width: 5%;
    }
`;

const OrdersTable = ({deleteOrderHandler, onDecreaseQuantity, onIncreaseQuantity}) => {

    const orders = Cart.orders;
    let prodRows = null;
    prodRows = orders.map((o, index) => {
        const prod = products.find(p => 
            o.productId === p.id
        );
        return (<OrderRow 
                    name={prod.name} 
                    price={prod.price} 
                    quantity={o.quantity} 
                    deleteOrderHandler={() => deleteOrderHandler(index)}
                    onDecreaseQuantity={() => onDecreaseQuantity(index)}
                    onIncreaseQuantity={() => onIncreaseQuantity(index)}
                    />);
    });

    return (
        <ContentTable> 
            <TableHead>
                <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </TableHead>
            <tbody>
                {prodRows}
            </tbody>
        </ContentTable>
    );
}
export default OrdersTable;