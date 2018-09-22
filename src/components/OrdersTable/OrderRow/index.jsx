import React from "react";
import styled from "styled-components";
import QuantityControls from "./QuantityControls";

const Picture = styled.div`
    width: 165px;
    height: 165px;
    background-color: #c4c4c4;
    margin: 0 auto;
`

const Td = styled.td`
    padding: 14px;
    color: #626363;
    font-size: 16px;
    text-align: center;
    vertical-align: middle;
`

const OrderRow = ({name, price, quantity}) => (
    <tr>
        <Td>
            <Picture></Picture>
        </Td>
        <Td>
            {name}
        </Td>
        <Td>
            ${price.toFixed(2)} MXN
        </Td>
        <Td>
            <QuantityControls quantity={quantity}/>
        </Td>
        <Td>
            ${price.toFixed(2)} MXN
        </Td>
        <Td>
            x
        </Td>
    </tr>
);

export default OrderRow;