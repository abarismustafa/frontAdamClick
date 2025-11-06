import React, { createContext, useEffect } from "react";
import ProductDetail from "../../components/home/product-detail/ProductDetail";
import { productData } from "./mockData";
export const productItemContext = createContext();

function ProductDetailPage({setShow}) {
 
  return (
    <>
      <productItemContext.Provider value={productData}>
        <ProductDetail />
      </productItemContext.Provider>
    </>
  );
}

export default ProductDetailPage;
