import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUpdatedProduct,
  setCartLeng,
  clereCartLitsItem,
  useClearAllListMutation,
  useDeleteDataMutation,
  useGetCartQuery,
  useGetCouponMutation,
  useOfflineCartListMutation,
  useSetQuantityCartMutation,
  setCartCalc,
} from "../products/productSlice";
import { ApiQuatity } from "./ApiQuantity";
import { AiFillDelete } from "react-icons/ai";
import productSmall1 from "../../assets/img/products/productSmall1.jpg";
import LoginCartSec from "./LoginCartSec";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import CoupensList from "./CoupensList";
import { Popconfirm } from "antd";
import { DatabaseFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { base_url } from "../../server";
import { getCartToken, getCouponToken } from "../../Utils/localStorage";
import LoginAllPage from "../../common/loginAllPage/LoginAllPage";
function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogin = window.localStorage.getItem("isLogin");
  const user_id = window.localStorage.getItem("user_id");
  const [modalShow, setModalShow] = useState(false);
  const dispach = useDispatch();
  const curr = window.localStorage.getItem("currencySym");
  let currencySymbol = curr;
  if (currencySymbol === "undefined") {
    currencySymbol = "ZK";
  }
  const [
    getDisCoupons,
    { isLoading, isSuccess: coupenSuss, data: couponData },
  ] = useGetCouponMutation();
  // const { data, isSuccess } = useGetCartQuery(user_id);
  const [isSuccess, setisSuccess] = useState(false);
  const [showData, setShowData] = useState(null);
  const baseUrl = base_url();
  const { updatedProducts: products, cartCal } = useSelector((state) => {
    return state.productList;
  });

  useEffect(() => {
    if (couponData?.coupon) {
      window.localStorage.setItem("couponToken", couponData?.coupon);
    }
  }, [couponData]);

  const getCartData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
        }`
      );
      setisSuccess(true);
      setShowData(res.data);
      dispach(setCartLeng(res.data?.cart?.products.length));
      dispach(setCartCalc(res.data));
    } catch (error) {
      setisSuccess(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (coupenSuss) {
      getCartData();
    }
  }, [coupenSuss]);

  const navigate = useNavigate();

  const [deleteList, { isSuccess: alldlete }] = useClearAllListMutation();
  const [
    deleteSingleItem,
    { data, isLoading: isLoadingDelete, isSuccess: isdeletesuss },
  ] = useDeleteDataMutation();

  useEffect(() => {
    if (isdeletesuss) {
      // window.localStorage.removeItem("cartItem");
      // window.localStorage.setItem("cartItem", data?.products);
      setTimeout(() => {
        getCartData();
      }, 1000);
    }
    if (alldlete) {
      window.localStorage.removeItem("cartItem");
      setTimeout(() => {
        getCartData();
        dispacher(setCartLeng());
      }, 500);
    }
  }, [isdeletesuss, alldlete]);

  const [getOffCartList, { data: offCartList, isSuccess: issucOff }] =
    useOfflineCartListMutation();

  const [modalShowCoupen, setModalShowCoupen] = useState(false);

  const dispacher = useDispatch();
  const deleteData = () => {
    const userid = window.localStorage.getItem("user_id");

    deleteList(userid);
  };

  const token = window.localStorage.getItem("token");
  const deleteSingle = (i) => {
    deleteSingleItem({ userid: user_id, index: i, token: token });
  };

  const orderConfirm = () => {
    const isLogin = window.localStorage.getItem('isLogin') === 'true';

    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    navigate("/checkout");
  };

  const couponRef = useRef();

  const sendCouponFree = (val) => {
    getDisCoupons({ value: val });
  };

  const [dataOff, setDataOf] = useState(offCartList);

  const deleteCartList = (id) => {
    deleteSingleItem({ userid: user_id, id: id });
  };

  useEffect(() => {
    if (offCartList) {
      setDataOf(offCartList);
    }
  }, [issucOff]);

  const { t, i18n } = useTranslation();
  const sendCouponRemove = async () => {
    try {
      const res = await axios.delete(`${baseUrl}cart/removeCoupon`, {
        withCredentials: true,
      });
      getCartData();
    } catch (error) { }
  };

  return (
    <>
      <Helmet>
        <title>Cart | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <section className="cartBody">
        {/* {!isSuccess && <div className="preloaderCount">
       <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
       </div>
     </div>} */}

        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="cartTable table-responsive">
                <table className="table cartTablePage">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t("Item")}</th>
                      {/* <th>{t('Variation')}</th> */}
                      <th>{t("Price")}</th>
                      <th>{t("Quantity")}</th>
                      {/* <th>{t('Tax%')}</th>
                    <th>{t('Tax Amt')}</th> */}
                      <th>{t("Total")}</th>
                      <th>{t("Delivery Type")}</th>
                      {/* <th>
                        <AiFillDelete />
                      </th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showData &&
                      showData?.cart?.products.map((item, i) => {
                        console.log(item);
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="productImageInfo">
                                <figure>
                                  <Link
                                    to={`/product/${item?.productUid}/${item?.slug}/${item?.variant?.variant_slug}`}
                                    className="productImage"
                                  >
                                    {item?.variant ? (
                                      <img
                                        src={item?.variant?.mainImage_url?.url}
                                      />
                                    ) : (
                                      <img
                                        src={item?.product?.mainImage_url?.url}
                                      />
                                    )}
                                  </Link>
                                </figure>
                                <h5>
                                  <Link
                                    to={`/product/${item?.productUid}/${item?.slug}/${item?.variant?.variant_slug}`}
                                  >
                                    {item?.name}
                                  </Link>
                                </h5>
                              </div>
                            </td>
                            {/* <td>{item?.variant ? item?.variant?.weight : ""}</td> */}
                            <td>
                              <h6 className="text-nowrap">
                                {showData?.currency?.symbol}{" "}
                                {item?.price?.sale_rate}
                              </h6>
                            </td>

                            <td>
                              <ApiQuatity
                                countValue={item.qty}
                                i={i}
                                item={item}
                                getCartData={getCartData}
                              />
                            </td>

                            {/* <td>
                          <div style={{ display: "flex", justifyContent: "center" }}>{item.tax}</div>
                        </td>
                        <td>
                          <div style={{ display: "flex", justifyContent: "center" }}>{item.tax}</div>
                        </td> */}
                            <td>
                              <h6 className="text-nowrap">
                                {showData?.currency?.symbol} {item.total}
                              </h6>
                            </td>
                            <td>{item?.deliveryType}</td>
                            <td>
                              <Popconfirm
                                title="Delete Item"
                                description="Are you sure to delete the Item from The Cart? "
                                icon={
                                  <QuestionCircleOutlined
                                    style={{
                                      color: "red",
                                    }}
                                  />
                                }
                                onConfirm={() => {
                                  deleteSingle(i);
                                }}
                              >
                                <span className="itemRemove">
                                  <AiFillDelete />
                                </span>
                              </Popconfirm>
                              {/* <AiFillDelete onClick={() => deleteSingle(i)} /> */}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {
                <h5 className="grandTotal">
                  {t("Grand Total")} : {showData?.currency?.symbol}{" "}
                  {showData?.cart?.grandTotal}
                </h5>
              }
              <div className="cartDiscountInfo">
                <div className="updateBtn d-flex">
                  <button
                    type="button"
                    className="commonButton bg-danger border-0 text-white rounded"
                    onClick={deleteData}
                  >
                    {t("Clear All")}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="cartTotals">
                {/* <input placeholder={t('Apply Coupon')} className="form-control" ref={couponRef} />
              <button type="button" className="btn btn-info" style={{ margin: '10px 0' }} onClick={sendCouponFree}>{t('Apply Coupon')}</button> */}

                <Button
                  variant="primary w-100"
                  disabled={showData?.cart?.products?.length == 0}
                  onClick={() => setModalShowCoupen(true)}
                >
                  Apply Coupon
                </Button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2 mb-2"
                  disabled={showData?.cart?.discount == 0}
                  onClick={sendCouponRemove}
                >
                  Remove Coupon
                </button>
                {modalShowCoupen && (
                  <CoupensList
                    show={modalShowCoupen}
                    onHide={() => setModalShowCoupen(false)}
                    sendCouponFree={sendCouponFree}
                  />
                )}
                <h5 className="cartTitle">{t("Price Details")}</h5>

                {/* <div className="subTotal">
                <h6>Base Price</h6>
                <p>{showData?.cart?.basePrice}</p>
              </div> */}

                {/* <div className="subTotal">
                  <h6>Discount Amount </h6>
                  <p>{offCartList?.discount}</p>
                </div> */}

                <div className="subTotal">
                  <h6>{t("Subtotal")}</h6>
                  <p>{showData?.cart?.subTotal.toFixed(2)}</p>

                </div>
                <div className="subTotal">
                  <h6>{t("Coupon Applied")}</h6>
                  <p> {showData?.cart?.coupon_id?.discount}</p>
                </div>
                {/* <div className="subTotal">
                <h6>{t('Shipping')}</h6>
                <p> {showData?.cart?.products[0]?.shippingCost}</p>
              </div> */}
                <div className="subTotal">
                  <h6>{t('IGST')}</h6>
                  <p>  {showData?.cart?.igst ? showData?.cart?.igst : showData?.cart?.tax}</p>
                </div>
                <div className="subTotal">
                  <h6>{t('SGST')}</h6>
                  <p>  {showData?.cart?.sgst ? showData?.cart?.sgst : '0'}</p>
                </div>
                <div className="subTotal">
                  <h6>{t('CGST')}</h6>
                  <p> {showData?.cart?.cgst ? showData?.cart?.cgst : "0"}</p>
                </div>
                <div className="subTotal">
                  <h6>{t("Cart Total")}</h6>
                  <p> {showData?.cart?.grandTotal}</p>
                </div>
                <hr />
                {isLogin === "true" ? (
                  <button
                    type="button"
                    className="commonButton w-100 bg-success text-white border-0"
                    onClick={orderConfirm}
                  >
                    {t("proceed to checkout")}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="commonButton w-100 bg-success text-white border-0"
                    onClick={orderConfirm}
                  >
                    {t("proceed to checkout")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalShow && (
        <LoginCartSec show={modalShow} onHide={() => setModalShow(false)} />
      )}
      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      // BuyNowItem={BuyNowItem}
      />
    </>
  );
}

export default Cart;
