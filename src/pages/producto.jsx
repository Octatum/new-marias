import React, { Component } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Detail from '../components/Detail';
import {observer} from 'mobx-react';
import CategoryState from "./../CategoryState";
import CounterStore from "./../ShoppingCart";
import {categories} from "./../constants/categories.js";
import {products} from "./../constants/productsInfo";
import Breadcrumb from "./../components/Breadcrumb";
import BreadcrumbItem from "./../components/Breadcrumb/BreadcrumbItem";
import Product from '../components/Products/Product';

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

const imagesRed = [
  "http://artesaniasdecolombia.com.co/Documentos/Galeria/5257_esmaltarte-vajilla-ceramica-1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3B3SovcBGQTCwkWjZ_GX7fSBZd40dPl2oPcIIJZ0fMvfNtTQ6lw",
  "https://ae01.alicdn.com/kf/HTB1jYdmlbsTMeJjy1zcq6xAgXXaF/Estilo-Europeo-elegante-rojo-cer-mica-carne-plato-taza-de-t-platillo-porcelana-familia-vajilla-regalos.jpg_640x640.jpg",
  "https://cdn-static.westwing.com/image/upload/f_auto,q_auto,h_240/club/es/product/IT14CAE01-209/1"
];

const imagesYellow = [
  "http://1.bp.blogspot.com/-BF6-wPxntpM/Tgm4TVncyiI/AAAAAAAAAaE/6hywIrp4t6o/s400/28-06-2011%25281%2529%2B008.jpg",
  "http://www.naldo.com.ar/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/2/0/202182_002.jpg",
  "http://torresferreras.es/wp-content/uploads/2017/12/plato_cuenco_cazuela_de_la_abuela_retro_vintage_ceramica_torres_ferreras-1024x614.jpg",
  "https://st2.depositphotos.com/1007678/8091/i/950/depositphotos_80917616-stock-photo-traditional-crockery-bowls-made-of.jpg"
];

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida libero risus, eu aliquet mauris pharetra non. Quisque lacinia, felis vitae tempus porttitor, arcu massa aliquam mi, ac volutpat velit arcu eu velit. Curabitur at sodales massa, ut tincidunt nunc. ";

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      currentImages: images,
      currentColor: "Blue"
    };
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentWillMount() {
    console.log("componentwillmount producto id: " + CounterStore.currentProduct);

    const currentProduct = products.find(function(p) {
      return p.id === CounterStore.currentProduct
    });

    this.setState({
      currentProduct: currentProduct
    });
  }

  handleChangeColor (e) {

    this.setState({ boardAddModalShow: true }, () => {
        console.log("Current " + this.state.currentImages);
        if (this.state.currentColor === "Red") {
          this.setState({
            currentImages: imagesRed
          });
        } else if (this.state.currentColor === "Yellow") {
          this.setState({
            currentImages: imagesYellow
          });
        } else {
          this.setState({
            currentImages: images
          });
        }
    });

    this.setState({
      currentColor: e.target.value
    });

    if (this.state.currentColor === "Red") {
      this.setState({
        currentImages: imagesRed
      });
    }

    this.setState({ boardAddModalShow: true }, () => {
        console.log("AFTER STATE " + this.state.currentColor);
    });
    
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
            images={this.state.currentImages}
            color={this.state.currentColor}
          />
          <Detail
            name={this.state.currentProduct.name}
            price={this.state.currentProduct.price}
            description={description}
            onChange={this.handleChangeColor}
          />
        </Container>
      </AppLayout>
    )
  }
}

export default observer(Producto);
