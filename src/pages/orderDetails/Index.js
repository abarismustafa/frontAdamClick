import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./orderDetail.css";
import axios from "axios";
import { Button } from "react-bootstrap";


import React from "react";
import QRCode from "react-qr-code";
import { GiReturnArrow } from "react-icons/gi";
import ReturnsModal from "./ReturnsModal";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import InvoiceDetails from "./invoiceDetails/InvoiceDetails";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const token1 = window.localStorage.getItem("token");

function OrderDetail() {
  const isLogin = window.localStorage.getItem("isLogin");
  const idUser = window.localStorage.getItem("user_id");
  const params = useParams();
  const navigate = useNavigate();

  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : "ZK";

  const invoce = window.localStorage.getItem("Invoice");

  const [data, setData] = useState(null);
  const baseUrl = base_url();
  const fechData = async () => {
    const res = await axios.get(`${baseUrl}order/getOrderById/${params.id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token1}`,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    } else {
      fechData();
    }
  }, []);

  const GeneratePdf = () => {
    // console.log(data);
    var doc = new jsPDF("landscaps", "px", "a4", "false");
    doc.text(
      70,
      100,
      `Delivery Status : ${data?.getaOrderById?.orderStatusTrans[
        data?.getaOrderById?.orderStatusTrans.length - 1
      ].orderStatusId?.orderStatusName
      }`
    );
    doc.text(70, 120, `Order Date : ${data?.createdAt}`);
    doc.text(
      70,
      140,
      `Customer Name : ${data?.getaOrderById?.user?.firstname +
      " " +
      data?.getaOrderById?.user?.lastname
      }`
    );
    doc.text(70, 160, `Order Amount  : ${data?.getaOrderById?.grandTotal}`);
    doc.text(70, 180, `Order Amount  : ${data?.order_referenceNo}`);
    doc.text(
      70,
      200,
      `Payment Status  : ${data?.getaOrderById?.Payment_Status?.paymentStatusName}`
    );

    doc.text(70, 220, `# Billing Address #`);
    doc.text(70, 240, `Address Line 1  :${data[0]?.billing?.baddressLine1}`);
    doc.text(70, 260, `Address Line 1  : ${data[0]?.billing?.baddressLine2}`);
    doc.text(70, 280, `City  : ${data[0]?.billing?.bcity}`);
    doc.text(70, 300, `State  : ${data[0]?.billing?.bstate}`);
    doc.text(70, 320, `Country  : ${data[0]?.billing?.bcountry}`);

    // doc.text(70, 340, `# Shipping Address #`)
    // doc.text(70, 360, `Address Line 1  : ${data?.getaOrderById?.shippingAddress_save?.addressLine1}`)
    // doc.text(70, 380, `Address Line 1  : ${data?.getaOrderById?.shippingAddress_save?.addressLine2}`)
    // doc.text(70, 400, `City  : ${data?.getaOrderById?.shippingAddress_save?.city}`)
    // doc.text(70, 420, `State  : ${data?.getaOrderById?.shippingAddress_save?.state}`)
    // doc.text(70, 440, `Country  : ${data?.getaOrderById?.shippingAddress_save?.country}`)

    // if (data?.getaOrderById.pickupAddress) {
    //     doc.text(70, 340, `# pickUp Address #`)
    //     doc.text(70, 360, `Pickup Point Name  : ${data?.getaOrderById?.pickupAddress?.pickupPoint_name}`)
    //     doc.text(70, 380, `Address : ${data?.getaOrderById?.pickupAddress?.address}`)
    //     doc.text(70, 400, `Province  : ${data?.getaOrderById?.pickupAddress?.province}`)
    //     doc.text(70, 420, `Phone  : ${data?.getaOrderById?.pickupAddress?.phone}`)
    // } else {
    //     doc.text(70, 340, `# Shipping Address #`)
    //     doc.text(70, 360, `Address Line 1  : ${data?.getaOrderById?.shippingAddress_save?.addressLine1}`)
    //     doc.text(70, 380, `Address Line 1  : ${data?.getaOrderById?.shippingAddress_save?.addressLine2}`)
    //     doc.text(70, 400, `City  : ${data?.getaOrderById?.shippingAddress_save?.city}`)
    //     doc.text(70, 420, `State  : ${data?.getaOrderById?.shippingAddress_save?.state}`)
    //     doc.text(70, 440, `Country  : ${data?.getaOrderById?.shippingAddress_save?.country}`)
    // }

    doc.save("OrderDetail.pdf");

    doc.setFont("courier");
    doc.setFontType("normal");

    doc.save("OrderDetai.pdf");

    doc.html(
      document.querySelector("#pdfGen", {
        callback: function (pdf) {
          pdf.save("OrderDetai.pdf");
          console.log(pdf);
        },
      })
    );
  };
  const [modalShow, setModalShow] = useState(false);
  const [item, setItem] = useState();
  const [index, setIndex] = useState();
  const [valDatas, setvalData] = useState();

  const sendDataModal = (item, i, valData) => {
    setModalShow(true);
    setItem(item);
    setIndex(i);
    setvalData(valData);
  };

  const { t } = useTranslation();
  const description = "This is a description.";

  // console.log(data[0]?.billing);
  const printRef = useRef();

  const handleDownload = async () => {
    if (!printRef.current) {
      console.error("Invoice nahi mila!");
      return;
    }

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true, // image loading fix
        allowTaint: true,
        backgroundColor: "#fff", // white background ensure karo
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Tax_Invoice.pdf");
    } catch (err) {
      console.error("PDF banane me error:", err);
    }
  };

  return (
    <div>
      <div className="container ">
        {data ? (
          <div className="row orderdetails" id="pdfGen">
            <div className="bar-code">
              <div>
                <h5>
                  {t("Customer Name")} : {data[0].user_firstname}{" "}
                  {data[0].user_lastname}
                </h5>
                <h6>
                  <span className="fontSize">{t("Order Date")} </span> :
                  {data[0]?.language[0]?.createdAt}
                </h6>
                <h6>
                  <span className="fontSize">{t("Order No")} </span> :{" "}
                  <span style={{ color: "#fb641b" }}>
                    {data[0]?.order_referenceNo}
                  </span>
                </h6>
                <h6>
                  <span className="fontSize">{t("Invoice Date")} </span> :{" "}
                  <span style={{ color: "#fb641b" }}>
                    {data[0]?.invoiceDate}
                  </span>
                </h6>
                <h6>
                  <span className="fontSize">{t("Invoice No")} </span> :{" "}
                  <span style={{ color: "#fb641b" }}>{data[0]?.invoiceNo}</span>
                </h6>
                <h6>
                  <span className="fontSize">{t("Order Amount")} </span> :{" "}
                  {data[0]?.currency[0].symbol}{" "}
                  <strong>{data[0]?.grandTotal}</strong>
                </h6>
                <h6>
                  <span className="fontSize">{t("Paid")} </span> :
                  {data[0]?.currency[0].symbol} {data[0]?.paid}
                </h6>
                <h6>
                  <span className="fontSize">{t("Balance")} </span> :
                  {data[0]?.currency[0].symbol} {data[0]?.balance}
                </h6>
              </div>
              <div>
                {/* <h6><span className="fontSize">Delivery Status</span> :<span style={{ color: "#fb641b" }}><strong>{data[0]?.deliveryType}</strong></span> </h6> */}
                <h6>
                  <span className="fontSize">{t("Delivery Type")} </span> :{" "}
                  {data[0]?.deliveryType}
                </h6>
                <h6>
                  <span className="fontSize">{t("Delivery Status")} </span> :{" "}
                  {data[0]?.status[0].orderStatusName}
                </h6>
                <h6>
                  <span className="fontSize">{t("Payment Status")} </span> :{" "}
                  {data[0]?.paymentStatus[0]?.paymentStatusName}
                </h6>
                {/* <h6><span className="fontSize">{t('Shift')} </span> : {data[0]?.timeGroup[0]?.displayName}</h6> */}
                <h6>
                  <span className="fontSize">
                    {t("Delivery Expected Date")}{" "}
                  </span>{" "}
                  : {data[0]?.date}
                </h6>
                {/* <h6><span className="fontSize">{t('Time Slot')} </span> : {data[0]?.timeSlot[0]?.name}</h6> */}
                {/* <h6><span className="fontSize">Payment Method</span> :COD </h6> */}
                {/* <h6><span className="fontSize">AWB Number</span> :{data?.deliverys && data?.deliverys[0]?.AwbNo} </h6> */}
                {/* <h6><span className="fontSize">Reference No</span> :{data?.deliverys ? data?.deliverys[0]?.courier_reference_no : ''} </h6> */}
                {/* <h6><span className="fontSize">Mode</span> :{data?.deliverys ? data?.deliverys[0]?.mode : ''} </h6> */}
                {/* <h6><span className="fontSize">Courier Company Name</span> :{data?.deliverys ? data?.deliverys[0]?.courierName : ''} </h6> */}
              </div>
              {/* <div className="barSpace"><img src={inputRef} /></div> */}
              <div
                style={{ background: "white", padding: "16px", width: "160px" }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={data[0]?.order_referenceNo}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>

            <div
              className="order-detail-bill "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ marginBottom: "10px" }}>
                <h4>{t("Billing Address")} </h4>
                <div>
                  <span className="fontSize">
                    {t("Address Line 1")} : {data[0]?.billing?.addressLine1}
                  </span>
                </div>
                <div>
                  <span className="fontSize">
                    {t("Address Line 2")} : {data[0]?.billing?.addressLine2}
                  </span>
                </div>
                <div>Phone : {data[0]?.billing?.phone}</div>
                <div>Email : {data[0]?.billing?.email}</div>
                <div>
                  {t("City")} : {data[0]?.billing?.city}
                </div>
                <div>
                  {t("State")} : {data[0]?.billing?.state}
                </div>
                <div>
                  {t("Country")} : {data[0]?.billing?.country}
                </div>
                <div>
                  {t("Zip")} : {data[0]?.billing?.zip}
                </div>
              </div>

              {/* <div style={{ marginBottom: "10px" }}>
                        <h4>Seller Address  </h4>
                        <div><span>Seller Name : <strong>{data[0]?.seller?.firstname} {data[0]?.seller?.lastname}</strong></span></div>
                        <div>Phone : {data[0]?.seller?.mobile}</div>
                        <div>Email : {data[0]?.seller?.email}</div>
                        <div>Company : {data[0]?.seller?.Company}</div>
                        <div><span className="fontSize">Address Line 1 : {data[0]?.seller?.addressLine1}</span></div>
                        <div><span className="fontSize">Address Line 2 : {data[0]?.seller?.addressLine2}</span></div>

                        <div>City : {data[0]?.seller?.city}</div>
                        <div>State : {data[0]?.seller?.state}</div>
                        <div>Country : {data[0]?.seller?.country}</div>

                    </div> */}
              <div style={{ marginBottom: "10px" }}>
                <h4>{t("Delivery Address")}</h4>
                <div>
                  <span className="fontSize">
                    {t("Address Line 1")} :{" "}
                    {data[0]?.shipping?.addressLine1
                      ? data[0]?.shipping?.addressLine1
                      : data[0]?.shipping?.baddressLine1}
                  </span>
                </div>
                <div>
                  <span className="fontSize">
                    {t("Address Line 2")} :{" "}
                    {data[0]?.shipping?.addressLine2
                      ? data[0]?.shipping?.addressLine2
                      : data[0]?.shipping?.baddressLine2}
                  </span>
                </div>
                <div>
                  Phone :
                  {data[0]?.shipping?.phone
                    ? data[0]?.shipping?.phone
                    : data[0]?.shipping?.bphone}
                </div>
                <div>
                  Email :
                  {data[0]?.shipping?.email
                    ? data[0]?.shipping?.email
                    : data[0]?.shipping?.bemail}
                </div>
                <div>
                  {t("City")} :{" "}
                  {data[0]?.shipping?.city
                    ? data[0]?.shipping?.city
                    : data[0]?.shipping?.bcity}
                </div>
                <div>
                  {t("State")} :{" "}
                  {data[0]?.shipping?.state
                    ? data[0]?.shipping?.state
                    : data[0]?.shipping?.bstate}
                </div>
                <div>
                  {t("Country")} :{" "}
                  {data[0]?.shipping?.country
                    ? data[0]?.shipping?.country
                    : data[0]?.shipping?.bcountry}
                </div>
                <div>
                  {t("Zip")} :{" "}
                  {data[0]?.shipping?.zip
                    ? data[0]?.shipping?.zip
                    : data[0]?.shipping?.bzip}
                </div>

                {/* <h4>{t('Shipping Address')}</h4> */}
                {/* <div><span>Seller Name : <strong>{data[0]?.shipping?.firstname} {data[0]?.shipping?.lastname}</strong></span></div>
                        <div>Phone : {data[0]?.shipping?.mobile}</div>
                        <div>Email : {data[0]?.shipping?.email}</div> */}

                {/* <div>{t('Company')} : {data[0]?.shipping?.bcompany}</div>
                        <div><span className="fontSize">{t('Address Line 1')} : {data[0]?.shipping?.baddressLine1}</span></div>
                        <div><span className="fontSize">{t('Address Line 2')} : {data[0]?.shipping?.baddressLine2}</span></div>
                        <div>{t('City')} : {data[0]?.shipping?.bcity}</div>
                        <div>{t('State')} : {data[0]?.shipping?.bstate}</div>
                        <div>{t('Country')} : {data[0]?.shipping?.bcountry}</div>
                        <div>{t('Date')} : {data[0]?.shipping?.date}</div> */}
              </div>

              {/* {data?.getaOrderById.pickupAddress ? <div style={{ marginBottom: "10px" }}>
                        <h4>Pickup Points Address</h4>
                        <div>Pickup Point Name : <strong>{data?.getaOrderById?.pickupAddress?.pickupPoint_name}</strong></div>
                        <div>Address : {data?.getaOrderById?.pickupAddress?.address}</div>
                        <div><span className="fontSize">Province</span>  {data?.getaOrderById?.pickupAddress?.province}</div>
                        <div><span className="fontSize">Phone</span>  {data?.getaOrderById?.pickupAddress?.phone}</div>
                    </div> : <div style={{ marginBottom: "10px" }}>
                        <h4>Shipping Address  </h4>
                        <div><span className="fontSize">Address Line 1 : {data?.getaOrderById?.shippingAddress_save ? data?.getaOrderById?.shippingAddress_save?.addressLine1 : data?.getaOrderById?.billingAddress?.baddressLine1}</span></div>
                        <div><span className="fontSize">Address Line 2 : {data?.getaOrderById?.shippingAddress_save ? data?.getaOrderById?.shippingAddress_save?.addressLine2 : data?.getaOrderById?.billingAddress?.baddressLine2}</span></div>
                        <div>Phone :{data?.getaOrderById?.shippingAddress_save?.phone}</div>
                        <div>email :{data?.getaOrderById?.shippingAddress_save?.email}</div>
                        <div>City : {data?.getaOrderById?.shippingAddress_save ? data?.getaOrderById?.shippingAddress_save?.city : data?.getaOrderById?.billingAddress?.bcity}</div>
                        <div>State : {data?.getaOrderById?.shippingAddress_save ? data?.getaOrderById?.shippingAddress_save?.state : data?.getaOrderById?.billingAddress?.bstate}</div>
                        <div>Country : {data?.getaOrderById?.shippingAddress_save ? data?.getaOrderById?.shippingAddress_save?.country : data?.getaOrderById?.billingAddress?.bcountry}</div>
                        <div>Name : {data?.getaOrderById?.shippingAddress_save?.firstname && data?.getaOrderById?.shippingAddress_save?.firstname + " " + data?.getaOrderById?.shippingAddress_save?.lastname}</div>

                    </div>} */}
            </div>

            {/* <div style={{margin:"20px 0"}}>
                    <Steps
                        current={1}
                        items={[
                            {
                                title: 'Finished',
                                description,
                            },
                            {
                                title: 'In Progress',
                                description,
                                subTitle: 'Left 00:00:08',
                            },
                            {
                                title: 'Waiting',
                                description,
                            },
                        ]}
                    />

                </div> */}

            <div className="classOverflow">
              {/* <Button variant="info" onClick={GeneratePdf}>{t('Downlode PDF')}</Button> */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("Product Name")}</th>
                    <th scope="col">{t("Variant")}</th>
                    <th scope="col">{t("Quantity")}</th>
                    <th scope="col">{t("Sale Rate")}</th>
                    <th scope="col">{t("Sub Total")}</th>
                    {/* <th scope="col">{t('Tax%')}</th>
                                <th scope="col">{t('Tax')}</th> */}
                    <th scope="col">{t("IGST")}</th>
                    <th scope="col">{t("SGST")}</th>
                    <th scope="col">{t("CGST")}</th>
                    <th scope="col">{t("Total")}</th>
                    <th scope="col">{t("Delivery Type")}</th>
                    <th scope="col">{t("Refund")}</th>
                  </tr>
                </thead>
                <tbody>
                  {!invoce &&
                    data[0]?.products.map((item, i) => {
                      console.log(item?.igst);

                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{item?.productId?.name}</td>
                          <td>{item?.productId?.variations?.weight}</td>
                          <td>{item.qty}</td>
                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.price?.sale_rate}
                          </td>
                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.subTotal}
                          </td>
                          {/* <td>{item?.tax}</td>
                                        <td>{item?.tax}</td> */}

                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.igst ? item?.igst : "0"}
                          </td>
                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.sgst ? item?.sgst : '0'}
                          </td>
                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.cgst ? item?.cgst : "0"}
                          </td>

                          <td>
                            {data?.getaOrderById?.currency?.symbol}{" "}
                            {item?.total}
                          </td>

                          <td>{data[0]?.deliveryType}</td>
                          <td>
                            <GiReturnArrow
                              onClick={() =>
                                sendDataModal(item, i, data[0].products[i])
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <div className="col-lg-3">
                <div className="cartTotals">
                  <h5 className="cartTitle">{t("Price Details")}</h5>

                  <div className="subTotal">
                    <h6>{t("Base Price")}</h6>
                    <p> {data[0]?.basePrice}</p>
                  </div>

                  <div className="subTotal">
                    <h6>{t("Coupon")}</h6>
                    <p>
                      {" "}
                      <span style={{ color: "rebeccapurple" }}>
                        {data[0]?.coupon[0]?.code}
                      </span>{" "}
                      ( {data[0]?.coupon[0]?.discount}{" "}
                      {data[0]?.coupon[0]?.discount_type === "Percent"
                        ? "Percent"
                        : "Amount"}{" "}
                      )
                    </p>
                  </div>
                  <div className="subTotal">
                    <h6>{t("Discount Amount")} </h6>
                    <p> {data[0]?.discount}</p>
                  </div>

                  {/* <div className="subTotal">
                                <h6>{t('Tax Amount')}</h6>
                                <p> {data[0]?.tax}</p>
                            </div> */}
                  <div className="subTotal">
                    <h6>{t("Shipping")}</h6>
                    <p> {data?.getaOrderById?.shippingCost}</p>
                  </div>
                  <div
                    style={{ margin: "4px 0", borderTop: "1px solid black" }}
                  ></div>
                  <div className="subTotal">
                    <h6>{t("Grand Total")}</h6>
                    <p>
                      {data[0]?.currency[0].symbol} {data[0]?.grandTotal}
                    </p>
                  </div>

                </div>
                <button className="btn btn-success w-100 mt-2" onClick={handleDownload}>Download Invoice</button>
              </div>

            </div>

            {/* <h6 style={{ textAlign: "right" }}>Base Price : {data?.getaOrderById?.basePrice}</h6>
                {data?.getaOrderById?.coupon_id?.code && <div className="mb-2" style={{ textAlign: "end" }}>
                    <div className="pr-2">COUPON CODE : <strong> {data?.getaOrderById?.coupon_id?.code} ( {data?.getaOrderById?.coupon_id?.discount} ({data?.getaOrderById?.coupon_id?.discount_type === 'Percent' ? 'Percent' : 'Amount'}) )</strong></div>
                </div>}
                <h6 style={{ textAlign: "right" }}>Discount Amount : {data?.getaOrderById?.discount}</h6>
                {data?.getaOrderById?.shippingCost > 0 && <h5 style={{ textAlign: "right" }}>Shipping Cost : {data?.getaOrderById?.shippingCost}</h5>}

                <h5 style={{ textAlign: "right" }}>Grand Total :{data?.getaOrderById?.currency?.symbol} {data?.getaOrderById?.grandTotal}</h5> */}
          </div>
        ) : (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {modalShow && (
          <ReturnsModal
            show={modalShow}
            item={item}
            data={data}
            param={params.id}
            valData={valDatas}
            index={index}
            onHide={() => setModalShow(false)}
          />
        )}

        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
          }}
        >
          <InvoiceDetails data={data} printRef={printRef} />
        </div>

        {/* <div className="d-none">
          <InvoiceDetails data={data} printRef={printRef} />
        </div> */}
      </div>
    </div>
  );
}
export default OrderDetail;
