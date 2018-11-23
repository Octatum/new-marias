import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import CustomSlide from './CustomSlide';

const Layout = styled.section`
  display: flex;
  flex: 1;
  margin: 0 ${({ fluid }) => (fluid ? 0 : 7.3)}em;
  margin-bottom: 4.2em;
  position: relative;
  > div {
    flex: 1;
    > div {
      flex: 1;
      > div {
        flex: 1;
      }
    }
  }
`;

const ImageGalleryWrapper = styled.div`
  position: relative;
`;

const SlideshowSection = props => {
  const { images } = props;

  return (
    <Layout fluid>
      <ImageGalleryWrapper>
        <ImageGallery
          items={images}
          renderItem={props => <CustomSlide {...props} />}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          slideDuration={1000}
          autoPlay
          showBullets
          lazyLoad
        />
      </ImageGalleryWrapper>
    </Layout>
  );
};

export default SlideshowSection;
