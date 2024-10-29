import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const RandomProduct = ({ productId }) => {
  const { products } = useContext(ProductContext);
  const [randomProduct, setRandomProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) => product.id !== productId
      );

      const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());

      setRandomProduct(shuffled.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="Recommend" text2="Product" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {randomProduct.map((item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            images={item.colors[0].images}
            name={item.name}
            price={item.price}
            colors={item.colors}
            random={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomProduct;
