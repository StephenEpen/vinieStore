import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadInput from "../components/UploadInput";
import UploadImage from "../components/UploadImage";
import { Plus } from "react-feather";
import Title from "../components/Title";
import { ProductContext } from "../context/ProductContext";

const UploadPage = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productSizes, setProductSizes] = useState([
    { size: "", quantity: "" },
  ]);
  const [productImages, setProductImages] = useState([]);

  const { addProduct } = useContext(ProductContext);

  useEffect(() => {
    saveToLocalStorage();
  }, [productName, productDesc, productPrice, productSizes, productImages]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));

    if (savedData) {
      const oneDay = 24 * 60 * 60 * 1000;
      const now = Date.now();

      if (now - savedData.timestamp < oneDay) {
        setProductName(savedData.productName || "");
        setProductDesc(savedData.productDesc || "");
        setProductPrice(savedData.productPrice || "");
        setProductSizes(savedData.productSizes || [{ size: "", quantity: "" }]);
        setProductImages(savedData.productImages || []);
      } else {
        localStorage.removeItem("formData");
      }
    } 
  }, []);

  const saveToLocalStorage = () => {
    const formData = {
      productName,
      productDesc,
      productPrice: parseFloat(productPrice),
      productSizes,
      productImages,
      timestamp: Date.now(),
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { size: "", quantity: "" }]);
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = productSizes.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setProductSizes(updatedSizes);
    saveToLocalStorage();
  };

  const handleRemoveSize = (index) => {
    setProductSizes(productSizes.filter((_, i) => i !== index));
    saveToLocalStorage();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      description: productDesc,
      price: productPrice,
      sizes: productSizes,
    };

    await addProduct(productData, productImages);

    localStorage.removeItem("formData");

    setProductName("");
    setProductDesc("");
    setProductPrice("");
    setProductSizes([{ size: "", quantity: "" }]);
    setProductImages([]);
  };

  return (
    <div>
      <Navbar />

      <Title text1="Upload" text2="Product" />

      <form className="max-w-2xl mx-auto mt-2" onSubmit={handleSubmit}>
        <UploadInput
          type="text"
          name="product_name"
          id="product_name"
          title="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <UploadInput
          type="text"
          name="product_description"
          id="product_description"
          title="Description"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
        />
        <UploadInput
          type="number"
          name="product_price"
          id="product_price"
          title="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <div className="mt-4">
          {productSizes.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 md:gap-x-6">
              <UploadInput
                type="text"
                name={`product_size_${index}`}
                id={`product_size_${index}`}
                title={`Size ${index + 1}`}
                value={item.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
              />
              <UploadInput
                type="number"
                name={`product_quantity_${index}`}
                id={`product_quantity_${index}`}
                title="Quantity"
                min="0"
                value={item.quantity}
                onChange={(e) =>
                  handleSizeChange(index, "quantity", e.target.value)
                }
              />
              {productSizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSize(index)}
                  className="text-red-600 text-sm md:col-span-2 mb-5"
                >
                  Remove Size
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-2">
          <hr className="flex-grow h-px bg-gray-300 border-0 dark:bg-gray-700" />
          <button
            type="button"
            onClick={handleAddSize}
            className="flex items-center justify-center gap-x-2 mx-3 text-gray-900 font-medium bg-white rounded-lg px-3 py-1 hover:bg-gray-100 focus:outline-none"
          >
            <Plus size="18" />
            <span>Add Size</span>
          </button>
          <hr className="flex-grow h-px bg-gray-300 border-0 dark:bg-gray-700" />
        </div>

        <UploadImage
          onFilesChange={setProductImages}
          productImages={productImages}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
