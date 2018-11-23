import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import SlideShow from '../pages-components/Home/SlideShow';
import AppLayout from '../components/AppLayout';
import NuestraTienda from '../pages-components/Home/NuestraTienda';
import QuienesSomos from '../pages-components/Home/QuienesSomos';
import Contacto from '../pages-components/Home/Contacto';

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
      image: `https://admin.newmarias.com/${ourShopLeftImage.path}`,
    },
    rightLink: {
      url: '',
      image: `https://admin.newmarias.com/${ourShopRightImage.path}`,
    },
  };

  const aboutUsData = {
    banner: `https://admin.newmarias.com/${whoAreWeBanner.path}`,
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
