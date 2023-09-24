import Carousel from 'react-bootstrap/Carousel';

import "./CarouselHome.css"

export default function CarouselHome() {

    return (
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block blur-image"
              src="https://wallpapercave.com/wp/wp4658655.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block blur-image"
              src="https://cutewallpaper.org/21/board-game-wallpapers/Board-Games-Wallpapers-Wallpaper-Cave.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block blur-image"
              src="https://campuslife-browzer.s3.eu-west-2.amazonaws.com/files/2016/4849/2737/game_2.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      );
}