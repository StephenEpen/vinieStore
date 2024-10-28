import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";

const ProductCard = ({ id, images, name, price, colors }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(0);
  const thumbnailContainerRef = useRef(null);

  const thumbnailWidth = 56 + 4;

  useEffect(() => {
    const handleResize = () => {
      if (thumbnailContainerRef.current) {
        const containerWidth = thumbnailContainerRef.current.offsetWidth;
        const newVisibleThumbnails = Math.floor(
          containerWidth / thumbnailWidth
        );

        setVisibleThumbnails(newVisibleThumbnails);

        setScrollPosition((prevScroll) =>
          Math.min(
            prevScroll,
            Math.max(colors.length - newVisibleThumbnails, 0)
          )
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [colors.length]);

  const handleImageHover = (image) => {
    setSelectedImage(image);
  };

  const handleNextImage = () => {
    const maxScrollPosition = colors.length - visibleThumbnails;
    if (scrollPosition < maxScrollPosition) {
      setScrollPosition(Math.min(scrollPosition + 1, maxScrollPosition));
    }
  };

  const handlePrevImage = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };

  return (
    <div className="group my-5 m-0 p-0 flex flex-col w-full max-w-lg overflow-hidden border border-gray-100 bg-white shadow-md rounded-lg">
      <Link
        to={`/product/${id}`}
        className="pointerEvents relative flex flex-col"
      >
        <div className="relative flex h-60 overflow-hidden">
          <img
            className="hover:scale-110 transition-transform duration-300 absolute top-0 right-0 h-full w-full object-cover"
            src={selectedImage}
            alt={name}
          />
        </div>
      </Link>

      <div className="relative flex mt-2 items-center justify-between px-2">
        {scrollPosition > 0 && (
          <button
            className="pointerEvents absolute left-0 p-2 z-10"
            onClick={handlePrevImage}
          >
            <ChevronLeft size={24} strokeWidth="3"/>
          </button>
        )}

        <div
          ref={thumbnailContainerRef}
          className="flex justify-start space-x-2 overflow-hidden w-full"
        >
          <div
            className="flex space-x-2 transition-transform duration-300"
            style={{
              transform: `translateX(-${scrollPosition * thumbnailWidth}px)`,
            }}
          >
            {colors.map((color, index) => (
              <button
                key={index}
                onMouseEnter={() => handleImageHover(color.images[0])}
                className={`pointerEvents w-14 h-14 rounded ${
                  selectedImage === color.images[0]
                    ? "border-2 border-gray-700"
                    : ""
                }`}
              >
                <img
                  src={color.images[0]}
                  alt={color.color}
                  className="h-full w-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {scrollPosition < Math.max(colors.length - visibleThumbnails, 0) && (
          <button
            className="pointerEvents absolute right-0 p-2 z-10"
            onClick={handleNextImage}
          >
            <ChevronRight size={24} strokeWidth="3"/>
          </button>
        )}
      </div>

      <div className="flex-grow mt-4 px-5 pb-5">
        <Link to={`/product/${id}`} className="pointerEvents nonTextDecor">
          <h5 className="text-xl tracking-tight text-slate-900">
            {name.length > 25 ? `${name.substring(0, 25)}...` : name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-lg lg:text-xl mr-2 font-bold text-slate-900">
              {price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </p>
        </div>

        <button className="pointerEvents flex items-center justify-center bg-gray-900 px-5 py-2.5 text-sm text-white transition hover:bg-gray-700 rounded-md">
          <svg  
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
