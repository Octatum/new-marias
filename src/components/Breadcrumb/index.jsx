import React from 'react';
import styled from 'styled-components';
import forwardButtonImg from './assets/forwardbutton.png';
import device from './../../utilities/device';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 22px;
  font-family: 'Archivo Narrow', sans-serif;
  box-sizing: border-box;
  padding-left: 4%;
  ${device.mobile} {
    width: 95vw;
    margin: 0;
    height: auto;
  }
`;

const BreadcrumbItem = styled.div`
  font-size: 20px;
  display: inline-block;
  margin-right: 40px;
  margin-bottom: 4px;
  position: relative;
  font-size: 20px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: #626363;
  ::after {
    color: black;
    position: absolute;
    right: -24px;
    top: 7px;
    width: 10px;
    height: 10px;
    content: '';
    background-image: url(${forwardButtonImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: block;
  }
`;

const Breadcrumb = props => {
  let children = React.Children.toArray(props.children);
  const breadcrumbs = children.map(function(b) {
    return (
      <BreadcrumbItem active={b.props.active}>
        {b.props.children}
      </BreadcrumbItem>
    );
  });
  return <Container>{breadcrumbs}</Container>;
};
export default Breadcrumb;
