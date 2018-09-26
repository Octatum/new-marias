import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';
import device from './../../utilities/device';
import Current from './Current';

const Container = styled.div`
  min-width: 760px;
  ${device.mobile} {
    min-width: 100%;
    margin:0;
  }
`;

const CurrentImageContainer = styled.div`
  float: left;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  ${device.mobile} {
    width: 100%;
  }
`;

const CurrentImage = styled.img`
  display: block;
  float: left;
  width: 450px;
  height: 450px;
  ${device.mobile} {
    width: 248px;
    height: 248px;
  }
`;

const BackButton = styled.button`
  display: block;
  width: 13px;
  height: 29px;
  margin-right: 25px;
  float: left;
  :hover {
    cursor: pointer;
  }
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
`;

const PreviousButton = styled.button`
  width: 13px;
  height: 29px;
  margin: 0 25px;
  align-self: center;
  :hover {
    cursor: pointer;
  }
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  ${device.mobile} {
    width:7px;
    height: 16px;
  }
`;

const Nextbutton = styled.button`
  width: 13px;
  height: 29px;
  margin: 0 25px;
  align-self: center;
  :hover {
    cursor: pointer;
  }
  background-image: url(${forwardButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  ${device.mobile} {
    width:7px;
    height: 16px;
  }
`;

const ImagesContainer = styled.div`
  float: left;
  width: 145px;
  margin-right: 30px;
  img {
    display: block;
    width: 100%;
    height: 145px;
    margin-bottom: 7px;
  }
  img:hover {
    cursor: pointer;
  }

  ${device.mobile} {
    display: none;
  }

`;

const BackContainer = styled.div`
  float: left;
  padding: 0;
  position: relative;
  ${device.mobile} {
    display:none;
  }
`;

class Gallery extends Component {
  state = {
    currentColor: this.props.currentColor,
    currentImage: this.props.images[0],
  };

  nextImage = () => {
    const currentIndex = this.props.images.indexOf(this.state.currentImage);
    if (currentIndex < this.props.images.length - 1) {
      this.setState({ currentImage: this.props.images[currentIndex + 1] });
    }
  };

  previousImage = () => {
    const currentIndex = this.props.images.indexOf(this.state.currentImage);
    if (currentIndex > 0) {
      this.setState({ currentImage: this.props.images[currentIndex - 1] });
    }
  };

  changeCurrentImage = source => {
    this.setState({ currentImage: source });
  };

  render() {

    const images = this.props.images.map(source => (
      <img
        key={source}
        onClick={() => this.changeCurrentImage(source)}
        src={source}
      />
    ));

    const dots = this.props.images.map((image, index) => {
      return index === this.props.images.indexOf(this.state.currentImage)? true : false;
    });

    return (
      <Container>
        <BackContainer>
          <Link to="/">
            {' '}
            <BackButton />{' '}
          </Link>
          <ImagesContainer>{images}</ImagesContainer>
        </BackContainer>
        <CurrentImageContainer>
          <PreviousButton onClick={this.previousImage.bind(this)} />
          <CurrentImage src={this.state.currentImage} />
          <Nextbutton onClick={this.nextImage.bind(this)} />
        </CurrentImageContainer>
        <Current 
          dots={dots}/>
      </Container>
    );
  }
}

export default Gallery;
