import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeCountInProduct } from "../products/productSlice";
import { CustomToaster } from "../../common/toaster/CustomToaster";

export const QuantityCounter = ({ val, countValue, item = null }) => {
  const [quantity, setQuantity] = useState(countValue);
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
    name: item?.name,
  });

  const data = useSelector((data) => {
    return data.productList.products;
  });

  const handleInc = () => {
    // if (!(val?.total_quantity <= quantity)) {
    if (1) {
      setQuantity(+quantity + 1);
      window.localStorage.setItem("productCount", quantity + 1);
      setShowError(false);
    } else {
      setShowError(true);
      setShowToaster({
        show: true,
        message: `Maximum order accepted  
        ${val?.total_quantity}`,
        color: "danger",
        name: val?.name,
      });
    }
  };

  const handleDec = () => {
    if (!(countValue >= quantity)) {
      setQuantity(+quantity - 1);
      window.localStorage.setItem("productCount", quantity - 1);
      setShowError(false);
    } else {
      setShowError(true);
      setShowToaster({
        show: true,
        message: `Minimum order accepted  
        ${countValue}`,
        color: "danger",
        name: val?.name,
      });
    }
  };

  useEffect(() => {
    if (item && quantity && quantity > 1) {
      const newData = data.map((val) => {
        if (val._id === item._id) {
          return {
            ...val,
            count: quantity,
            subTotal: quantity * val.product?.purchase_price,
          };
        }
        return val;
      });
      dispatch(changeCountInProduct(newData));
    }
  }, [quantity]);

  const changeQty = (e) => {
    setQuantity(+e.target.value);
    window.localStorage.setItem("productCount", +e.target.value);
  };

  return (
    <div>
      {/* {showError && (
        <CustomToaster
          color={showTaoster.color}
          title={showTaoster?.name}
          show={showTaoster.show}
          setShow={() => setShowError(false)}
          message={showTaoster.message}
          position="top-end"
          delay={10000}
        />
      )} */}
      <div className="quantity">
        <button type="button" className="minus" onClick={handleDec}>
          <AiOutlineMinus />
        </button>
        <input
          value={quantity ? quantity : 0}
          className="form-control"
          style={{ width: "45px", height: "30px", textAlign: "center" }}
          readOnly
          onChange={changeQty}
        />
        {/* <div className="number">{quantity ? quantity : 0}</div> */}
        <button type="button" className="plus" onClick={handleInc}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};
