
import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (n) => {
    const slides = document.querySelectorAll('.slider-container img');

    slides.forEach((slide, index) => {
      if (index === n) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 9);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 9) % 9);
  };

  useEffect(() => {
    showSlide(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img src="/images/1.jpg" alt="1" />
      <img src="/images/2.jpg" alt="2" />
      <img src="/images/3.jpg" alt="3" />
      <img src="/images/4.png" alt="4" />
      <img src="/images/5.png" alt="5" />
      <img src="/images/6.jpeg" alt="6" />
      <img src="/images/7.jpg" alt="7" />
      <img src="/images/8.jpeg" alt="8" />
      <img src="/images/9.jpg" alt="9" />

      <div
        className="slider-navigation"
        onClick={nextSlide}
        onContextMenu={(e) => {
          e.preventDefault();
          previousSlide();
        }}
      ></div>
    </div>
  );
};

export default ImageSlider;
