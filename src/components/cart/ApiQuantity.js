import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  setCartLists,
  useIncCountMutation,
  useOfflineCartUpdateMutation,
} from "../products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomToaster } from "../../common/toaster/CustomToaster";

export const ApiQuatity = ({
  countValue,
  item = null,
  getOffCartList,
  getCartData,
  i,
}) => {
  const [quantity, setQuantity] = useState(countValue);
  const user_id = window.localStorage.getItem("user_id");
  const isLogin = window.localStorage.getItem("isLogin");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
    name: item?.name,
  });
  const [
    updateOffline,
    { isSuccess: isrefSuc, data: resDataVal, isLoading: loadUpd },
  ] = useOfflineCartUpdateMutation();

  const { updatedProducts: products } = useSelector((state) => {
    return state.productList;
  });

  const [ChengeCount, { isLoading, data: resData, isSuccess }] =
    useIncCountMutation();
  useEffect(() => {
    if (!countValue) {
      setQuantity(1);
    }
  }, []);

  const dispacher = useDispatch();

  const handleInc = () => {
    if (!(item?.maxQty <= quantity)) {
      setShowLoading(true);
      setQuantity(+quantity + 1);
      setShowError(false);
      ChengeCount({ qty: quantity + 1, index: i });
    } else {
      setShowError(true);
      setShowToaster({
        show: true,
        message: `Maximum order accepted  
        ${item?.maxQty}`,
        color: "danger",
        name: item?.name,
      });
    }
  };
  const handleDec = () => {
    if (!(item?.minQty >= quantity)) {
      setShowLoading(true);
      setQuantity(+quantity - 1);
      ChengeCount({ qty: quantity - 1, index: i });
      setShowError(false);
    } else {
      setShowError(true);
      setShowToaster({
        show: true,
        message: `Minimum order accepted  
        ${item?.minQty}`,
        color: "danger",
        name: item?.name,
      });
    }
  };

  useEffect(() => {
    if (isrefSuc) {
      getCartData();
    }
    if (isSuccess) {
      // window.localStorage.setItem("cartItem", resData?.products);
      setTimeout(() => {
        getCartData();
        setShowLoading(false);
      }, 500);
    }
  }, [isrefSuc, isSuccess]);

  useEffect(() => {
    if (isrefSuc) {
      const newArr = resDataVal.cart.products.map((item) => {
        return { ...item, product: item.product._id };
      });

      dispacher(setCartLists(newArr));
      getOffCartList({ products: newArr });
    }
  }, [isrefSuc]);

  return (
    <>
      {showError && (
        <CustomToaster
          color={showTaoster.color}
          title={showTaoster?.name}
          show={showTaoster.show}
          setShow={() => setShowError(false)}
          message={showTaoster.message}
          position="top-end"
          delay={100000}
        />
      )}
      <div className="quantity cart">
        {showLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div>
          <button
            type="button"
            className="minus"
            onClick={handleDec}
          // disabled={item?.minQty >= quantity}
          >
            <AiOutlineMinus />
          </button>
          <div className="number">{quantity ? quantity : 0}</div>
          <button
            type="button"
            className="plus"
            onClick={handleInc}
          // disabled={item?.maxQty <= quantity}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </>
  );
};
