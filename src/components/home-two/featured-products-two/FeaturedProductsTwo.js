import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFeaturedProductQuery } from "../../products/productSlice";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";
import { featuredDB } from "../../../rki-data/category";
import FeaturedProductTwo from "./featured-product-two/FeaturedProductTwo";

function FeaturedProductsTwo() {
  const { data, error, isLoading } = useGetFeaturedProductQuery();

  const [modelDataId, setModelDataId] = useState(null);
  const setProduct_id = (id) => {
    setModelDataId(id);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };

  const [featuredData, setFeaturedData] = useState(featuredDB);

  return (
    <>
      {featuredData?.length && (
        <section className="productsSection sectionPD">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sectionGridTitle">
                  <div className="sectionTitle">
                    <p>our products</p>
                    <h3>featured products</h3>
                  </div>
                  <div className="fisherman-btn">
                    <Link to="/products" className="optional-btn">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
              <FeaturedProductTwo
                data={featuredData}
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
      )}
    </>
  );
}

export default FeaturedProductsTwo;
