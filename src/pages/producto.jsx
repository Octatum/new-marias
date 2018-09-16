import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Detail from '../components/Detail';
import {observer} from 'mobx-react';
import CategoryState from "./../CategoryState";
import {ALEBRIJES, BOLSAS, CAJAS, DECORACION, 
  MOLCAJETES, TORTILLEROS, categories} from "./../constants/categories.js"

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 40px 24px;
  flex-wrap: wrap;
`

const images = [
  "https://media-cdn.tripadvisor.com/media/photo-s/0d/cc/c2/a2/las-mejores-piezas-de.jpg",
  "https://ae01.alicdn.com/kf/HTB1ROweKpXXXXbYXpXXq6xXFXXXp/D-a-de-la-cosecha-artesan-as-rojo-chino-artesan-a-linterna-con-vidrio-roto.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZinzJWJ_omGpyyJDiMIHixEkS5k9AKiKl4vkGJ7OKU58UjqHL",
  "https://http2.mlstatic.com/2-medios-jarrones-pared-barro-laton-artesania-mexicana-ja12-D_NQ_NP_607210-MLM26334053752_112017-F.jpg"
];

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. ";

const Producto = () => (
  <AppLayout>
    <Navbar />
    <Container>
      <Gallery 
        category={categories.find(c => c.id === CategoryState.current).name}
        images={images}/>
      <Detail
        name="Vajilla de cerámica"
        price={800}
        description={description}/>
    </Container>
  </AppLayout>
)

export default observer(Producto);