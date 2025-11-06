import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFeaturedProductQuery } from "../../products/productSlice";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";
import { featuredDB } from "../../../rki-data/category";
import axios from "axios";
import { base_url } from "../../../server";
import { useTranslation } from "react-i18next";
import FeaturedProduct from "../featured-products/featured-product/FeaturedProduct";

function PopularProduct() {
  const [data, setData] = useState();
  const [error, seterror] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const baseUrl = base_url();
  const getdata = async (page) => {
    setisLoading(true);
    try {
      // const res = await axios.get(`https://onlineparttimejobs.in/api/product/page/${page}&${12}`, { withCredentials: true })
      const res = await axios.get(`${baseUrl}product/featured`);
      setData(res.data);
      setisLoading(false);
    } catch (error) {
      console.log("server error")
      seterror(true);
      setisLoading(false);
    }
  };
  useEffect(() => {
    getdata(0);
  }, []);

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

  return (
    <>
      {!!sortedData?.length && (
        <section className="productsSection p-30">
          <div className="container-fluid">
            <div className="row featuredRow">
              <div className="col-lg-12">
                <div className="fishermanHeader ">
                  <div className="fisherman-content">
                    <h3>{t("Best Seller")}</h3>
                  </div>
                  <div className="fisherman-btn d-none">
                    <Link to="/products" className="optional-btn">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
              <FeaturedProduct
                data={sortedData}
                getFeaturedPro={getdata}
                isLoading={isLoading}
                error={error}
                handleShow={handleShow}
                setProduct_id={setProduct_id}
                isPopular={true}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PopularProduct;
