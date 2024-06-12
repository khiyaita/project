import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Slider = ({ slides, interval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevCount) =>
      prevCount === slides.length - 1 ? 0 : prevCount + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevCount) =>
      prevCount === 0 ? slides.length - 1 : prevCount - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  useEffect(() => {
    if (currentSlide === slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  const filteredSlides = [];
  const categories = {};

  slides.forEach((slide) => {
    if (!categories[slide.category]) {
      categories[slide.category] = true;
      filteredSlides.push(slide);
    }
  });

  if (currentSlide === filteredSlides.length) {
    setCurrentSlide(0);
  }
  return (
    <div className="slider relative overflow-hidden w-full">
      {filteredSlides.map((slide, index) => (
        <div
          className={`slide-container flex transition-transform duration-500 ${
            index === currentSlide ? "block" : "hidden"
          }`}
          style={{
            transform: `translateX(${100 * (index - currentSlide)}%)`,
          }}
          key={index}
        >
          <div className="slide">
            <div className="w-full md:w-[892px] h-[344px] bg-black rounded text-white flex justify-between">
              <div className="flex flex-col items-center justify-evenly m-4 md:m-20">
                <div className="text-lg">{slide.title}</div>
                <h2 className="text-xl">
                  Up to {slide.discountRate}% off Voucher
                </h2>
                <div>
                  <Link
                    to={`products/${slide.category}`}
                    className="underline underline-offset-4"
                  >
                    Shop Now
                  </Link>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
              <img
                src={slide.imageSrc}
                alt="img"
                className="h-[200px] mx-5 my-5 md:h-[300px] w-[200px] md:w-[300px]"
                style={{ backgroundColor: "black" }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {filteredSlides.map((_, index) => (
          <input
            key={index}
            type="radio"
            id={`radio${index}`}
            name="slider-radio"
            className="hidden"
            onChange={() => setCurrentSlide(index)}
            checked={currentSlide === index}
          />
        ))}
        {filteredSlides.map((_, index) => (
          <label
            key={index}
            htmlFor={`radio${index}`}
            className={`rounded-full w-4 h-4 cursor-pointer ${
              currentSlide === index ? "bg-red-500" : "bg-gray-500"
            }`}
          ></label>
        ))}
      </div>
    </div>
  );
};

export default Slider;
