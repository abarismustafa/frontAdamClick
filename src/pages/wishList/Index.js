import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  setWishCalc,
  useDeleteWishlistMutation,
  useGetWishListQuery,
} from "../../components/products/productSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import { getLoginDetails } from "../../Utils/localStorage";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

function WishList() {
  const isLogin = window.localStorage.getItem("isLogin");
  const navigate = useNavigate();
  const [deleteWishlist, { data: wishData, isSuccess }] =
    useDeleteWishlistMutation();
  useEffect(() => {
    if (isLogin === "false") {
      navigate("/login");
      return;
    }
  }, []);

  const userid = window.localStorage.getItem("user_id");

  const [data, setData] = useState(null);

  const baseUrl = base_url();
  const token = window.localStorage.getItem("token");
  const getData = async () => {
    try {
      // const res = await axios.get(`${baseUrl}user/wishlist`, {
      const res = await axios.get(`${baseUrl}user/wishlist_nw`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      alert("Fail to Load Wislist !");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let isLogin = getLoginDetails();
    if (!isLogin) getData();
  }, []);

  const deleteItem = (item) => {
    deleteWishlist({
      data: {
        prodId: item?.uid,
        variantId: item?.variations[0]?.variant_slug,
        userId: userid,
      },
      token: token,
    });
  };

  const dispacher = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      getData();
      dispacher(setWishCalc(wishData?.length));
    }
  }, [isSuccess]);
  const { t, i18n } = useTranslation();

  return (
    <>
    <Breadcrumb title={"Wishlist"} t={t} />
    <section className="sectionPD">
      <div className="container">
        <div className="">
          <div className="fisherman-content">
            <h3>{t("Wishlist")}</h3>
          </div>

          <div className="row ">
            {!data && <h2>Loading....</h2>}
            {data?.length === 0 && <h3>No Wishlist Place</h3>}
            {data &&
              data?.map((item) => {
                if (item == null) {
                  return;
                }
                return (
                  <>
                    <div
                      key={item._id}
                      className="col-xxl-3 col-xl-4 col-lg-3 col-md-4 col-sm-6"
                      id="wishlist_1"
                    >
                      <div className="featuredInfo">
                        <div className="featuredImg">
                          <Link
                            // to={`/product/${item.uid}/${item?.slug}`}
                            to={`/product/${item?.uid}/${item?.slug}/${item?.variations[0]?.variant_slug}`}
                            className="d-block mb-3"
                          >
                            {item?.variations[0]?.mainImage_url?.url ? (
                              <img
                                src={item.variations[0]?.mainImage_url?.url}
                                className="img-fluid"
                              />
                            ) : (
                              <img
                                src={item?.mainimage_url?.url}
                                className="img-fluid"
                              />
                            )}
                          </Link>

                          <div
                            className="rating rating-sm mb-1 d-none"
                            style={{ margin: "10px 0" }}
                          >
                            <i className="las la-star"></i>
                            <i className="las la-star"></i>
                            <i className="las la-star"></i>
                            <i className="las la-star"></i>
                            <i className="las la-star"></i>
                          </div>
                          <div className="d-none">
                            <span style={{ color: "red" }}>Variants </span>
                            {item?.variations &&
                              item?.variations.map((item) => {
                                return (
                                  <div key={item._id}>
                                    {item?.weight} , price : {item?.sale_rate}
                                  </div>
                                );
                              })}
                          </div>
                          <div className=" fs-14 d-none">
                            <span className="fw-600 text-primary">
                              ZK {item.purchase_price}
                            </span>
                          </div>
                        </div>
                        <div className="featuredContent">
                          <h5>
                            <Link
                              to={`/product/${item?.uid}/${item?.slug}/${item?.variations[0]?.variant_slug}`}
                            >
                              {" "}
                              {/* {t("Name")} : {item?.name} */}
                              {item?.name +
                                (item?.variations[0]?.variant_slug
                                  ? " " + item?.variations[0]?.variant_slug
                                  : "")}
                            </Link>
                          </h5>

                          <div className="buyNowInfo">
                            <button
                              type="button"
                              className="buyNow cart"
                              onClick={() => deleteItem(item)}
                            >
                              {t("Delete Item")}
                            </button>
                            <Link
                              to={`/product/${item?.uid}/${item?.slug}/${item?.variations[0]?.variant_slug}`}
                              className="btn btn-danger buyNow"
                            >
                              {t("View Detail")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* {Array.isArray(item?.variations) &&
                      item.variations.length > 0 &&
                      item?.variations?.map((variation, i) => {
                        console.log(variation?.variant_slug);


                        return <div
                          key={item._id}
                          className="col-xxl-3 col-xl-4 col-lg-3 col-md-4 col-sm-6"
                          id="wishlist_1"
                        >
                          <div
                            className="card mb-2 shadow-sm"
                            style={{ padding: "20px 0", paddingTop: "0" }}
                          >
                            <div className="card-body" style={{ paddingTop: "0" }}>
                              <Link
                                to={`/product/${item?.uid}/${item?.slug}/${variation?.variant_slug}`}
                                className="d-block mb-3"
                              >
                                {item?.variations[0]?.mainImage_url?.url ? (
                                  <img
                                    style={{
                                      height: "230px",
                                      width: "240px",
                                      objectFit: "contain",
                                      marginTop: "10px",
                                    }}
                                    src={
                                      variation?.mainImage_url?.url ||
                                      variation?.images?.[0]?.url ||
                                      "/no-image.jpg"
                                    }
                                    className="img-fit h-140px h-md-200px"
                                  />
                                ) : (
                                  <img
                                    style={{
                                      height: "230px",
                                      width: "240px",
                                      objectFit: "contain",
                                      marginTop: "10px",
                                    }}
                                    src={item?.mainimage_url?.url}
                                    className="img-fit h-140px h-md-200px"
                                  />
                                )}
                              </Link>
                              <h5
                                className="fs-14 mb-0 lh-1-5 fw-600 text-truncate-2"
                                style={{ color: "black" }}
                              >
                                <Link
                                  to={`/product/${item?.uid}/${item?.slug}/${variation?.variant_slug}`}
                                  className="text-reset"
                                  style={{ fontSize: "16px", color: "black" }}
                                >
                                  {" "}


                                  {item?.name + (variation?.variant_slug ? " " + variation.variant_slug : "")}
                                </Link>
                              </h5>
                              <div
                                className="rating rating-sm mb-1"
                                style={{ margin: "10px 0" }}
                              >
                                <i className="las la-star"></i>
                                <i className="las la-star"></i>
                                <i className="las la-star"></i>
                                <i className="las la-star"></i>
                                <i className="las la-star"></i>
                              </div>
                              <div className="d-none">
                                <span style={{ color: "red" }}>Variants </span>
                                {item?.variations && item?.variations.map((item) => {
                                  return <div key={item._id}>{item?.weight} , price : {item?.sale_rate}</div>
                                })}
                              </div>
                              <div className=" fs-14 d-none">
                                <span className="fw-600 text-primary">ZK {item.purchase_price}</span>
                              </div>
                            </div>
                            <div
                              className="buyNowInfo"
                              style={{
                                borderTop: "1px solid gray",
                                paddingTop: "10px",
                                paddingLeft: '10px',
                                paddingRight: '10px'
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-danger addCart w-100 delt"
                                onClick={() => deleteItem(item?.uid)}
                              >
                                {t("Delete Item")}
                              </button>
                              <Link
                                to={`/product/${item?.uid}/${item?.slug}/${variation?.variant_slug}`}
                                className="btn btn-primary buyNow"
                              >
                                {t("View Detail")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      })} */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
export default WishList;
