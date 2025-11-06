import mamaspro from "../../assets/img/products/mp4.1.webp";
import { BsFillCartFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { CustomToaster } from "../../common/toaster/CustomToaster";
import { useEffect, useState } from "react";
import { setCartLeng, useSetCartMutation } from "../products/productSlice";
import { useDispatch } from "react-redux";
import Rating from "../../shared/rating/Rating";
import LoginAllPage from "../../common/loginAllPage/LoginAllPage";

function CatogaryItem({ item, i, handleShow, t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const curr = window.localStorage.getItem("currencySym");
  let currencySymbol = curr;
  if (currencySymbol === "undefined") {
    currencySymbol = " QAR";
  }
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
  });
  const navigate = useNavigate();
  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };
  const [names, setNames] = useState("");
  const [
    addToCart,
    {
      data: datacart,
      isLoading: isAddCartLoading,
      isSuccess: isAddToCartSuccess,
      isError: isAddToCartError,
    },
  ] = useSetCartMutation();
  const BuyNowItem = (item, isAddTocard) => {
    // if (window.localStorage.getItem('isLogin') == 'false') {
    //     alert('Login First')
    //     return
    // }
    const isLogin = window.localStorage.getItem('isLogin') === 'true';

    if (!isLogin && !isAddTocard) {
      setIsModalOpen(true);
      return;
    }
    setNames(item.name);
    const payload = {
      qty: 1,
      pickupPoint: null,
      variantId: item.variations[0]?.uid,
      productId: item.uid,
      deliveryType: "HOME DELIVERY",
      seller_id: item.prices?.seller_id,
      sku: item.prices?.sku,
    };
    addToCart(payload);
    if (!isAddTocard) {
      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
    }
  };
  const dispacher = useDispatch();
  useEffect(() => {
    if (isAddToCartSuccess) {
      dispacher(setCartLeng(datacart?.cartLength));
      setShowToaster({
        show: true,
        message: "Product added successfully!",
        color: "success",
      });
      window.localStorage.setItem("cartItem", datacart?.cart);
    }
    if (isAddToCartError) {
      setShowToaster({
        show: true,
        message: "Something went wrong Product Not Add",
        color: "danger",
      });
    }
  }, [isAddToCartSuccess, isAddToCartError]);
  // const handleAddCart = (item) => {
  //   setNames(item.name);
  //   const payload = {
  //     qty: 1,
  //     pickupPoint: null,
  //     variantId: item.variations[0]?.uid,
  //     productId: item.uid,
  //     deliveryType: "HOME DELIVERY",
  //     seller_id: item.prices?.seller_id,
  //     sku: item.prices?.sku,
  //   };
  //   addToCart(payload);
  // };

  console.log(item);

  return (
    <>
      {/* <div className="col-lg-4 col-md-6 col-sm-6 col-6 cusname" key={item._id}>
        <CustomToaster
          color={showTaoster.color}
          title={names}
          show={showTaoster.show}
          setShow={handleToaster}
          message={showTaoster.message}
          position="bottom-end"
          delay={10000}
        />
        <div className="featuredInfo products">
          <div className="">
            <div className="featuredImg">
              <Link to={`/product/${item?.uid}/${item?.slug}`}>
                {item?.variations[0]?.mainImage_url?.url ? (
                  <img
                    src={item?.variations[0]?.mainImage_url.url}
                    alt="Product"
                    className="imgProduct"
                  />
                ) : (
                  <img src={mamaspro} alt="Product" />
                )}
              </Link>
              <div className="quickView d-none">
                <ul>
                  <li className="viewProduct">
                    <button
                      className="quick_view_btn"
                      onClick={(e) => {
                        handleShow(item._id);
                      }}
                    >
                      <FiSearch />
                    </button>
                  </li>
                  <li className="addProduct">
                    <Link to="/products">
                      <GrAdd />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="hotList d-none">
              <li>
                <Link to="/products">hot</Link>
              </li>
              <li>
                <Link to="products">-20%</Link>
              </li>
            </ul>
          </div>
          <div className="featuredContent">
            <Rating />
            <h5>
              <Link to={`/product/${item.uid}/${item.slug}`}>{item.name}</Link>
            </h5>

            <span>
              MRP:{" "}
              <span className="text-decoration-line-through">
                ₹{item?.variations[0]?.prices?.mrp}
              </span>
            </span>

            {item?.prices ? (
              <p>
                <span className="currentPrice">
                  Sale Price:
                  {item?.country?.code} {item?.prices?.sale_rate}{" "}
                </span>
              </p>
            ) : (
              <p>
                {item?.variations[0]?.prices?.country_id?.code}{" "}
                {item?.variations[0]?.prices?.sale_rate}
              </p>
            )}

            <div className="buyNowInfo">
              <Link
                to="#"
                className="btn btn-danger buyNow"
                onClick={() => {
                  BuyNowItem(item);
                }}
              >
                {t("Buy Now")}
              </Link>
              <Link
                to={`#`}
                onClick={() => BuyNowItem(item, true)}
                className="buyNow cart"
              >
                {" "}
                {t("Add to cart")}
              </Link>
            </div>

            <div className="productDesc">
              <p>{item.meta_description}</p>
            </div>
            <div className="featuredOption">
              <select defaultValue={"DEFAULT"}>
                <option value="DEFAULT">Select Option</option>
                <option value="one">One</option>
                <option value="two">Two</option>
              </select>
            </div>
          </div>
        </div>
      </div> */}


      {Array.isArray(item?.variations) &&
        item?.variations
          .filter((variation) => variation?.isActive)
          .map((variation, i) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-6 cusname"
                key={variation._id || i}
              >
                <CustomToaster
                  color={showTaoster.color}
                  title={names}
                  show={showTaoster.show}
                  setShow={handleToaster}
                  message={showTaoster.message}
                  position="bottom-end"
                  delay={10000}
                />

                <div className="featuredInfo products">
                  <div className="">
                    <div className="featuredImg">
                      <Link
                        to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                      >
                        {variation?.mainImage_url?.url ? (
                          <img
                            src={
                              variation?.mainImage_url?.url ||
                              variation?.images?.[0]?.url ||
                              "/no-image.jpg"
                            }
                            alt="Product"
                            className="imgProduct"
                          />
                        ) : (
                          <img src={mamaspro} alt="Product" />
                        )}
                      </Link>

                      <div className="quickView d-none">
                        <ul>
                          <li className="viewProduct">
                            <button
                              className="quick_view_btn"
                              onClick={() => handleShow(item._id)}
                            >
                              <FiSearch />
                            </button>
                          </li>
                          <li className="addProduct">
                            <Link to="/products">
                              <GrAdd />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <ul className="hotList d-none">
                      <li>
                        <Link to="/products">hot</Link>
                      </li>
                      <li>
                        <Link to="/products">-20%</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="featuredContent">
                    <Rating />
                    <h5>
                      <Link
                        to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                      >
                        {item?.name +
                          (variation?.variant_slug
                            ? " " + variation.variant_slug
                            : "")}
                      </Link>
                    </h5>

                    <span>
                      MRP:{" "}
                      <span className="text-decoration-line-through">
                        ₹{variation?.prices?.mrp}
                      </span>
                    </span>

                    <p>
                      <span className="currentPrice">
                        Sale Price: {item?.country?.code}{" "}
                        {variation?.prices?.sale_rate}
                      </span>
                    </p>

                    <div className="buyNowInfo">
                      <Link
                        to="#"
                        className="btn btn-danger buyNow"
                        onClick={() => BuyNowItem(item)}
                      >
                        {t("Buy Now")}
                      </Link>
                      <Link
                        to="#"
                        onClick={() => BuyNowItem(item, true)}
                        className="buyNow cart"
                      >
                        {t("Add to cart")}
                      </Link>
                    </div>

                    <div className="productDesc">
                      <p>{item.meta_description}</p>
                    </div>

                    <div className="featuredOption">
                      <select defaultValue={"DEFAULT"}>
                        <option value="DEFAULT">Select Option</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        BuyNowItem={BuyNowItem}
      />

    </>
  );
}
export default CatogaryItem;
