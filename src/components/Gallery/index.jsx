import React, { useState } from 'react';
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

const CurrentImage = styled('img')`
  max-width: 100%;
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
const ImagePreviewAligner = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
`;

const ImgPreview = styled('img')`
  cursor: pointer;
  margin-bottom: 1em;
  max-width: 100%;
  max-height: 100%;
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
    grid-template-rows: minmax(min-content, 20rem) 3rem;
    grid-template-columns: 1rem auto 1rem;
  }
`;

const BackButtonLayout = styled(Link)`
  flex: 1;

  ${device.tablet} {
    display: none;
  }
`;

function Gallery(props) {
  const { images, className } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagesLength = images.length;

  function nextImage() {
    setCurrentImageIndex((currentImageIndex + 1) % imagesLength);
  }

  function previousImage() {
    setCurrentImageIndex((currentImageIndex + imagesLength - 1) % imagesLength);
  }

  function changeCurrentImage(index) {
    console.log(index);
    setCurrentImageIndex(index);
  }

  return (
    <Container className={className}>
      <BackButtonLayout to="/tienda">
        <BackButton />
      </BackButtonLayout>
      <ImagesContainer>
        {images.map((source, index) => (
          <ImagePreviewAligner key={source}>
            <ImgPreview
              onClick={() => changeCurrentImage(index)}
              src={source}
            />
          </ImagePreviewAligner>
        ))}
      </ImagesContainer>
      <CurrentImageContainer>
        <PreviousButton onClick={previousImage} />
        <CurrentImageLayout>
          <CurrentImage src={images[currentImageIndex]} />
        </CurrentImageLayout>
        <Nextbutton onClick={nextImage} />
        <Current dots={images.map((_, index) => index === currentImageIndex)} />
      </CurrentImageContainer>
    </Container>
  );
}

export default Gallery;
