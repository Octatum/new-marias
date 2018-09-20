import React, { Component } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Detail from '../components/Detail';
import {observer} from 'mobx-react';
import CategoryState from "./../CategoryState";
import {categories} from "./../constants/categories.js";
import Breadcrumb from "./../components/Breadcrumb";
import BreadcrumbItem from "./../components/Breadcrumb/BreadcrumbItem";

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 20px 24px;
  width: 1240px;
`;

const images = [
  "https://media-cdn.tripadvisor.com/media/photo-s/0d/cc/c2/a2/las-mejores-piezas-de.jpg",
  "https://ae01.alicdn.com/kf/HTB1ROweKpXXXXbYXpXXq6xXFXXXp/D-a-de-la-cosecha-artesan-as-rojo-chino-artesan-a-linterna-con-vidrio-roto.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZinzJWJ_omGpyyJDiMIHixEkS5k9AKiKl4vkGJ7OKU58UjqHL",
  "https://http2.mlstatic.com/2-medios-jarrones-pared-barro-laton-artesania-mexicana-ja12-D_NQ_NP_607210-MLM26334053752_112017-F.jpg"
];

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. ";

class Producto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: "Azul"
    };

    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleChangeColor (e) {
    this.setState({
      currentColor: e.target.value
    });

    /*this.setState({ boardAddModalShow: true }, () => {
        console.log("AFTER STATE " + this.state.currentColor);
    });*/
  }

  render () {
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbItem>{categories.find(c => c.id === CategoryState.current).name}</BreadcrumbItem>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
          <Gallery
            category={categories.find(c => c.id === CategoryState.current).name}
            images={images}/>
          <Detail
            name="Vajilla de cerámica"
            price={800}
            description={description}
            onChange={this.handleChangeColor}
          />
        </Container>
      </AppLayout>
    )
  }
}

export default observer(Producto);
