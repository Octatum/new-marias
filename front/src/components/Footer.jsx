import React from 'react';
import styled from 'styled-components';

const Layout = styled('footer')`
  width: 100%;
  color: ${({ theme }) => theme.colors.darkgray};
  font-family: ${({ theme }) => theme.fonts.secondary};
  text-align: center;
  padding: 1em;
  box-sizing: border-box;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gray};
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
`;

const Footer = () => {
  return (
    <Layout>
      Copyright © Todos los derechos reservados. New Marias 2018. Desarrollado
      por Katartico | Octatum.
    </Layout>
  );
};

export default Footer;
