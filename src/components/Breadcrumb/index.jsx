import React from "react";
import styled from 'styled-components';
import forwardButtonImg from './assets/forwardbutton.png';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-bottom: 15px;
    height: 22px;
    font-family: 'Archivo Narrow', sans-serif;
`;

const BreadcrumbItem = styled.div`
    font-size: 20px;
    display: inline;
    margin-right: 40px;
    position: relative;
    font-size: 20px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    font-weight: ${({active}) => active ? "bold" : "normal"};
    color: #626363;

    ::after {
        color: black;
        position: absolute;
        right: -24px;
        top: 12px;
        width: 7px;
        height: 7px;
        content: "";
        background-image: url(${forwardButtonImg});
        background-size: cover;                      
        background-repeat: no-repeat;
        background-position: center center;
        display: block;
    }
`;

const Breadcrumb = (props) => {
    let children = React.Children.toArray(props.children);
    console.log(children);
    const breadcrumbs = children.map(function(b){
        return <BreadcrumbItem active={b.props.active}>{b.props.children}</BreadcrumbItem>
    });
    return (
        <Container>{breadcrumbs}</Container>
    );
};
export default Breadcrumb;