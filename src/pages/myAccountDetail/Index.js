import { useEffect, useRef, useState, useTransition } from "react";
import { Button, Table } from "react-bootstrap";
import { GrView } from "react-icons/gr";
import { FcCancel } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbShoppingCartPlus } from "react-icons/tb";
import ModalCancel from "./ModalCancel";
import {
  setCartLeng,
  useGetAllStatusOrdersQuery,
  useGetPickUpPointsQuery,
  useSetCartMutation,
} from "../../components/products/productSlice";


import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import { useDispatch } from "react-redux";
import { MdCancel, MdSupportAgent, MdAssignmentReturn, MdReplay, MdRateReview, MdBlock } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaMapMarkedAlt } from "react-icons/fa";
import InvoiceDetails from "../orderDetails/invoiceDetails/InvoiceDetails";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./MyAccountDetail.css";
function MyAccountDetail() {
  const isLogin = window.localStorage.getItem("isLogin");
  const idUser = window.localStorage.getItem("user_id");

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin === "false") {
      navigate("/login");
      return;
    }
  }, []);
  const baseUrl = base_url();
  const [data, setData] = useState(null);
  const token1 = window.localStorage.getItem("token");
  const fechData = async () => {
    const res = await axios.get(`${baseUrl}order/getorderbyuser`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token1}`,
      },
    });
    setData(res.data);
  };
  useEffect(() => {
    fechData();
  }, []);


  window.localStorage.setItem("Invoice", "");

  const [modalShow, setModalShow] = useState(false);
  const [val, setVal] = useState(null);
  const sendValues = (val) => {
    setModalShow(true);
    setVal(val);
  };

  const sendCancel = () => {
    navigate("/cancellOrders");
  };

  const { data: pickup, isLoading } = useGetAllStatusOrdersQuery();

  const getIdstatus = async (e) => {
    if (e.target.value === "1") {
      fechData();
    } else {
      const res = await axios.get(
        `${baseUrl}orderStatusTransaction/filter/user/${e.target.value}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setData(res.data);
    }
  };
  const { t, i18n } = useTranslation();


  // const reOorder = () => {
  //   navigate("/checkout");
  // };

  const [
    addToCart,
    {
      data: datacart,
      isLoading: isAddCartLoading,
      isSuccess: isAddToCartSuccess,
      isError: isAddToCartError,
    },
  ] = useSetCartMutation();


  const isProductAdded = window.localStorage.getItem("currentProductId");
  const [productAdded, setProductAdded] = useState(false);


  const reOorder = async (order) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      const products = order?.productDetails || [];
      if (!products.length) {
        alert("No products found in this order!");
        return;
      }

      for (const prod of products) {

        const variations = prod?.matchedVariation || [];

        if (!variations.length) continue;

        for (const variant of variations) {
          console.log('variant', variant);

          const payload = {
            qty: 1,
            pickupPoint: window.localStorage.getItem("pickUpPoint") || "",
            variantId: variant?.uid,
            productId: prod?.uid,
            deliveryType: order?.deliveryType || "Home Delivery",
            seller_id: variant?.priceDetails?.seller_id,
            sku: variant?.priceDetails?.sku,
          };

          console.log("🛒 Adding to cart:", payload);
          await addToCart(payload);
        }
      }

      navigate("/checkout");
    } catch (err) {
      console.error("Reorder failed:", err);
      alert("Failed to reorder items. Please try again.");
    }
  };


  // const reOorder = async (order) => {
  //   console.log(order);
  //   // debugger

  //   const product_count = window.localStorage.getItem("productCount");
  //   const pickupPoint = window.localStorage.getItem("pickUpPoint");
  //   const selllerId = window.localStorage.getItem("sellerId");
  //   const deliveryType = window.localStorage.getItem("deliveryType");
  //   // const product_id = params._id;
  //   const product_variant = window.localStorage.getItem("variationsId");
  //   try {
  //     const token = window.localStorage.getItem("token");
  //     const products = order?.productDetails || [];

  //     if (!products.length) {
  //       alert("No products found in this order!");
  //       return;
  //     }

  //     for (const prod of products) {
  //       console.log('prod', prod);
  //       console.log('products', products);


  //       const payload = {
  //         qty: product_count,
  //         pickupPoint: pickupPoint,
  //         variantId: product_variant,
  //         productId: prod?.uid,

  //         // deliveryType: order?.deliveryType || "Home Delivery",
  //         deliveryType,
  //         seller_id: selllerId,
  //         sku: window.localStorage.getItem("SKU"),
  //       };
  //       await addToCart(payload);

  //     }
  //     navigate("/checkout");

  //   } catch (err) {
  //     console.error("Reorder failed:", err);
  //   }
  // };
  const dispacher = useDispatch();
  useEffect(() => {
    if (isAddToCartSuccess) {
      dispacher(setCartLeng(datacart?.cartLength));
      window.localStorage.setItem("cartItem", datacart?.cart);
      // setShowToaster({
      //   show: true,
      //   message: "Product added successfully!",
      //   color: "success",
      // });
    }
    if (isAddToCartError) {
      // setShowToaster({
      //   show: true,
      //   message: "Something went wrong Product Not Add",
      //   color: "danger",
      // });
    }
    if (isProductAdded) {
      setProductAdded(true);
    } else {
      setProductAdded(false);
    }
  }, [isAddToCartSuccess, isAddToCartError, isProductAdded]);

  const [invoiceData, setInvoiceData] = useState(null)
  const idGet = async (item) => {
    console.log(item);

    try {
      const res = await axios.get(
        `${baseUrl}order/getOrderById/${item?._id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token1}`,
          },
        }
      );

      if (res?.status === 200) {
        setInvoiceData(res?.data)
        setTimeout(() => {
          handleDownload()
        }, 800)
      }

    } catch (error) {

    }
  }


  const printRef = useRef();

  const handleDownload = async (data) => {
    console.log(data);

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

  const returnOrder = (id) => {
    if (id) {
      navigate(`/returns/rma/new/${id}`)
    }
  }

  const returnSet = (item) => {
    // console.log(item);

    navigate(`/product/${item?.productDetails[0]?.uid}/${item?.productDetails[0]?.slug}/${item?.productDetails[0]?.matchedVariation[0]?.variant_slug}`)
  }

  return (
    <>





      <section className="sectionPD myAccountSection">
        <div className="container">
          <div className="fisherman-content">
            <h3>{t("Purchase History")}</h3>
          </div>
          <div className="d-xl-flex justify-content-between mb-3 flex-wrap gap-3">
            <h5 onClick={sendCancel}>{t("See Your Cancel Orders")}</h5>
            <div className="responsiveFilter">
              <select
                className="form-select"
                onChange={getIdstatus}
                aria-label="Default select example"
              >
                <option value="1">{t("All Status")}</option>
                {pickup &&
                  pickup
                    .filter((item) =>
                      ["Pending", "Processing", "Ready to ship", "Order In Transit", "Delivered"].includes(item?.orderStatusName)
                    )
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item?.orderStatusName}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <div className="table-responsive orderTableWrapper">
            <Table
              bordered
              hover
              className="table aiz-table mb-0"
            >
              <thead>
                <tr className="footable-header">
                  <th>{t("Serial No.")}</th>
                  {/* <th>{t("Order No")}</th> */}
                  <th>{t("Product Image / Product Title")}</th>
                  {/* <th>{t("Product Title")}</th> */}
                  <th>{t("Order Amount")}</th>
                  <th>{t("Order Status")}</th>
                  <th>{t("Payment Type")}</th>
                  <th >{t("Address Type")}</th>
                  <th>{t("More Action")}</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((item, i) => {
                    return (
                      <tr key={i} className="orderRow">
                        <td>{i + 1}</td>
                        {/* <td>{item?.referenceNo}</td> */}
                        <td className="orderProductInfo">
                          <div className="product-cell">
                            {item?.productDetails?.map((product, i) =>
                              product?.matchedVariation?.map((variation, j) => (
                                <div className="product-box" key={`${i}-${j}`}>
                                  <Link
                                    to={`/product/${product?.uid}/${product?.slug}`}
                                    className="productImage"
                                  >
                                    <img
                                      src={variation?.mainImage_url?.url || "/no-image.jpg"}
                                      alt={product?.slug}
                                    />
                                  </Link>

                                  <Link
                                    to={`/product/${product?.uid}/${product.slug}/${variation?.variant_slug}`}
                                  >
                                    {product?.name + (variation?.variant_slug ? " " + variation?.variant_slug : "")}
                                  </Link>
                                </div>
                              ))
                            )}
                          </div>

                          <div className="orderDates">
                            <p>
                              <strong>Order Date:</strong>{" "}
                              {new Date(item?.createdAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p>
                              <strong>Order No:</strong>{" "}
                              <Link to={`/order-detail/${item._id}`} className="blue">
                                {item?.referenceNo}
                              </Link>
                            </p>
                          </div>
                        </td>
                        {/* <td>
                          <span className="d-block">
                            {item?.productDetails?.map((item, i) => {
                              return (
                                <Link
                                  to={`/product/${item?.uid}/${item?.slug}`}
                                  className="blue"
                                >
                                  <span key={i}>{item?.name}</span>;

                                </Link>
                              );
                            })}
                          </span>
                          Order Date :  {new Date(item?.createdAt).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })} <br />
                          Order No : <Link
                            to={`/order-detail/${item._id}`}
                            className="blue"
                          >
                            {item?.referenceNo}
                          </Link>
                        </td> */}



                        <td
                        // className="text-end"
                        >
                          {item?.currency?.name
                            ? item?.currency?.name
                            : "INR"}{" "}
                          {item.grandTotal}
                        </td>
                        <td>
                          {item?.status[0]?.orderStatusName && (
                            <strong>{item?.status[0]?.orderStatusName}</strong>
                          )}
                        </td>
                        <td>{item?.payment_type}</td>
                        <td >{item?.deliveryType}</td>
                        {/* <td>---</td> */}
                        {/* <td>{item?.products[0]?.deliveryType} {item?.products[0]?.pickupPoints?.pickupPoint_name}</td> */}


                        <td className="orderActions">


                          {(() => {
                            const status = item?.status?.[0]?.orderStatusName;

                            // Common styling
                            const iconSize = 24;
                            const baseStyle = {
                              backgroundColor: "rgb(0 105 179)",
                              color: "#fff",
                              fontWeight: 500,
                              border: "none",
                            };
                            const disabledStyle = {
                              backgroundColor: "#d6d6d6",
                              color: "#6c757d",
                              cursor: "not-allowed",
                              opacity: 1,
                              border: "none",
                            };

                            const btnClass =
                              "w-100 mb-2 tableCommonBtn d-flex align-items-center gap-2 justify-content-center";

                            // ✅ Pending / Processing / Ready to Ship

                            if (["Pending", "Processing", "Ready to ship"].includes(status)) {
                              return (
                                <>

                                  {/* <Button
                                    className={btnClass}
                                    style={baseStyle}
                                    onClick={() => returnOrder(item?._id)}
                                  >
                                    <MdAssignmentReturn size={iconSize} />
                                    <span>Return Your Order</span>
                                  </Button> */}
                                  <Button
                                    className={btnClass}
                                    style={baseStyle}
                                    onClick={() => sendValues(item)}
                                  >
                                    <MdCancel size={iconSize} />
                                    <span>Cancel Order</span>
                                  </Button>

                                  <Button className={btnClass} style={baseStyle}>
                                    <MdSupportAgent size={iconSize} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button
                                    className={btnClass}
                                    style={disabledStyle}
                                    disabled
                                    onClick={() => idGet(item)}
                                  >
                                    <HiOutlineDocumentText size={iconSize} />
                                    <span>Print Invoice</span>
                                  </Button>
                                </>
                              );
                            }

                            // ✅ Order In Transit
                            if (["Order In Transit"].includes(status)) {
                              return (
                                <>
                                  <Button className={btnClass} style={baseStyle}>
                                    <FaMapMarkedAlt size={iconSize} />
                                    <span>Track Your Order</span>
                                  </Button>

                                  <Button className={btnClass} style={baseStyle}>
                                    <MdSupportAgent size={iconSize} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button className={btnClass} style={disabledStyle} disabled>
                                    <HiOutlineDocumentText size={iconSize} />
                                    <span>Print Invoice</span>
                                  </Button>
                                </>
                              );
                            }

                            // ✅ Delivered
                            if (["Delivered"].includes(status)) {
                              return (
                                <>
                                  <Button
                                    className={btnClass}
                                    style={baseStyle}
                                    onClick={() => returnOrder(item?._id)}
                                  >
                                    <MdAssignmentReturn size={iconSize} />
                                    <span>Return Your Order</span>
                                  </Button>

                                  <Button className={btnClass} style={baseStyle}>
                                    <MdSupportAgent size={iconSize} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button className={btnClass} style={baseStyle} onClick={() => idGet(item)}>
                                    <HiOutlineDocumentText size={iconSize} />
                                    <span>Print Invoice</span>
                                  </Button>

                                  <Button
                                    className={btnClass}
                                    style={baseStyle}
                                    onClick={() => reOorder(item)}
                                  >
                                    <MdReplay size={iconSize} />
                                    <span>Re-Order</span>
                                  </Button>

                                  <Button className={btnClass} style={baseStyle} onClick={() => returnSet(item)}>
                                    <MdRateReview size={iconSize} />
                                    <span>Product Review</span>
                                  </Button>
                                </>
                              );
                            }

                            // ✅ Default (no action)
                            return (
                              <Button className={btnClass} style={disabledStyle} disabled>
                                <MdBlock size={iconSize} />
                                <span>No Actions Available</span>
                              </Button>
                            );
                          })()}
                        </td>
                        {/* <td style={{ width: "210px" }}>
                          
                          {(() => {
                            const status = item?.status?.[0]?.orderStatusName;


                            if (["Pending", "Processing", "Ready to ship"].includes(status)) {
                              return (
                                <>
                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#dc3545", color: "#fff" }}
                                    onClick={() => sendValues(item)}
                                  >
                                    <MdCancel size={18} />
                                    <span>Cancel Order</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#007bff", color: "#fff" }}
                                  >
                                    <MdSupportAgent size={18} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#6c757d", color: "#fff", opacity: 0.6 }}
                                    disabled
                                    onClick={() => idGet(item)}
                                  >
                                    <HiOutlineDocumentText size={18} />
                                    <span>Print Invoice</span>
                                  </Button>
                                </>
                              );
                            }


                            if (["Order In Transit"].includes(status)) {
                              return (
                                <>
                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#fd7e14", color: "#fff" }}
                                  >
                                    <FaMapMarkedAlt size={18} />
                                    <span>Track Your Order</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#007bff", color: "#fff" }}
                                  >
                                    <MdSupportAgent size={18} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#6c757d", color: "#fff", opacity: 0.6 }}
                                    disabled
                                  >
                                    <HiOutlineDocumentText size={18} />
                                    <span>Print Invoice</span>
                                  </Button>
                                </>
                              );
                            }


                            if (["Delivered"].includes(status)) {
                              return (
                                <>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#6f42c1", color: "#fff" }}
                                    onClick={() => returnOrder(item?._id)}
                                  >
                                    <MdAssignmentReturn size={18} />
                                    <span>Return Your Order</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#007bff", color: "#fff" }}
                                  >
                                    <MdSupportAgent size={18} />
                                    <span>Contact Support</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#6c757d", color: "#fff" }}
                                  >
                                    <HiOutlineDocumentText size={18} />
                                    <span>Print Invoice</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 mb-2 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#28a745", color: "#fff" }}
                                    onClick={() => reOorder(item)}
                                  >
                                    <MdReplay size={18} />
                                    <span>Re-Order</span>
                                  </Button>

                                  <Button
                                    variant=""
                                    className="w-100 tableCommonBtn d-flex align-items-center  gap-2"
                                    style={{ backgroundColor: "#ffc107", color: "#000" }}
                                  >
                                    <MdRateReview size={18} />
                                    <span>Product Review</span>
                                  </Button>
                                </>
                              );
                            }


                            return (
                              <Button
                                variant=""
                                className="w-100 tableCommonBtn d-flex align-items-center  gap-2"
                                style={{ backgroundColor: "#6c757d", color: "#fff", opacity: 0.6 }}
                                disabled
                              >
                                <MdBlock size={18} />
                                <span>No Actions Available</span>
                              </Button>
                            );
                          })()}
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th>
                      <div className="preloaderCount">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {modalShow && (
            <ModalCancel
              show={modalShow}
              val={val}
              fechData={fechData}
              onHide={() => setModalShow(false)}
            />
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
          }}
        >
          <InvoiceDetails printRef={printRef} data={invoiceData} />
        </div>
      </section >
    </>
  );
}
export default MyAccountDetail;
