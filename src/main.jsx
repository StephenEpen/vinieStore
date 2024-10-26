import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./views/Home.jsx";
import SignInPage from "./views/Sign-in.jsx";
import RegisterPage from "./views/Register.jsx";
import CartPage from "./views/Cart.jsx";
import ErrorPage from "./views/404.jsx";
import ProductPage from "./views/Product.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import UploadPage from "./views/Upload.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import UploadProtectedRoute from "./components/route/UploadProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/sign-in"
              element={
                <ProtectedRoute>
                  <SignInPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/upload"
              element={
                <UploadProtectedRoute>
                  <UploadPage />
                </UploadProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </ProductContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
