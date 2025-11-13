import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFeaturedProductQuery } from "../../products/productSlice";
import FeaturedProduct from "./featured-product/FeaturedProduct";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";
import { featuredDB } from "../../../rki-data/category";
import axios from "axios";
import { base_url } from "../../../server";
import { useTranslation } from "react-i18next";


import Rating from "../../../shared/rating/Rating";

function FeaturedProducts() {
  const [data, setData] = useState();
  const [error, seterror] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const baseUrl = base_url();
  const getdata = async (page) => {
    setisLoading(true);
    try {
      // const res = await axios.get(`https://onlineparttimejobs.in/api/product/page/${page}&${12}`, { withCredentials: true })
      const res = await axios.get(`${baseUrl}product/page/0&10000`, {
        withCredentials: true,
      });
      setData(res.data);
      setisLoading(false);
    } catch (error) {
      console.log("server error");
      seterror(true);
      setisLoading(false);
    }
  };
  useEffect(() => {
    getdata(0);
  }, []);
  console.log("data -", data);
  const [modelDataId, setModelDataId] = useState(null);
  const setProduct_id = (id) => {
    setModelDataId(id);
  };

  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };

  const sortedData = useMemo(() => {
    return data?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }, [data]);

  // Custom product Data
  const custom = [
    {
      id: 1,
      url: "",
      title: "Drop Stitch Wakeboard",
      price: "499",
    },
    {
      id: 2,
      url: "",
      title: "Moisturizer Summer Skin",
      price: "599",
    },
    {
      id: 3,
      url: "",
      title: "Dry Skin Moisturizer Lotion",
      price: "2,299",
    },
    {
      id: 4,
      url: "",
      title: "100% Body Care",
      price: "Rs. 2,299",
    },
    {
      id: 5,
      url: "",
      title: "Women Beauty Glow",
      price: "1100",
    },
    {
      id: 6,
      url: "",
      title: "ISUP Drop Stitch Wakeboard",
      price: "779",
    },
    {
      id: 7,
      url: "",
      title: "True Match Nude Hyaluronic",
      price: "433",
    },
    {
      id: 8,
      url: "",
      title: "Body Serum For Women",
      price: "2,299.00",
    },
    // {
    //   id: 9,
    //   url: product9,
    //   title: "première decalcifying pre-shampoo concentrate",
    //   price: "Rs. 2,299.00",
    // },
    // {
    //   id: 10,
    //   url: product10,
    //   title: "discover the new première for all types of damaged hair",
    //   price: "Rs. 4,29.00",
    // },
    // {
    //   id: 11,
    //   url: product11,
    //   title: "discover the new première for all types of damaged hair",
    //   price: "Rs. 1,299.00",
    // },
    // {
    //   id: 12,
    //   url: product5,
    //   title: "discover the new première for all types of damaged hair",
    //   price: "Rs. 2,200",
    // },
  ];
  // Custom product Data

  return (
    <>
      <section className="productsSection sectionPD">
        <div className="container">
          <div className="row featuredRow">
            <div className="col-lg-12">
              <div className="fishermanHeader ">
                <div className="fisherman-content">
                  {/* <h6>{t("Newly Arrived Products")}</h6> */}
                  <h3 className="mobileTitle">{t("Explore New Arrivals")}</h3>
                </div>
                <div className="fisherman-btn d-none">
                  <Link to="/products" className="optional-btn">
                    View More
                  </Link>
                </div>
              </div>
            </div>

            <div className="categoryWrapper row d-none">
              {custom.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className="featuredInfo products">
                        <div className="featuredImg">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="img-fluid"
                          />

                        </div>
                        <div className="featuredContent">
                          <Rating />
                          <h5 className="mb-2">{item.title}</h5>
                          <p className="mb-0">₹: {item.price}.00</p>

                          <div className="buyNowInfo d-flex">
                            <Link className="btn btn-danger buyNow d-none" to={`#`}>
                              Buy Now
                            </Link>

                            <Link to={`#`} className="buyNow cart">
                              {t("Add")}{" "}
                              <i className="ri-arrow-right-up-fill"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <FeaturedProduct
              data={sortedData}
              getFeaturedPro={getdata}
              isLoading={isLoading}
              error={error}
              handleShow={handleShow}
              setProduct_id={setProduct_id}
            />
          </div>
        </div>

        {/* {modelDataId && (
          <QuiekViewModal modelDataId={modelDataId} show={show} onHide={handleClose} size="xl"
            centered />
        )} */}
      </section>
    </>
  );
}

export default FeaturedProducts;
