import React, { createContext, useState } from "react";
import Cart from "../../components/cart/Cart";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { cartData } from "./mockData";
import { useTranslation } from "react-i18next";
export const cartContext = createContext();
function CartHome() {
  const [countValue, setCountValue] = useState(1);
  const handleInc = () => {
    setCountValue(countValue + 1);
    if (countValue >= 10) {
      return setCountValue(1);
    }
  };
  const handleDec = () => {
    setCountValue(countValue - 1);
    if (countValue <= 1) {
      return setCountValue(1);
    }

  };
  
  const { t, i18n } = useTranslation()
  return (
    <>
      <Breadcrumb title="Cart" t={t} />
      <cartContext.Provider value={cartData}>
        <Cart countValue={countValue} handleInc={handleInc} handleDec={handleDec} />
      </cartContext.Provider>
    </>
  );
}

export default CartHome;
