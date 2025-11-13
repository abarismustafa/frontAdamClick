import React, { useState } from "react";



import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

import { AiOutlineLock } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { BsFillCartFill } from "react-icons/bs";
import { CgShutterstock } from "react-icons/cg";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../../../../server";

function FeaturedProduct() {
  const [value, setValue] = useState(0);
  const params = useParams();
  const [data, setData] = useState();
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}seller_Product/${params.id}`);
      setData(res.data.getallProduct);
    } catch (error) {
      alert(" Server Error Seller Product Load Faild...");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInc = () => {
    setValue(value + 1);
    if (value >= 10) {
      return setValue(0);
    }
  };
  const handleDec = () => {
    setValue(value - 1);
    if (value <= 0) {
      return setValue(0);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <div
              key={item._id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/product/${item._id}`);
              }}
              className=" col-lg-3 col-md-6 col-sm-12"
            >
              <div className="featuredInfo">
                <div className="featuredFigure">
                  <div className="featuredImg">
                    <img
                      src={
                        item?.mainimage_url
                          ? item?.mainimage_url.url
                          : ""
                      }
                      alt="Product"
                    />
                    <div className="quickView">
                      <ul>
                        <li className="viewProduct">
                          <Link
                            to="products"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <FiSearch />
                          </Link>
                        </li>
                        <li className="addProduct">
                          <Link to="products">
                            <BsCart />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="featuredContent">
                  <div className="rateDigit">
                    <span className="currentPrice">
                      ₹ {item?.variations[0]?.mrp}
                    </span>
                  </div>
                  <h5>
                    {" "}
                    <Link to={`/product/${item._id}`}>{item?.name}</Link>{" "}
                  </h5>

                  {/* <Rating /> */}
                  <div className="reward">
                    <p className="text">Reward Points</p>
                    <span className="number">13</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog maxWidthDialog">
          <div className="modal-content maxWidthContent">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Quick Shop
              </h1>
              <button
                type="button"
                className="changeModalCancel"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <RxCross1 />
              </button>
            </div>
            <div className="modal-body">
              <div>
                <section className="services">
                  <div className="container-fluid p-3">
                    <div className="modalViewSec">
                      <div className="modalFigure">
                        <div className="thumbnailSec">
                          <ul>
                            <li>
                              <img src="" alt="Product" />
                            </li>
                            <li>
                              <img src="" alt="Product" />
                            </li>
                            <li>
                              <img src="" alt="Product" />
                            </li>
                          </ul>
                        </div>
                        <div className="thumbView">
                          <img src={""} alt="Fertilizer" />
                        </div>
                      </div>
                      <div className="modalText">
                        <div className="_product-detail-content">
                          <p className="_p-name">
                            movento 15.31%od insecticide
                          </p>
                          <div className="_p-price-box">
                            <div className="p-list">
                              <span>
                                Price : ZK <del> 1399</del>{" "}
                              </span>
                              <span className="price"> Rs. 699 </span>
                            </div>
                            <div className="skuSec">
                              <label htmlFor="sku">SKU: 50 gms</label>
                            </div>
                            <div className="interestPayment">
                              <Link to="/">
                                Or 3 interest-free payments of ZK 82 with{" "}
                              </Link>
                            </div>
                            <div className="saveImg">
                              <h6>Currently Unavailable.</h6>
                              <img src="" alt="save" />
                            </div>
                            <div className="productSize">
                              <h6>Size</h6>
                              <ul>
                                <li>
                                  <Link to="/">
                                    <label htmlFor="weight">50gms</label>
                                    <span className="price">
                                      ZK 245{" "}
                                      <span className="offer">(30% OFF)</span>
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/">
                                    <label htmlFor="weight">
                                      PACK OF 5 ( QTY 5 * 50 GM )
                                    </label>
                                    <span className="price">
                                      ZK 245
                                      <span className="offer">(30% OFF)</span>
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/">
                                    <label htmlFor="weight">
                                      PACK OF 10 ( QTY 10 * 50 GM )
                                    </label>
                                    <span className="price">
                                      ZK 2,430
                                      <span className="offer">(28% OFF)</span>
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/">
                                    <label htmlFor="weight">
                                      PACK OF 2 ( QTY 2 * 50 GM )
                                    </label>
                                    <span className="price">
                                      ZK 486
                                      <span className="offer">(28% OFF)</span>
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="countryList">
                              <ul>
                                <li>
                                  <TbWorld /> Country of origin: India
                                </li>
                                <li>
                                  <AiOutlineLock /> Secure payments
                                </li>
                                <li>
                                  {" "}
                                  <CgShutterstock /> In stock, ready to ship
                                </li>
                              </ul>
                              <p className="taxInclude">
                                Tax included. Shipping calculated at checkout.
                              </p>
                            </div>

                            <div className="_p-add-cart">
                              <div className="addQuantity _p-qty">
                                <span>Add Quantity</span>
                                <div className="IncItem">
                                  <button
                                    className="value-button decrease_"
                                    type="button"
                                    onClick={handleDec}
                                  >
                                    <i className="ri-subtract-line"></i>
                                  </button>
                                  <span className="quantityValue">{value}</span>
                                  <button
                                    className="value-button increase_"
                                    type="button"
                                    onClick={handleInc}
                                  >
                                    <i className="ri-add-fill"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="_p-features">
                              <strong> Description:</strong>
                              <p>
                                Solid color polyester/linen full blackout thick
                                sunscreen floor curtain Type: General Pleat
                                Applicable Window Type: Flat Window Format
                              </p>
                            </div>

                            <div className="quickContentFooter">
                              <p>
                                FOR BULK ORDER INQUIRIES:{" "}
                                <Link to="/">CLICK HERE</Link>
                              </p>
                            </div>
                            <form method="post" acceptCharset="utf-8">
                              <ul className="spe_ul" />
                              <div className="_p-qty-and-cart">
                                <div className="product-add-to-cart addToCart productCartBtn">
                                  <Link
                                    className="default-btn buy"
                                    tabIndex={0}
                                    to="/product-detail"
                                  >
                                    <FiShoppingCart /> Buy Now
                                  </Link>
                                  <Link
                                    className="default-btn cart"
                                    tabIndex={0}
                                    to="/cart"
                                  >
                                    <BsFillCartFill /> Add to Cart
                                  </Link>
                                  <input
                                    type="hidden"
                                    name="pid"
                                    defaultValue={18}
                                  />
                                  <input
                                    type="hidden"
                                    name="price"
                                    defaultValue={850}
                                  />
                                  <input
                                    type="hidden"
                                    name="url"
                                    defaultValue
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProduct;
