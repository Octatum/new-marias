import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import backButtonImg from './assets/backButton.svg';
import forwardButtonImg from './assets/forwardButton.svg';
import device from './../../utilities/device';
import Current from './Current';

const Container = styled.div`
  display: flex;
`;

const CurrentImageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  ${device.tablet} {
    padding: 0 1rem;
  }
`;

const CurrentImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BackButton = styled.button`
  display: block;
  width: 1em;
  height: 2em;
  cursor: pointer;
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: transparent;
  border: none;
`;

const PreviousButton = styled.button`
  background-color: transparent;
  grid-area: prev;
  height: 29px;
  align-self: center;
  cursor: pointer;
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

const Nextbutton = styled(PreviousButton)`
  grid-area: next;
  background-image: url(${forwardButtonImg});
`;

const ImagesContainer = styled.div`
  flex: 5;
  ${device.tablet} {
    display: none;
  }
`;

const ImgPreview = styled('img')`
  cursor: pointer;
  width: 15vw;
  max-width: 10rem;
  max-height: 10rem;
  margin-bottom: 1em;
`;

const CurrentImageContainer = styled('div')`
  display: grid;
  flex: 15;
  margin: 0 1rem;
  grid-column-gap: 1rem;
  grid-template: minmax(188px, 40vmax) 3rem / 1rem auto 1rem;
  align-items: flex-start;
  grid-template-areas:
    'prev current next'
    'dots dots dots';

  ${device.tablet} {
    grid-template: minmax(min-content, 20rem) 3rem / 1rem auto 1rem;
  }
`;

const BackButtonLayout = styled(Link)`
  flex: 1;

  ${device.tablet} {
    display: none;
  }
`;

class Gallery extends Component {
  state = {
    currentImageIndex: 0,
  };

  nextImage = () => {
    const imagesLength = this.props.images.length;

    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % imagesLength,
    }));
  };

  previousImage = () => {
    const imagesLength = this.props.images.length;

    this.setState(prevState => ({
      currentImageIndex:
        (prevState.currentImageIndex + imagesLength - 1) % imagesLength,
    }));
  };

  changeCurrentImage = index => {
    this.setState(() => ({ currentImageIndex: index }));
  };

  static getDerivedStateFromProps(props, state) {
    if (state.currentImageIndex >= props.images.length) {
      return {
        currentImageIndex: 0,
      };
    }
  }

  render() {
    const images = this.props.images.map((source, index) => (
      <ImgPreview
        key={source}
        onClick={() => this.changeCurrentImage(index)}
        src={`https://admin.newmarias.com/${source}`}
      />
    ));

    const dots = this.props.images.map((_, index) => {
      return index === this.state.currentImageIndex;
    });

    const { className } = this.props;

    return (
      <Container {...{ className }}>
        <BackButtonLayout to="/tienda">
          <BackButton />
        </BackButtonLayout>
        <ImagesContainer>{images}</ImagesContainer>
        <CurrentImageContainer>
          <PreviousButton onClick={this.previousImage} />
          <CurrentImageLayout>
            <CurrentImage
              src={`https://admin.newmarias.com/${
                this.props.images[this.state.currentImageIndex]
              }`}
            />
          </CurrentImageLayout>
          <Nextbutton onClick={this.nextImage} />
          <Current dots={dots} />
        </CurrentImageContainer>
      </Container>
    );
  }
}

export default Gallery;
