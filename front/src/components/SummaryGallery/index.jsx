import React, { Component } from 'react';
import styled from 'styled-components';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';
import Current from '../Gallery/Current';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 100px;
`;

const Button = styled.button`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  height: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  width: 90px;
  height: 90px;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

class SummaryGallery extends Component {
  state = {
    currentImageIndex: 0,
  };

  previousImageHandler = () => {
    if (this.state.currentImageIndex > 0) {
      let currentImageIndex = this.state.currentImageIndex - 1;
      this.setState({ currentImageIndex: currentImageIndex });
    }
  };

  nextImageHandler = () => {
    if (this.state.currentImageIndex < this.props.images.length - 1) {
      let currentImageIndex = this.state.currentImageIndex + 1;
      this.setState({ currentImageIndex: currentImageIndex });
    }
  };

  render() {
    return (
      <Container>
        <Button
          onClick={() => {
            this.previousImageHandler();
            this.props.previousHandler();
          }}
          src={backButtonImg}
        />
        <ImageContainer>
          <Image src={this.props.images[this.state.currentImageIndex]} />
        </ImageContainer>
        <Button
          onClick={() => {
            this.nextImageHandler();
            this.props.nextHandler();
          }}
          src={forwardButtonImg}
        />
      </Container>
    );
  }
}
export default SummaryGallery;
