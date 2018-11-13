import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import CustomSlide from './CustomSlide';
import device from './../../../utilities/device';

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
  ${device.mobile} {
    margin-bottom: 35px;
  }
`;

 const ImageGalleryWrapper = styled.div`
  position: relative;
`;

 const SlideshowSection = React.forwardRef((props, forwardedRef) => {    
    const images = [
        {title: "ok", backgroundImage: "http://definicionde.hugex.net/wp-content/uploads/2015/07/e1001e86903d5fccba2a7e83a0547bd4.jpg"},
        {title: "ok", backgroundImage: "https://www.tourinews.es/uploads/s1/16/86/27/paisaje-2_4_732x400.jpeg"},
        {title: "ok", backgroundImage: "https://www.lifeder.com/wp-content/uploads/2017/07/paisaje-cultural.jpg"},
    ]
     return (
        <Layout fluid innerRef={forwardedRef}>
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
 });
 export default SlideshowSection;