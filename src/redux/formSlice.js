import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  productDesc: "",
  productPrice: "",
  productSizes: [{ size: "", quantity: "" }],
  productImages: [],
};

const saveToLocalStorage = (state) => {
  const formData = {
    productName: state.productName || "",
    productDesc: state.productDesc || "",
    productPrice: state.productPrice || "",
    productSizes: state.productSizes || [{ size: "", quantity: "" }],
    productImages: state.productImages || [],
    timestamp: Date.now(),
  };

  localStorage.setItem("formData", JSON.stringify(formData));
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    loadFormData: (state, action) => {
      const savedData = JSON.parse(localStorage.getItem("formData"));

      if (savedData) {
        const oneDay = 120 * 60 * 1000;
        const now = Date.now();

        if (now - savedData.timestamp < oneDay) {
          return {
            ...state,
            productName: savedData.productName || "",
            productDesc: savedData.productDesc || "",
            productPrice: savedData.productPrice || "",
            productSizes: savedData.productSizes || [
              { size: "", quantity: "" },
            ],
            productImages: savedData.productImages || [],
          };
        } else {
          localStorage.removeItem("formData");
        }
      }

      return state;
    },
    updateForm: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      saveToLocalStorage(state);
    },
    clearForm: (state, action) => {
      localStorage.removeItem("formData");
      return initialState;
    },
  },
});

export const { loadFormData, updateForm, clearForm } = formSlice.actions;

export default formSlice.reducer;
