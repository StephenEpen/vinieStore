import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, images, name, price }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="group my-10 flex flex-col w-[320px] overflow-hidden border border-gray-100 bg-white shadow-md rounded-lg">
        <div className="relative flex h-60 overflow-hidden">
          <img
            className="hover:scale-110 transition-transform duration-300 absolute top-0 right-0 h-full w-full object-cover"
            src={images[0]}
            alt={name}
          />
        </div>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl mr-2 font-bold text-slate-900">
                Rp. {price}
              </span>
            </p>
          </div>
          <button className="flex items-center justify-center bg-gray-900 px-5 py-2.5 text-sm text-white transition hover:bg-gray-700 rounded-md">
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
    </Link>
  );
};

export default ProductCard;
