  import { createContext, useEffect, useState } from "react";
  import { db, storage } from "../services/firebase";
  import { addDoc, collection, getDocs } from "firebase/firestore";
  import { getDownloadURL, uploadBytes } from "firebase/storage";
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
            name: doc.data().name,
            price: doc.data().price,
            colors: doc.data().colors || [],
          }));

          const updatedProducts = await Promise.all(
            productData.map(async (product) => {
              const updateProductColors = await Promise.all(
                product.colors.map(async (color) => {
                  const imageUrls = await Promise.all(
                    color.images.map(async (imagePath) => {
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
                    })
                  );
                  return {
                    ...product,
                    images: imageUrls.filter((url) => url !== null),
                  };
                })
              );
              return {
                ...product,
                colors: updateProductColors,
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

    const addProduct = async (formData) => {
      try {
        const uploadedColors = await Promise.all(
          formData.productColors.map(async (colorData, colorIndex) => {
            const uploadedImages = await Promise.all(
              colorData.images.map(async (file) => {
                const fileRef = ref(storage, `images/${colorIndex}_${file.name}`);
                await uploadBytes(fileRef, file);
                const downloadURL = await getDownloadURL(fileRef);
                return downloadURL;
              })
            );

            return {
              ...colorData,
              images: uploadedImages,
            };
          })
        );

        const productData = {
          name: formData.productName,
          description: formData.productDesc,
          price: parseFloat(formData.productPrice),
          colors: uploadedColors,
        };

        await addDoc(collection(db, "product"), productData);
        return true;
      } catch (error) {
        console.error("Error adding product:", error);
        return false;
      }
    };

    return (
      <ProductContext.Provider value={{ products, addProduct }}>
        {props.children}
      </ProductContext.Provider>
    );
  };

  export default ProductContextProvider;
