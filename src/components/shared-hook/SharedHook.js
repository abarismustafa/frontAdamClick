import { useState } from "react";

// Custom Hook
function ProductCustomHook() {
  const [shareData, setShareData] = useState({
    productCount: 1,
    pickUpPoint: "",
    variationsId: "",
  });
  function setProduct(val1, val2) {
    if (val1 === "pickUpPoint") {
      const cloneData = { ...shareData };
      cloneData.pickUpPoint = val2;
      setShareData(cloneData);
    }
    if (val1 === "productCount") {
      const cloneData = { ...shareData, productCount: val2 };
      setShareData(cloneData);
    }
    if (val1 === "variationsId") {
      const cloneData = { ...shareData, variationsId: val2 };
      setShareData(cloneData);
    }

  }
  window.localStorage.setItem("productCount", shareData.productCount)
  window.localStorage.setItem("variationsId", shareData.variationsId)


  return { shareData, setProduct };
}

export default ProductCustomHook;
