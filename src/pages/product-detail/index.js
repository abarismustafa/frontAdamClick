import React, { createContext, useEffect } from "react";
import ProductDetail from "../../components/home/product-detail/ProductDetail";
import { productData } from "./mockData";
import UseStatisticTracker from "../../common/useStatisticTracker/UseStatisticTracker";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export const productItemContext = createContext();

function ProductDetailPage({ setShow }) {
  const params = useParams()
  // console.log(params);

  UseStatisticTracker({
    product_id: params?._id
    ,
  });
  return (
    <>
      <productItemContext.Provider value={productData}>
        <ProductDetail />
      </productItemContext.Provider>
      <ToastContainer />
    </>
  );
}

export default ProductDetailPage;
