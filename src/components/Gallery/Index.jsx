import React, { Component } from 'react';
import styled from 'styled-components';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';

const Container = styled.div`
    min-width: 760px;
`;

const CurrentImageContainer = styled.div`
    display: block;
    float: left;
    display: flex;
`;

const CurrentImage = styled.img`
    display: block;
    float: left;
    width: 450px;
    height: 450px;
`;

const BackButton = styled.button`
    display: block;
    width: 13px;
    height: 29px;
    margin-right: 25px;
    float: left;
    :hover {
        cursor: pointer; 
    }
    background-image: url(${backButtonImg});
    background-size: cover;                      
    background-repeat: no-repeat;
    background-position: center center; 
    border: none;
`;

const PreviousButton = styled.button`
    width: 13px;
    height: 29px;
    margin: 0 25px;
    align-self: center;
    :hover {
        cursor: pointer; 
    }
    background-image: url(${backButtonImg});
    background-size: cover;                      
    background-repeat: no-repeat;
    background-position: center center; 
    border: none;
`;

const Nextbutton = styled.button`
    width: 13px;
    height: 29px;
    margin: 0 25px;
    align-self: center;
    :hover {
        cursor: pointer; 
    }
    background-image: url(${forwardButtonImg});
    background-size:     cover;                      
    background-repeat:   no-repeat;
    background-position: center center; 
    border: none;
`;

const ImagesContainer = styled.div`
    float: left;
    width: 145px;
    margin-right: 30px;
    img {
        display: block;
        width: 100%;
        height: 145px;
        margin-bottom: 7px;
    }
    img:hover {
       cursor: pointer; 
    }
`;

const BackContainer = styled.div`
    float: left;
    padding: 0;
    position: relative;
`

const Filtro = styled.div`
    top: -50px;
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #626363;
    font-family: 'Archivo Narrow', sans-serif;
    color: #626363;
    font-size: 20px;
    padding: 7px 0;
    margin-bottom: 20px;
`

class Gallery extends Component {

    state = {
        currentImage: this.props.images[0]
    }

    nextImage = () => {
        const currentIndex = this.props.images.indexOf(this.state.currentImage);
        if (currentIndex < this.props.images.length - 1){
            this.setState({currentImage: this.props.images[currentIndex+1]});
        }
    }

    previousImage = () => {
        const currentIndex = this.props.images.indexOf(this.state.currentImage);
        if (currentIndex > 0){
            this.setState({currentImage: this.props.images[currentIndex-1]});
        }
    }

    changeCurrentImage = (source) => {
        this.setState({currentImage: source});
    }

    render(){
        
        const images = this.props.images.map(function(source){
            return (<img key={source} onClick={() => this.changeCurrentImage(source)} src={source}/>);
        }, this);

        return (
            <Container>
                <BackContainer>
                    <Filtro>
                        Todas  >
                    </Filtro>
                    <BackButton/>
                    <ImagesContainer>
                        {images}
                    </ImagesContainer>
                </BackContainer>
                <CurrentImageContainer>
                    <PreviousButton onClick={this.previousImage.bind(this)}/>
                    <CurrentImage src={this.state.currentImage}/>
                    <Nextbutton onClick={this.nextImage.bind(this)}/>
                </CurrentImageContainer>
            </Container>    
        )
    }
   
};

export default Gallery;