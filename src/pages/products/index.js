import React, { createContext, useEffect } from "react";
import Products from "../../components/products/Products";
export const productViewContext = createContext();
function ProductsPage() {

  return (
    <>
        <Products />
    </>
  );
}

export default ProductsPage;
