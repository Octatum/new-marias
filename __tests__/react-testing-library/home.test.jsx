import React from 'react';
import {render, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';

import SlideshowPresentation from '../../src/pages-components/Home/Slideshow/SlideshowPresentation';

afterEach(cleanup);

describe("Pruebas de página de inicio", () => {
  test('Renderiza correctamente el slideshow', async () => {
    const url = "/tienda";
    const slideshowMockData = [{
      image: "https://dummyimage.com/600x400/000/fff",
      header: "Bienvenido",
      redirection: {
        buttonText: "Ver tienda",
        url
      }
    }];
  
    const {getByText} = render(
      <SlideshowPresentation slides={slideshowMockData} />,
    );
  
    expect(getByText('Bienvenido').tagName).toEqual('h2');
    
    const redirectButton = getByText('Ver tienda');
    expect(redirectButton.tagName).toEqual('a');
  })
})
