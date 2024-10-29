import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import RandomProduct from "../components/RandomProduct";

const ProductPage = () => {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const fetchProductData = async () => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.colors[0].images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setSelectedImage(productData.colors[colorIndex].images[0]);
  };

  const changeImage = (src) => {
    setSelectedImage(src);
  };

  return productData ? (
    <div>
      <Navbar />
      <div className="font-sans">
        <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
            <div className="w-full lg:sticky top-0">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full rounded-md object-cover mb-4"
              />

              <div className="flex gap-2 overflow-x-auto">
                {productData.colors[selectedColorIndex].images.map(
                  (imgSrc, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgSrc}
                      alt={`Thumbnail ${imgIndex + 1}`}
                      className={`w-16 h-16 rounded-md cursor-pointer ${
                        selectedImage === imgSrc
                          ? "border-2 border-gray-700"
                          : ""
                      }`}
                      onClick={() => changeImage(imgSrc)}
                    />
                  )
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {productData.name}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-medium">
                  {productData.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Colors</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {productData.colors.map((color, colorIndex) => (
                    <img
                      key={colorIndex}
                      src={color.images[0]}
                      alt={`Color ${colorIndex + 1}`}
                      className={`w-16 h-16 rounded-md cursor-pointer ${
                        selectedColorIndex === colorIndex
                          ? "border-2 border-gray-700"
                          : ""
                      }`}
                      onClick={() => handleColorChange(colorIndex)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Sizes</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {productData.colors[selectedColorIndex].sizes.map(
                    (sizeData, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`w-10 h-10 border-2 ${
                          sizeData.size === selectedSize
                            ? "border-gray-700"
                            : ""
                        } font-semibold text-sm rounded-full flex items-center justify-center shrink-0`}
                        onClick={() => setSelectedSize(sizeData.size)}
                      >
                        {sizeData.size}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-8 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-md"
              >
                Add to cart
              </button>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Product Description
                </h3>
                <p className="space-y-3 mt-4 text-sm text-gray-800">
                  {productData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RandomProduct productId={productId} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default ProductPage;
