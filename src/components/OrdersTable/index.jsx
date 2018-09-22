import React from 'react';
import styled from 'styled-components';
import OrderRow from "./OrderRow";

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

const OrdersTable = ({ orders }) => {

    let prodRows = null;
    if (orders) {
        prodRows = orders.map(o => {
            return (<OrderRow name={o.name} price={o.price} quantity={1}/>);
        });
    }

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