import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useGetFeaturedProductQuery } from '../../products/productSlice'
import Producting from "./Producting";
import ban from "../../../assets/ban.jpg";

function CatagProduct({ item }) {
  const [modelDataId, setModelDataId] = useState(null);
  const setProduct_id = (id) => {
    setModelDataId(id);
  };
  return (
    <>
      <section className="productsSection p-30 d-none">
        <div className="container">
          <div className="row featuredRow">
            <div className="col-lg-12">
              <div className="fishermanHeader ">
                <div className="fisherman-content">
                  <h3>{item?.categoryName}</h3>
                  <p></p>
                </div>
                <div className="fisherman-btn d-none">
                  <Link to="/products" className="optional-btn">
                    View More
                  </Link>
                </div>
              </div>
              <div className="d-none" style={{ margin: "20px 0" }}>
                <img src={item?.banner.url} />
              </div>
            </div>
            <Producting data={item.list} setProduct_id={setProduct_id} />
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

export default CatagProduct;
