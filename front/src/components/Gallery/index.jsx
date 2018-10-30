import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';
import device from './../../utilities/device';
import Current from './Current';

const Container = styled.div`
  width: 65%;
  ${device.mobile} {
    min-width: 100%;
    margin: 0;
  }
`;

const CurrentImageContainer = styled.div`
  width: 75%;
  height: auto;
  float: left;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  ${device.mobile} {
    width: 100%;
  }
`;

const CurrentImage = styled.div`
  display: block;
  float: left;
  width: 80%;
  padding-bottom: 80%;
  background-color: #cccccc;
  background: url(https://admin.newmarias.com/${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${device.mobile} {
    width: 70%;
    padding-bottom: 70%;
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
  width: 4%;
  height: 29px;
  margin: 0 4.25%;
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
    width: 7px;
    height: 16px;
  }
`;

const Nextbutton = styled.button`
  width: 4%;
  height: 29px;
  margin: 0 4.25%;
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
    width: 7px;
    height: 16px;
  }
`;

const ImagesContainer = styled.div`
  float: left;
  width: 73%;
  ${device.mobile} {
    display: none;
  }
`;

const ImgPreview = styled.div`
  background-color: #cccccc;
  display: block;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 7px;
  background: url(https://admin.newmarias.com/${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  :hover {
    cursor: pointer;
  }
`;

const BackContainer = styled.div`
  width: 25%;
 /* float: left;*/
  display: flex:
  flex-direction: row;
  padding: 0;
  position: relative;
  button {
    width: 10%;
    margin-right: 10%;
  }
  ${device.mobile} {
    display: none;
  }
`;

class Gallery extends Component {
  state = {
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
      this.setState({ currentImage: this.props.images[currentIndex - 1]});
    }
  };

  changeCurrentImage = source => {
    this.setState({ currentImage: source });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({currentImage: nextProps.images[0]});
  }

  render() {

    const images = this.props.images.map(source => (
      <ImgPreview
        key={source}
        onClick={() => this.changeCurrentImage(source)}
        src={source}
      />
    ));

    const dots = this.props.images.map((image, index) => {
      return index === this.props.images.indexOf(this.state.currentImage)
        ? true : false;
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
        <Current dots={dots} />
      </Container>
    );
  }
}

export default Gallery;
