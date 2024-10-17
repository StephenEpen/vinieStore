import React from "react";
import Navbar from "../components/Navbar";
import { db } from "../config/firebase";
import ProductCollection from "../components/ProductCollection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <ProductCollection />
    </div>
  );
};

export default HomePage;
