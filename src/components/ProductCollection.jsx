import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductCollection = () => {
  const { products } = useContext(ProductContext);

  const [productList, setProductList] = useState(products);

  useEffect(()=>{
    setProductList(products);
  }, [products])

  return (
    <div className="min-h-screen overflow-auto">
      <div className="my-10">
        <div className="text-center py-8 text-4xl lg:text-5xl">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              Product
              <span className="text-gray-700 font-medium">Collection</span>
            </p>
          </div>
          <p className="lg:w-3/4 m-auto text-sm lg:text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptates, provident.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {productList.map((item) => (
            <div  key={item.id}>
              <ProductCard
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
