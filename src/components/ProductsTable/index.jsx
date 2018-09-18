import React from 'react';
import styled from 'styled-components';
import ProductRow from "./ProductRow";

const ContentTable = styled.table`
    margin: 0 auto;
    margin-top: 20px;
    font-size: 20px;
    width: 75%;
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
    }
    th:last-child {
        width: 5%;
    }
`;

const ProductsTable = () => (
    <ContentTable> 
        <TableHead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
            </tr>
        </TableHead>
        <tbody>
            <ProductRow name="Vasija" price={800}/>
            <ProductRow name="Vasija" price={800}/>
            <ProductRow name="Vasija" price={800}/>
        </tbody>
    </ContentTable>
);
export default ProductsTable;