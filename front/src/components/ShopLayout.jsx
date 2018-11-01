import React from 'react';
import AppLayout from './layout';
import Navbar from './Navbar';

const ShopLayout = ({ children }) => {
  return (
    <AppLayout>
      <Navbar />
      {children}
    </AppLayout>
  );
};

export default ShopLayout;
