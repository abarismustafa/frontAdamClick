import React, { useState } from "react";
import fertilizer1 from "../../../../assets/img/products/1.jpg";
import fertilizer2 from "../../../../assets/img/products/2.jpg";
import fertilizer3 from "../../../../assets/img/products/3.jpg";
import fertilizer4 from "../../../../assets/img/products/4.jpg";
import fertilizer5 from "../../../../assets/img/products/5.jpg";
import Rating from "../../../../shared/rating/Rating";

import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";

function NewArrivalProduct() {
  const [value, setValue] = useState(0);

  const handleInc = () => {
    setValue(value + 1);
    if (value >= 10) {
      return setValue(0)
    }
  }
  const handleDec = () => {
    setValue(value - 1);
    if (value <= 0) {
      return setValue(0)
    }
  }
  return (
    <>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer4} alt="Product" />
              <div className="quickView">
                <ul>
                  <li className="viewProduct">
                    <Link
                      to="/product-detail"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <FiSearch />
                    </Link>
                  </li>
                  <li className="addProduct">
                    <Link to="/product-detail">
                      <BsCart />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="featuredContent">
            <div className="rateDigit">
              <span className="currentPrice">ZK49.00</span>
            </div>
            <h5>
              <Link to="/product-detail">vanproz v-bind (bio viricide)</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">10</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer1} alt="Product" />
              <div className="quickView">
                <ul>
                  <li className="viewProduct">
                    <Link
                      to="/product-detail"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <FiSearch />
                    </Link>
                  </li>
                  <li className="addProduct">
                    <Link to="/product-detail">
                      <BsCart />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="featuredContent">
            <div className="rateDigit">
              <span className="currentPrice">ZK50.00</span>
            </div>
            <h5>
              <Link to="/product-detail">movento 15.31%od insecticide</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">07</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer2} alt="Product" />
              <div className="quickView">
                <ul>
                  <li className="viewProduct">
                    <Link
                      to="/product-detail"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <FiSearch />
                    </Link>
                  </li>
                  <li className="addProduct">
                    <Link to="/product-detail">
                      <BsCart />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="featuredContent">
            <div className="rateDigit">
              <span className="currentPrice">ZK35.00</span>
            </div>
            <h5>
              <Link to="/product-detail">vanproz v-bind (bio viricide)</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">13</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer3} alt="Product" />
              <div className="quickView">
                <ul>
                  <li className="viewProduct">
                    <Link
                      to="/product-detail"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <FiSearch />
                    </Link>
                  </li>
                  <li className="addProduct">
                    <Link to="/product-detail">
                      <BsCart />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="featuredContent">
            <div className="rateDigit">
              <span className="currentPrice">ZK56.00</span>
            </div>
            <h5>
              <Link to="/product-detail">movento 15.31%od insecticide</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">21</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer5} alt="Product" />
              <div className="quickView">
                <ul>
                  <li className="viewProduct">
                    <Link
                      to="/product-detail"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <FiSearch />
                    </Link>
                  </li>
                  <li className="addProduct">
                    <Link to="/product-detail">
                      <BsCart />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="featuredContent">
            <div className="rateDigit">
              <span className="currentPrice">ZK49.00</span>
            </div>
            <h5>
              <Link to="/product-detail">vanproz v-bind (bio viricide)</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">05</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-lg-3 col-md-6 col-sm-12">
        <div className="featuredInfo">
          <div className="featuredFigure">
            <div className="featuredImg">
              <img src={fertilizer5} alt="Product" />
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
              <span className="currentPrice">ZK50.00</span>
            </div>
            <h5>
              <Link to="/product-detail">movento 15.31%od insecticide</Link>
            </h5>
            <Rating />
            <div className="reward">
              <p className="text">Reward Points</p>
              <span className="number">11</span>
            </div>
          </div>
        </div>
      </div>

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
                    <div className="row row-sm">
                      <div className="col-md-6 _boxzoom">
                        <img src={fertilizer1} alt="Fertilizer" />
                        <div className="_product-images">
                          <div className="picZoomer">
                            <img
                              className="my_img"
                              src={fertilizer1}
                              alt="Fertilizer"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="_product-detail-content">
                          <p className="_p-name">
                            {" "}
                            movento 15.31%od insecticide{" "}
                          </p>
                          <div className="_p-price-box">
                            <div className="p-list">
                              <span>
                                {" "}
                                M.R.P. : <i className="fa fa-  INR" />{" "}
                                <del> 1399</del>{" "}
                              </span>
                              <span className="price"> Rs. 699 </span>
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
                                    <i className="ri-subtract-fill"></i>
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
                            <form method="post" acceptCharset="utf-8">
                              <ul className="spe_ul" />
                              <div className="_p-qty-and-cart">
                                <div className="product-add-to-cart addToCart productCartBtn">
                                  <button
                                    className="default-btn buy"
                                    tabIndex={0}
                                  >
                                    <FiShoppingCart /> Buy Now
                                  </button>
                                  <button
                                    className="default-btn cart"
                                    tabIndex={0}
                                  >
                                    <BsCart /> Add to Cart
                                  </button>
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

export default NewArrivalProduct;
