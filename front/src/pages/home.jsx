import React from 'react';
import SlideShow from './../pages-components/Home/SlideShow';
import AppLayout from '../components/AppLayout';
import NuestraTienda from './../pages-components/Home/NuestraTienda';
import QuienesSomos from './../pages-components/Home/QuienesSomos';
import Contacto from './../pages-components/Home/Contacto';

const Home = () => {
  return (
    <AppLayout>
      <SlideShow />
      <NuestraTienda />
      <QuienesSomos />
      <Contacto />
    </AppLayout>
  );
};
export default Home;
