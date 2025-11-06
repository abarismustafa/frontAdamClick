import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { CgShutterstock } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import save from "../../assets/img/product-detail/save.png";
import { QuantityCounter } from "../../components/cart/QuantityCounter";
import {
  setCartLists,
  useGetPickUpPointsByIdQuery,
  useGetPickUpPointsQuery,
  useGetProductDetailQuery,
  useOfflineAddPostMutation,
  useSetCartMutation,
} from "../../components/products/productSlice";
import { productData } from "../product-detail/mockData";
import { Spinner } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

function QuiekViewModal(props) {
  const { modelDataId } = props;
  const userid = window.localStorage.getItem("user_id");

  const [str, setStr] = useState(null);

  const { data: pickups, isSuccess: pickSucces } = useGetPickUpPointsQuery();
  const {
    data: valueChange,
    isLoading: isProduceDetailLoading,
    isFetching,
    isSuccess: issSusDat,
  } = useGetProductDetailQuery({
    proid: modelDataId,
    userid: userid ? userid : null,
  });
  // const { data: pickUpPointsData, isSuccess: pickupSuccess } = useGetPickUpPointsQuery();

  const [
    addToCart,
    {
      data,
      isLoading: isAddCartLoading,
      isSuccess: isAddToCartSuccess,
      isError: isAddToCartError,
    },
  ] = useSetCartMutation();

  const [isActive, setIsActive] = useState("");
  const [lightBox, setLightBox] = useState(false);

  const [variant, setVariant] = useState(0);
  // const [variantId, setVariantId] = useState(value?.variations[0]?._id)
  const [variantId, setVariantId] = useState(424242);
  const [pickId, setpickId] = useState();

  const fnSetVarian = (i, id) => {
    setVariant(i);
    setVariantId(id);
  };

  const [mainImage, setMainImage] = useState(productData?.data[0]);

  const handleUniqueID = (currentElm) => {
    setMainImage(currentElm);
    setIsActive(true);
  };

  const handleRemove = () => {
    setLightBox(false);
  };

  const handleLightBox = () => {
    setLightBox(!lightBox);
  };

  const [showpic, setShowPic] = useState(false);

  useEffect(() => {
    if (data) window.localStorage.setItem("cartItem", data?.cart);
  }, data);
  const setAddtoCart = () => {
    const userid = window.localStorage.getItem("user_id");
    const obj = {
      product_count: window.localStorage.getItem("productCount"),
      product_variant: variantId,
      product_id: valueChange?.getaProduct._id,
      deliveryType: "HOME DELIVERY",
      userid,
    };

    const obj2 = {
      product_count: window.localStorage.getItem("productCount"),
      pickupPoint: pickId,
      product_variant: variantId,
      product_id: valueChange?.getaProduct._id,
      deliveryType: "Pickup Point Delivery",
      userid,
    };

    if (pickId) {
      addToCart(obj2);
    } else {
      addToCart(obj);
    }
  };

  const setPickUpPontId = (item) => {
    setpickId(item._id);
    setStr(item);
    setShowPic(false);
  };

  const homeDelev = () => {
    setStr(null);
    setpickId(null);
  };

  const [mergsData, setMergsData] = useState(valueChange?.getaProduct?.images);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (issSusDat) {
      const cloen = [...valueChange?.getaProduct?.images];
      const obj = valueChange?.getaProduct?.mainimage_url;
      cloen.push(obj);
      setMergsData(cloen);
    }
  }, [issSusDat]);

  const isLogin = window.localStorage.getItem("isLogin");
  const [
    postOffline,
    { data: resData, isSuccess, isError: offErr, isLoading: isloadPost },
  ] = useOfflineAddPostMutation();
  const navigate = useNavigate();

  const { updatedProducts: products } = useSelector((state) => {
    return state.productList;
  });
  const BuyNowPro = (item) => {
    if (isLogin === "false") {
      postOffline({
        product_count: 1,
        product_variant: item?.variations[0]._id,
        deliveryType: "HOME DELIVERY",
        seller_id: "64269f0df127906d53878d3d",
        sku: item?.variations[0].sku,
        product_id: item?._id,
        products: products ? products : [],
      });
    } else {
      const payload = {
        product_count: 1,
        product_variant: item?.variations[0]._id,
        deliveryType: "HOME DELIVERY",
        seller_id: "64269f0df127906d53878d3d",
        sku: item?.variations[0].sku,
        product_id: item?._id,
        userid,
      };
      addToCart(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/cart");
    }
  }, [isSuccess]);

  const dispacher = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispacher(setCartLists(resData.cart.products));
    }
  }, [isSuccess, offErr]);

  return (
    <Modal {...props} keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Quick View
          </h1>
        </Modal.Title>
      </Modal.Header>
      {isFetching && (
        <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Modal.Body>
        <div className="modal-body seperate">
          <div>
            <section className="services">
              <div className="container-fluid p-3">
                <div className="modalViewSec">
                  <div className="modalFigure">
                    <div className="thumbnailSec">
                      <ul>
                        {mergsData?.map((item) => {
                          return (
                            <li
                              className={isActive ? "active" : ""}
                              key={item.id}
                              onClick={() => {
                                handleUniqueID(item);
                              }}
                            >
                              <img src={item.url} alt="Product" />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div
                      className="thumbView"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        style={{ width: "300px", height: "300px" }}
                        src={
                          valueChange?.getaProduct?.mainimage_url
                            ? valueChange?.getaProduct?.mainimage_url.url
                            : mainImage.url
                        }
                        alt={`${mainImage.alt}`}
                        className="img-fluid"
                        onClick={handleLightBox}
                      />
                      {lightBox && (
                        <div className="dialogueImg">
                          <div className="dialogueImgInfo">
                            <div className="dialogueImgHeader">
                              <h4 className="title">{mainImage.alt}</h4>
                              <span className="cancel" onClick={handleRemove}>
                                X
                              </span>
                            </div>
                            <img
                              src={
                                valueChange?.getaProduct?.mainimage_url
                                  ? valueChange?.getaProduct?.mainimage_url.url
                                  : mainImage.url
                              }
                              title={`${mainImage.alt}`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modalText">
                    <div className="_product-detail-content">
                      <p className="_p-name">
                        Name: {valueChange?.getaProduct?.name}
                      </p>
                      <div className="_p-price-box">
                        <div className="p-list">
                          <span>
                            Price :{" "}
                            <del>
                              {" "}
                              {valueChange?.getaProduct?.variations?.length &&
                                valueChange?.getaProduct?.variations[variant]
                                  ?.mrp}
                            </del>
                          </span>
                          <span className="price">
                            {valueChange?.getaProduct?.variations?.length &&
                              valueChange?.getaProduct?.variations[variant]
                                ?.sale_rate}{" "}
                          </span>
                        </div>
                        <div className="skuSec">
                          <label htmlFor="sku">
                            SKU:{" "}
                            {valueChange?.getaProduct?.variations?.length &&
                              valueChange?.getaProduct?.variations[variant]
                                ?.sku}
                          </label>
                        </div>

                        {/* <div className="saveImg">
                                                    <img src={save} alt="save" />
                                                </div> */}
                        <div className="productSize">
                          <h6>Size</h6>
                          <ul>
                            {valueChange?.getaProduct?.variations?.map(
                              (item, i) => {
                                return (
                                  <li key={i}>
                                    <button
                                      onClick={() => {
                                        fnSetVarian(i, item._id);
                                      }}
                                      className={classNames({
                                        activeBtnV: variantId === item._id,
                                      })}
                                    >
                                      <label htmlFor="weight">
                                        {item.weight}
                                      </label>
                                      <span className="price">
                                        {item?.sale_rate}
                                        <span className="offer">
                                          ({item.discount} OFF)
                                        </span>
                                      </span>
                                    </button>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                        <div>
                          <ul
                            className="deliveryModeList storageNumber"
                            id="myTab"
                            role="tablist"
                          >
                            <li role="presentation">
                              <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                typeof="button"
                                onClick={homeDelev}
                              >
                                Home Delivery
                              </button>
                            </li>
                            <li role="presentation">
                              <button
                                className="nav-link"
                                id="store-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#store"
                                type="button"
                                role="tab"
                                aria-controls="store"
                                typeof="button"
                                onClick={() => setShowPic(true)}
                              >
                                Pick up from store
                              </button>
                            </li>
                            {str && (
                              <div>Pick up Point :{str.pickupPoint_name}</div>
                            )}
                          </ul>

                          {showpic && (
                            <div className="pickupPoints">
                              {pickups?.map((item, i) => {
                                return (
                                  <div className="form-check" key={item._id}>
                                    <input
                                      className="form-check-input"
                                      onClick={() => {
                                        setPickUpPontId(item);
                                      }}
                                      type="radio"
                                      name="flexRadioDefault"
                                      id={`flexRadioDefault${i}`}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`flexRadioDefault${i}`}
                                      onClick={() => {
                                        setPickUpPontId(item);
                                      }}
                                    >
                                      {item.pickupPoint_name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {str && (
                            <div className="sellerInfo">
                              <span>You are buying from:</span>
                              <p>
                                <h6>
                                  Pickup Point Name : {str?.pickupPoint_name}
                                </h6>
                              </p>
                              <h6>{str?.address}</h6>
                              <h6>Phone :{str?.phone}</h6>
                              <p>
                                <h6>Province : {str?.province}</h6>
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="countryList">
                          <ul>
                            <li>
                              <TbWorld /> Country of origin: India
                            </li>
                            <li>
                              <AiOutlineLock /> Secure payments
                            </li>
                            <li>
                              {" "}
                              <CgShutterstock /> In stock, ready to ship
                            </li>
                          </ul>
                          <p className="taxInclude">
                            Tax included. Shipping calculated at checkout.
                          </p>
                        </div>

                        <div className="_p-add-cart">
                          <div className="addQuantity _p-qty">
                            <span>Add Quantity</span>
                            <QuantityCounter countValue={1} />
                          </div>
                        </div>
                        <div className="_p-features">
                          <strong> Description:</strong>
                          <p>{valueChange?.getaProduct?.meta_description}</p>
                        </div>

                        <div className="quickContentFooter">
                          <p>
                            FOR BULK ORDER INQUIRIES:{" "}
                            <Link to="#">CLICK HERE</Link>
                          </p>
                        </div>
                        {isAddToCartError && (
                          <h5 style={{ color: "red" }}>Product not added !</h5>
                        )}
                        {isAddToCartSuccess && (
                          <h5 style={{ color: "Green" }}>Product added .</h5>
                        )}
                        <form method="post" acceptCharset="utf-8">
                          <ul className="spe_ul" />
                          <div className="_p-qty-and-cart">
                            <div className="product-add-to-cart addToCart productCartBtn">
                              <button
                                className="default-btn buy"
                                type="button"
                                onClick={() =>
                                  BuyNowPro(valueChange?.getaProduct)
                                }
                              >
                                <FiShoppingCart /> Buy Now
                              </button>
                              <button
                                className="default-btn cart"
                                type="button"
                                onClick={setAddtoCart}
                              >
                                <BsFillCartFill /> Add to Cart{" "}
                                {isAddCartLoading && (
                                  <Spinner
                                    animation="border"
                                    variant="success"
                                  />
                                )}
                              </button>
                              <input type="hidden" name="pid" value={18} />
                              <input type="hidden" name="price" value={850} />
                              <input type="hidden" name="url" value />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default QuiekViewModal;
