import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadInput from "../components/UploadInput";
import UploadImage from "../components/UploadImage";
import { Plus } from "react-feather";
import Title from "../components/Title";
import { ProductContext } from "../context/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, loadFormData, updateForm } from "../redux/formSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const { addProduct } = useContext(ProductContext);

  const nav = useNavigate();

  useEffect(() => {
    dispatch(loadFormData());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ field: name, value }));
  };

  const handleAddSize = () => {
    const updateSizes = [...formData.productSizes, { size: "", quantity: "" }];
    dispatch(updateForm({ field: "productSizes", value: updateSizes }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = formData.productSizes.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    dispatch(updateForm({ field: "productSizes", value: updatedSizes }));
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = formData.productSizes.filter((_, i) => i !== index);
    dispatch(updateForm({ field: "productSizes", value: updatedSizes }));
  };

  const handlePriceFocus = () => {
    dispatch(updateForm({ field: "productPrice", value: "" }));
  };

  const handlePriceBlur = () => {
    if (!formData.productPrice) {
      dispatch(updateForm({ field: "productPrice", value: "" }));
    }
  };

  const handleQuantityFocus = (index) => {
    const updatedSizes = formData.productSizes.map((item, i) =>
      i === index ? { ...item, quantity: "" } : item
    );
    dispatch(updateForm({ field: "productSizes", value: updatedSizes }));
  };

  const handleQuantityBlur = (index) => {
    if (!formData.productSizes[index].quantity) {
      const updatedSizes = formData.productSizes.map((item, i) =>
        i === index ? { ...item, quantity: "" } : item
      );
      dispatch(updateForm({ field: "productSizes", value: updatedSizes }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.productName,
      description: formData.productDesc,
      price: formData.productPrice,
      sizes: formData.productSizes,
    };

    await addProduct(productData, formData.productImages);

    nav("/");
    toast.success("Product Uploaded!", {
      position: "top-right",
    });

    dispatch(clearForm());
  };

  return (
    <div className="pt-10 pb-20">
      <Navbar />

      <Title text1="Upload" text2="Product" />

      <form className="max-w-2xl mx-auto mt-2" onSubmit={handleSubmit}>
        <UploadInput
          type="text"
          name="productName"
          id="productName"
          title="Product Name"
          value={formData.productName}
          onChange={handleInputChange}
        />
        <UploadInput
          type="textarea"
          name="productDesc"
          id="productDesc"
          title="Description"
          value={formData.productDesc}
          onChange={handleInputChange}
        />
        <UploadInput
          type="number"
          name="productPrice"
          id="productPrice"
          title="Price"
          min={0}
          value={formData.productPrice}
          onChange={handleInputChange}
          onFocus={handlePriceFocus}
          onBlur={handlePriceBlur}
        />

        <div className="mt-4">
          {formData.productSizes.map((item, index) => (
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
                onFocus={() => handleQuantityFocus(index)}
                onBlur={() => handleQuantityBlur(index)}
              />
              {formData.productSizes.length > 1 && (
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
          onFilesChange={(files) =>
            dispatch(updateForm({ field: "productImages", value: files }))
          }
          productImages={formData.productImages}
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
