import { createContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          description: doc.data().description,
          images: doc.data().images,
          name: doc.data().name,
          price: doc.data().price,
          size: doc.data().size,
        }));

        const updatedProducts = await Promise.all(
          productData.map(async (product) => {
            const imageUrls = await Promise.all(
              product.images.map(async (imageRef) => {
                const imagePath =
                  typeof imageRef === "string" ? imageRef : imageRef.path;

                if (typeof imagePath === "string") {
                  try {
                    const imageURL = await getDownloadURL(
                      ref(storage, imagePath)
                    );
                    return imageURL;
                  } catch (error) {
                    console.error(
                      `Error getting download URL for ${imagePath}:`,
                      error
                    );
                    return null;
                  }
                }
              })
            );

            return {
              ...product,
              images: imageUrls.filter((url) => url !== null),
            };
          })
        );

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
