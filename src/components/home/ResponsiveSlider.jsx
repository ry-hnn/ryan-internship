import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResponsiveSlider = ({ children, settings }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
    }
  }, []);

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };
  

  return (
    <div className="responsive-slider-container">
    <Slider ref={sliderRef} {...settings}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="slider-item">
          {child}
        </div>
      ))}
    </Slider>
  </div>
  );
}

export default ResponsiveSlider;
