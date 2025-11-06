import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../products/productSlice";
import TodayDealsProduct from "./today-deal-product/TodayDealsProduct";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";

function TodayDeals() {
  const { data, isLoading, error } = useGetProductsQuery();

  const todayProducts = data?.filter((currentItem) => {
    return currentItem.todays_deal === true;
  });

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

  return (
    <>
      {todayProducts?.length && (
        <section className="todayDealsSec p-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="fishermanHeader d-flex justify-content-between align-items-end mb-4">
                  <div className="fisherman-content">
                    <span>our Today Deals</span>
                    <h3>Today Deals</h3>
                  </div>
                  <div className="fisherman-btn">
                    <Link to="/products" className="optional-btn">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
              <TodayDealsProduct
                data={todayProducts}
                isLoading={isLoading}
                error={error}
                setProduct_id={setProduct_id}
                handleShow={handleShow}
              />
            </div>
          </div>

          {modelDataId && (
            <QuiekViewModal
              modelDataId={modelDataId}
              show={show}
              onHide={handleClose}
              size="xl"
              centered
            />
          )}
        </section>
      )}
    </>
  );
}

export default TodayDeals;
