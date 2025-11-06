import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

import PrivacyPolicy from "../../common/privacy-policy/PrivacyPolicy";
import { BrandImg } from "../home/proImgs/Brandimg";
import { Helmet } from "react-helmet";
import { useListAllBrandQuery } from "../products/productSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function ViewAllBrand() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const baseUrl = base_url();

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}brand/public`);
      setData(res.data);
    } catch (error) {
      console.log("Server Error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Brands | Adamclick</title>
        <meta name="keyword" content="Adamclick" />
        <meta name="description" content="Adamclick" />
      </Helmet>
      <section className="brandsSec sectionPD">
        {/* {isLoading && <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>} */}
        <div className="container">
          <div className="fisherman-content">
            <h3>{t("Top Brands")}</h3>
          </div>
          <div className="fullBrands">
            <div className="row">
              {data &&
                data.map((item, i) => {
                  return (
                    <div className="col-lg-2 col-md-3  col-4" key={item._id}>
                      <div className="fullBrandsItem">
                        <Link to={`/product/brand/${item._id}`}>
                          <img
                            src={
                              item?.logo?.url
                                ? item?.logo?.url
                                : BrandImg[i]?.url
                            }
                            
                            alt="Brand"
                            className="img-fluid"
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <PrivacyPolicy t={t} />
    </>
  );
}

export default ViewAllBrand;
