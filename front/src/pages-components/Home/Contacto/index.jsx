import React from 'react';
import Section from './../Section';
import styled from 'styled-components';
import ContactoImage from './../assets/contacto.png';
import Sucursal from './Sucursal';
import FacebookIcon from './../assets/fb.png';
import InstagramIcon from './../assets/instagram.png';
import ContactForm from './../ContactForm';

const Sucursales = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin: 0 auto;
    > div {
        width: 41%;
    }
`

const Icons = styled.div`
    width: 18%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${({src}) => src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 12.5px 0;
    :hover {
        cursor: pointer;
    }
`

const Contacto = () => {
    return (
        <Section 
            titleSrc={ContactoImage}
            titleWidth={"180px"}>
            <h2>Sucursales</h2>
            <Sucursales>
                <Sucursal
                    name="Plaza Maranta"
                    address="Calzada del Valle Alberto Santos 13,
                    Col. Del Valle 66220, SPGG. Local X"
                    telephone="81 2138 6212"/>
                <Icons>
                    <Icon src={FacebookIcon}/>
                    <Icon src={InstagramIcon}/>
                </Icons>
                <Sucursal
                    name="Parque Arboleda"
                    address="Av. del Roble 660 Col. Valle
                    del Campestre, 66265, SPGG. Local L-102-A"
                    telephone="81 1766 5090"/>
            </Sucursales>
            <ContactForm />
        </Section>
    );
}
export default Contacto;