import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import SlideShow from '../pages-components/Home/Slideshow';
import AppLayout from '../components/AppLayout';
import NuestraTienda from '../pages-components/Home/NuestraTienda';
import QuienesSomos from '../pages-components/Home/QuienesSomos';
import Contacto from '../pages-components/Home/Contacto';
import aboutUsImage from '../pages-components/Home/assets/about-us.png';

const Home = props => {
  const {
    slideshowImages,
    ourShopContent,
    ourShopLeftImage,
    ourShopRightImage,
    whoAreWeBanner,
    whoAreWeContent,
    contactLeftLocationName,
    contactLeftLocationContent,
    contactLeftLocation,
    contactRightLocationName,
    contactRightLocationContent,
    contactRightLocation,
  } = props.data.pageContent;

  const slideshowImagesData = slideshowImages.map(imageData => ({
    title: '',
    image: `https://admin.newmarias.com/${imageData.path}`,
  }));

  const shopData = {
    content: ourShopContent,
    leftLink: {
      url: '',
      image: ourShopLeftImage.path,
    },
    rightLink: {
      url: '',
      image: ourShopRightImage.path,
    },
  };

  const aboutUsData = {
    banner: aboutUsImage,
    content: whoAreWeContent,
  };

  const locationsData = [
    {
      name: contactLeftLocationName,
      content: contactLeftLocationContent,
      coords: contactLeftLocation,
    },
    {
      name: contactRightLocationName,
      content: contactRightLocationContent,
      coords: contactRightLocation,
    },
  ];

  return (
    <AppLayout>
      <Helmet title="New Marias" titleTemplate={null} />
      <SlideShow images={slideshowImagesData} />
      <NuestraTienda data={shopData} />
      <QuienesSomos data={aboutUsData} />
      <Contacto data={locationsData} />
    </AppLayout>
  );
};

export default Home;

export const query = graphql`
  query GetPageData {
    pageContent(_pageId: { eq: "startPage" }) {
      slideshowImages {
        path
      }

      ourShopContent
      ourShopLeftImage {
        path
      }
      ourShopRightImage {
        path
      }

      whoAreWeBanner {
        path
      }
      whoAreWeContent

      contactLeftLocationName
      contactLeftLocationContent
      contactLeftLocation {
        lat
        lng
      }

      contactRightLocationName
      contactRightLocationContent
      contactRightLocation {
        lat
        lng
      }
    }
  }
`;
