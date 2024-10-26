import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import UploadInput from "../components/UploadInput";
import UploadImage from "../components/UploadImage";
import { Plus, Trash2 } from "react-feather";
import Title from "../components/Title";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const { addProduct } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    productColors: [
      { color: "", sizes: [{ size: "", quantity: "" }], images: [] },
    ],
  });

  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddColor = () => {
    setFormData((prevData) => ({
      ...prevData,
      productColors: [
        ...prevData.productColors,
        { color: "", sizes: [{ size: "", quantity: "" }], images: [] },
      ],
    }));
  };

  const handleColorChange = (colorIndex, value) => {
    const updatedColors = formData.productColors.map((color, index) =>
      index === colorIndex ? { ...color, color: value } : color
    );
    setFormData((prevData) => ({
      ...prevData,
      productColors: updatedColors,
    }));
  };

  const handleAddSize = (colorIndex) => {
    const updatedColors = formData.productColors.map((color, index) =>
      index === colorIndex
        ? { ...color, sizes: [...color.sizes, { size: "", quantity: "" }] }
        : color
    );
    setFormData((prevData) => ({
      ...prevData,
      productColors: updatedColors,
    }));
  };

  const handleRemoveSize = (colorIndex, sizeIndex) => {
    const updatedSizes = formData.productColors[colorIndex].sizes.filter(
      (_, index) => index !== sizeIndex
    );
    const updatedColors = formData.productColors.map((color, index) =>
      index === colorIndex ? { ...color, sizes: updatedSizes } : color
    );
    setFormData((prevData) => ({
      ...prevData,
      productColors: updatedColors,
    }));
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const updatedSizes = formData.productColors[colorIndex].sizes.map(
      (size, index) =>
        index === sizeIndex ? { ...size, [field]: value } : size
    );
    const updatedColors = formData.productColors.map((color, index) =>
      index === colorIndex ? { ...color, sizes: updatedSizes } : color
    );
    setFormData((prevData) => ({
      ...prevData,
      productColors: updatedColors,
    }));
  };

  const handleFilesChange = (colorIndex, files) => {
    setFormData((prevData) => {
      const updatedColors = prevData.productColors.map((color, index) =>
        index === colorIndex ? { ...color, images: files } : color
      );
      return { ...prevData, productColors: updatedColors };
    });
  };

  const handleRemoveColor = (colorIndex) => {
    const updatedColors = formData.productColors.filter(
      (_, index) => index !== colorIndex
    );
    setFormData((prevData) => ({
      ...prevData,
      productColors: updatedColors,
    }));
  };

  const resetFormData = () => {
    setFormData({
      productName: "",
      productDesc: "",
      productPrice: "",
      productColors: [
        { color: "", sizes: [{ size: "", quantity: "" }], images: [] },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const upload = await addProduct(formData);

      if (upload) {
        toast.success("Product Uploaded Successfully!", {
          position: "top-right",
        });
        resetFormData;
        nav("/");
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pb-20">
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
          />

          {formData.productColors.map((colorData, colorIndex) => (
            <div key={colorIndex} className="mt-6 border p-4 rounded-md">
              <UploadInput
                type="text"
                name={`color_${colorIndex}`}
                id={`color_${colorIndex}`}
                title={`Color ${colorIndex + 1}`}
                value={colorData.color}
                onChange={(e) => handleColorChange(colorIndex, e.target.value)}
              />

              {colorData.sizes.map((sizeData, sizeIndex) => (
                <div key={sizeIndex} className="flex items-center">
                  <div className="grid md:grid-cols-2 md:gap-x-6 flex-grow">
                    <UploadInput
                      type="number"
                      name={`size_${colorIndex}_${sizeIndex}`}
                      id={`size_${colorIndex}_${sizeIndex}`}
                      title={`Size ${sizeIndex + 1}`}
                      value={sizeData.size}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "size",
                          e.target.value
                        )
                      }
                    />

                    <UploadInput
                      type="number"
                      name={`quantity_${colorIndex}_${sizeIndex}`}
                      id={`quantity_${colorIndex}_${sizeIndex}`}
                      title="Quantity"
                      min="0"
                      value={sizeData.quantity}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="justify-end ml-4">
                    <Trash2
                      onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                      color="#374151"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAddSize(colorIndex)}
                  className="text-blue-600 text-sm mt-2"
                >
                  Add Size
                </button>
              </div>

              <UploadImage
                key={colorIndex}
                colorIndex={colorIndex}
                onFilesChange={(files) => handleFilesChange(colorIndex, files)}
                productImages={colorData.images}
              />

              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  onClick={() => handleRemoveColor(colorIndex)}
                  className="text-red-600 text-sm"
                >
                  Remove Color
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center mt-4">
            <hr className="flex-grow h-px bg-gray-300 border-0 dark:bg-gray-700" />
            <button
              type="button"
              onClick={handleAddColor}
              className="flex items-center justify-center gap-x-2 mx-3 text-gray-800 font-medium bg-white rounded-lg px-3 py-1 hover:bg-gray-100 focus:outline-none"
            >
              <Plus size="18" />
              <span>Add Color</span>
            </button>
            <hr className="flex-grow h-px bg-gray-300 border-0 dark:bg-gray-700" />
          </div>

          <button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-10"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
