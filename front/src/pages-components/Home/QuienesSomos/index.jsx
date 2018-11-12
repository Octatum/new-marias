import React from 'react';
import Section from './../Section';
import styled from 'styled-components';
import QuienesSomosImage from './../assets/quienes-somos.png';

const Banner = styled.div`
  width: 100vw;
  height: 300px;
  margin-left: -7%;
  margin-bottom: 30px;
  background-color: #c94545;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const QuienesSomos = () => {
  return (
    <div>
      <Section titleSrc={QuienesSomosImage} titleWidth={'247px'}>
        <Banner />
        <p>
          Somos una tienda que ofrece productos mexicanos con valor agregado,
          que reconocen la mano del artesano, que reconocen la mano del artesano
          y artista que es insustituible: detrás de cada artesanía, pieza de
          arte o alimento, hay un activo histórico, cultural y de identidad.
          Reconocemos el amor que el arte, las artesanías y la comida pueden
          inspirar y buscamos beneficiar tanto a las personas que los consumen y
          disfruten como a los que producen. Queremos que nuestros productos
          sean una experiencia para tí e invitarte a disfrutarlos y compartirlos
          con la gente que quieres.{' '}
        </p>
      </Section>
    </div>
  );
};
export default QuienesSomos;
