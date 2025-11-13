import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import barCode from "../../assets/img/barCode.png";

import axios from "axios";

import QRCode from "react-qr-code";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function TrackOrder() {
  const [state, setState] = useState({
    order_code: "",
    phone: "",
  });

  const [data, setData] = useState();

  const onchageHandel = (e) => {
    const obj = { ...state };
    obj[e.target.name] = e.target.value;
    setState(obj);
  };

  const [isError, setIserror] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  // let message ;
  const baseUrl = base_url();
  const getDataOrder = async () => {
    setIsloading(true);
    try {
      const res = await axios.post(`${baseUrl}track-order/public`, state);
      setData(res.data);
      setIsloading(false);
      setIserror(false);
    } catch (error) {
      setIserror(true);
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      setData(null);
      alert("Somthing Went Wrong !");
    }
  }, [isError]);

  const { t } = useTranslation();

  return (
    <>
      <div className="sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fisherman-content">
                <h3>{t("Check Your Order Status")}</h3>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder={t("Order Code / Reference No")}
                  name="order_code"
                  className="form-control"
                  onChange={onchageHandel}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <input
                  type="number"
                  name="phone"
                  placeholder={t("Mobile Number")}
                  className="form-control"
                  onChange={onchageHandel}
                />
              </div>
            </div>
            <div>
              <button className="commonButton" onClick={getDataOrder}>
                {t("Track Order")}
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {data && (
            <div className="row orderdetails" id="pdfGen">
              <div className="bar-code">
                <div>
                  <h5>
                    {" "}
                    Customer Name : {data?.getaOrderById?.user?.firstname}{" "}
                    {data?.getaOrderById?.user?.lastname}
                  </h5>
                  <h6>
                    <span className="fontSize">Order Date</span> :
                    {data?.createdAt}
                  </h6>
                  <h6>
                    <span className="fontSize">Order No</span> :{" "}
                    <span style={{ color: "#fb641b" }}>
                      {data?.getaOrderById.order_referenceNo}
                    </span>
                  </h6>
                  <h6>
                    <span className="fontSize">Order Amount</span> :{" "}
                    {data?.getaOrderById?.currency?.symbol}{" "}
                    <strong>{data?.getaOrderById?.grandTotal}</strong>.0
                  </h6>
                  <h6>
                    <span className="fontSize">Paid</span> :{" "}
                    {data?.getaOrderById?.Paid}.0
                  </h6>
                  <h6>
                    <span className="fontSize">Balance</span> :{" "}
                    {data?.getaOrderById?.Balance}.0
                  </h6>
                </div>
                <div>
                  <h6>
                    <span className="fontSize">Delivery Status</span> :
                    <span style={{ color: "#fb641b" }}>
                      <strong>
                        {data?.getOrderTrans[0].orderStatusId.orderStatusName}
                      </strong>
                    </span>{" "}
                  </h6>
                  <h6>
                    <span className="fontSize">Payment Status</span> :{" "}
                    {data?.getaOrderById?.Payment_Status?.paymentStatusName}
                  </h6>
                  <h6>
                    <span className="fontSize">Payment Method</span> :COD{" "}
                  </h6>
                  <h6>
                    <span className="fontSize">AWB Number</span> :
                    {data?.delivery[0]?.AwbNo}{" "}
                  </h6>
                  <h6>
                    <span className="fontSize">Reference No</span> :
                    {data?.delivery
                      ? data?.delivery[0]?.courier_reference_no
                      : "0"}{" "}
                  </h6>
                  <h6>
                    <span className="fontSize">Mode</span> :
                    {data?.delivery ? data?.delivery[0]?.mode : "0"}{" "}
                  </h6>
                  <h6>
                    <span className="fontSize">Courier Company Name</span> :
                    {data?.delivery ? data?.delivery[0]?.courierName : "0"}{" "}
                  </h6>
                </div>
                {/* <div className="barSpace"><img src={barCode} /></div> */}
                <div
                  style={{
                    background: "white",
                    padding: "16px",
                    width: "200px",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    value={data?.getaOrderById?.order_referenceNo}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>

              <div
                className="order-detail-bill "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h4>Billing Address </h4>
                  <div>
                    <span className="fontSize">
                      Address Line 1 :{" "}
                      {data?.getaOrderById?.billingAddress?.baddressLine1}
                    </span>
                  </div>
                  <div>
                    <span className="fontSize">
                      Address Line 2 :{" "}
                      {data?.getaOrderById?.billingAddress?.baddressLine2}
                    </span>
                  </div>
                  <div>
                    Phone : {data?.getaOrderById?.billingAddress?.bphone}
                  </div>
                  <div>
                    Email : {data?.getaOrderById?.billingAddress?.bemail}
                  </div>
                  <div>City : {data?.getaOrderById?.billingAddress?.bcity}</div>
                  <div>
                    State : {data?.getaOrderById?.billingAddress?.bstate}
                  </div>
                  <div>
                    Country : {data?.getaOrderById?.billingAddress?.bcountry}
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <h4>Seller Address </h4>
                  <div>
                    <span>
                      Seller Name :{" "}
                      <strong>
                        {data?.getaOrderById?.Seller[0]?.firstname}{" "}
                        {data?.getaOrderById?.Seller[0]?.lastname}
                      </strong>
                    </span>
                  </div>
                  <div>Phone : {data?.getaOrderById?.Seller[0]?.mobile}</div>
                  <div>Email : {data?.getaOrderById?.Seller[0]?.email}</div>
                  <div>Company : {data?.getaOrderById?.Seller[0]?.Company}</div>
                  <div>
                    <span className="fontSize">
                      Address Line 1 :{" "}
                      {data?.getaOrderById?.Seller[0]?.addressLine1}
                    </span>
                  </div>
                  <div>
                    <span className="fontSize">
                      Address Line 2 :{" "}
                      {data?.getaOrderById?.Seller[0]?.addressLine2}
                    </span>
                  </div>
                  <div>City : {data?.getaOrderById?.Seller[0]?.city}</div>
                  <div>State : {data?.getaOrderById?.Seller[0]?.state}</div>
                  <div>Country : {data?.getaOrderById?.Seller[0]?.country}</div>
                </div>

                {data?.getaOrderById.pickupAddress ? (
                  <div style={{ marginBottom: "10px" }}>
                    <h4>Pickup Points Address</h4>
                    <div>
                      Pickup Point Name :{" "}
                      <strong>
                        {data?.getaOrderById?.pickupAddress?.pickupPoint_name}
                      </strong>
                    </div>
                    <div>
                      Address : {data?.getaOrderById?.pickupAddress?.address}
                    </div>
                    <div>
                      <span className="fontSize">Province</span>{" "}
                      {data?.getaOrderById?.pickupAddress?.province}
                    </div>
                    <div>
                      <span className="fontSize">Phone</span>{" "}
                      {data?.getaOrderById?.pickupAddress?.phone}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: "10px" }}>
                    <h4>Shipping Address </h4>
                    <div>
                      <span className="fontSize">
                        Address Line 1 :{" "}
                        {data?.getaOrderById?.shippingAddress_save?.addressLine1
                          ? data?.getaOrderById?.shippingAddress_save
                            ?.addressLine1
                          : data?.getaOrderById?.billingAddress?.baddressLine1}
                      </span>
                    </div>
                    <div>
                      <span className="fontSize">
                        Address Line 2 :{" "}
                        {data?.getaOrderById?.shippingAddress_save?.addressLine2
                          ? data?.getaOrderById?.shippingAddress_save
                            ?.addressLine2
                          : data?.getaOrderById?.billingAddress?.baddressLine2}
                      </span>
                    </div>
                    <div>
                      Name :{" "}
                      {data?.getaOrderById?.shippingAddress_save?.firstname &&
                        data?.getaOrderById?.shippingAddress_save?.firstname +
                        " " +
                        data?.getaOrderById?.shippingAddress_save
                          ?.lastname}{" "}
                    </div>
                    <div>
                      Email :
                      {data?.getaOrderById?.shippingAddress_save?.email
                        ? data?.getaOrderById?.shippingAddress_save?.email
                        : data?.getaOrderById?.shippingAddress_save?.bemail}
                    </div>
                    <div>
                      Phone :
                      {data?.getaOrderById?.shippingAddress_save?.phone
                        ? data?.getaOrderById?.shippingAddress_save?.phone
                        : data?.getaOrderById?.shippingAddress_save?.bphone}
                    </div>
                    <div>
                      City :{" "}
                      {data?.getaOrderById?.shippingAddress_save?.city
                        ? data?.getaOrderById?.shippingAddress_save?.city
                        : data?.getaOrderById?.billingAddress?.bcity}
                    </div>
                    <div>
                      State :{" "}
                      {data?.getaOrderById?.shippingAddress_save?.state
                        ? data?.getaOrderById?.shippingAddress_save?.state
                        : data?.getaOrderById?.billingAddress?.bstate}
                    </div>
                    <div>
                      Country :{" "}
                      {data?.getaOrderById?.shippingAddress_save
                        ? data?.getaOrderById?.shippingAddress_save?.country
                        : data?.getaOrderById?.billingAddress?.bcountry}
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
                <Table striped style={{ background: "white" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getOrderTrans.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{1 + i}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.orderStatusId.orderStatusName}</td>
                          <td>{item?.Note ? item.Note : "---"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <div>
                <h5>POD Details</h5>
                {data?.delivery?.length ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Receiver Name</th>
                        <th>Receiver Phone</th>
                        <th>Receiver Relation</th>
                        <th>Receiver Remark</th>
                        <th>Status</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.delivery.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{1 + i}</td>
                            <td>{item.createdAt}</td>
                            <td>{item?.rcName}</td>
                            <td>{item?.rcPhone}</td>
                            <td>{item?.rcRelation}</td>
                            <td>{item?.remarks}</td>
                            <td>{item?.status}</td>
                            <td>
                              <img
                                style={{ widows: "100px", height: "100px" }}
                                src={item?.photo ? item?.photo.url : ""}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h5>No POD Details..🔎</h5>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TrackOrder;
