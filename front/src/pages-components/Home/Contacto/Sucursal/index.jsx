import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import Text from '../../../../components/Text';

const Header = styled(Text)`
  margin-bottom: 10px;
`;

const Content = styled(Text)`
  width: 85%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 0.5em;
  }
`;

const Picture = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
  background-color: #c4c4c4;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))


const Sucursal = props => {
  return (
    <Container>
      <Header color="slategray" size={5} as={'h3'}>
        {props.name}
      </Header>
      <Content align="center" size={2} as={Markdown}>
        {props.address}
      </Content>
      <Picture>
      <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Picture>
    </Container>
  );
};

export default Sucursal;
