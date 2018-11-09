import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import SlideshowPresentation from './SlideshowPresentation';

// Obtiene los datos correspondientes, los procesa y los pasa al componente encargado de renderizarlos
const Slideshow = () => {
  // To-do. Corregir query y pasar datos a la vista correspondiente
  return (
    <StaticQuery 
      query={graphql`
        {
          site {
            id
          }
        }
      `}
      render={data => {
        // To-do
        const processedData = data;

        return <SlideshowPresentation data={processedData} />
      }}
    />
  );
}

export default Slideshow;
