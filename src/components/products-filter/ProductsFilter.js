import React, { useEffect } from "react";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetSizesQuery,
  useGetBrandsQuery,
} from "../products/productSlice";
import { BiLoaderAlt } from "react-icons/bi";

import "./ProductsFilter.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { base_url } from "../../server";
let showCategoryItem = 5;
function ProductsFilter({
  filterdValues,
  getFilterdData,
  t,
  sliderValue,
  handleSliderChange,
}) {
  const [showCheckbox, setShowCheckbox] = useState("");
  const [categoryLoadMore, setCategoryLoadMore] = useState(showCategoryItem);
  const [sizeLoadMore, setSizeLoadMore] = useState(showCategoryItem);
  const [brandLoadMore, setBrandLoadMore] = useState(showCategoryItem);
  const [categoryTitle, setCategoryTitle] = useState("View More");
  const [sizeTitle, setSizeTitle] = useState("View More");
  const [brandTitle, setBrandTitle] = useState("View More");

  const handleShow = (categoryType) => {
    setShowCheckbox(!showCheckbox);

    if (categoryType === "allCategories") {
      if (categoryTitle === "View More") {
        setCategoryLoadMore(allCategories.length);
        setCategoryTitle("Less");
      } else {
        setCategoryLoadMore(5);
        setCategoryTitle("View More");
      }

      // setCategoryTitle(!categoryTitle);
    } else if (categoryType === "categoriesSize") {
      if (sizeTitle === "View More") {
        setSizeLoadMore(categoriesSize.length);
      } else {
        setSizeLoadMore(showCategoryItem);
      }
      setSizeTitle(!sizeTitle);
    } else if (categoryType === "categoriesBrand") {
      if (brandTitle === "View More") {
        setBrandLoadMore(categoriesBrand.length);
      } else {
        setBrandLoadMore(showCategoryItem);
      }
      setBrandTitle(!brandTitle);
    }
  };

  const [allCategories, setallCategories] = useState(null);
  const [categoryLoading, setcategoryLoading] = useState(false);
  const [categoryError, setcategoryError] = useState(false);

  const [categoriesBrand, setcategoriesBrand] = useState(null);
  const [brandLoading, setbrandLoading] = useState(false);
  const [brandError, setbrandError] = useState(false);
  const baseUrl = base_url();
  const getData2 = async () => {
    setbrandLoading(true);
    try {
      const res = await axios.get(`${baseUrl}brand/public`, {
        withCredentials: true,
      });
      setbrandLoading(false);
      setcategoriesBrand(res.data);
    } catch (error) {
      setbrandLoading(false);
      setbrandError(true);
    }
  };
  const getData = async () => {
    setcategoryLoading(true);
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setcategoryLoading(false);
      setcategoryError(false);
      setallCategories(res.data);
    } catch (error) {
      setcategoryLoading(false);
      setcategoryError(true);
    }
  };

  useEffect(() => {
    getData();
    getData2();
  }, []);

  const {
    data: categoriesSize,
    isLoading: sizeLoading,
    error: sizeError,
  } = useGetSizesQuery();

  const [show, setShow] = useState(false);
  const showFilters = () => {
    setShow(true);
    if (show) {
      document.getElementById("productFilterSec1").style.display = "none";
      document.getElementById("filterPro").style.display = "block";
      setShow(false);
      return;
    }
    document.getElementById("productFilterSec1").style.display = "block";
    document.getElementById("filterPro").style.display = "d-none";
  };
  const closeFIlter = () => {
    document.getElementById("productFilterSec1").style.display = "none";
    document.getElementById("filterPro").style.display = "block";
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-info filterPro"
        id="filterPro"
        onClick={showFilters}
      >
        <FaFilter style={{ marginRight: "10px" }} /> FILTER PRODUCT
      </button>
      <div className="productFilterSec" id="productFilterSec1">
        <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>{t("Price")}</h4>
            <div className="crossFil" onClick={closeFIlter}>
              <GrClose />
            </div>
          </div>
          {/* 
          <div className="rangeNumber">
            <span className="minNum">QAR 0</span>
            <span className="maxNum">QAR 100</span>
          </div> */}

          {/* <input
            style={{width:"100%"}}
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          /> */}
          {/* <p>Value: {sliderValue}</p> */}
        </div>
        <div className="searchFilterBtn">
          <button
            type="button"
            className="btn"
            onClick={() => {
              getFilterdData();
            }}
          >
            {" "}
            <i className="ri-search-line"></i> {t("Search")}
          </button>
        </div>

        <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
          <h4>{t("Categories")}</h4>
          <div className="scroller">
            {categoryLoading ? (
              <div className="loaderIcon">
                <BiLoaderAlt />
              </div>
            ) : null}
            {allCategories?.slice(0, categoryLoadMore).map((item, i) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onClick={() => {
                      filterdValues(item.uid, "categories");
                    }}
                    type="checkbox"
                    value=""
                    id={`flexCheckDefault${item._id}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexCheckDefault${item._id}`}
                  >
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>

          {categoryError && (
            <div className="alertMsg" role="alert">
              {" "}
              No Data Found{" "}
            </div>
          )}

          <div className="viewBtnn">
            <button
              className="btn btn-primary filterMore"
              onClick={() => {
                handleShow("allCategories");
              }}
            >
              {categoryTitle}
            </button>
          </div>
        </div>
        <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
          <h4>{t("brands")}</h4>
          {brandLoading ? (
            <div className="loaderIcon">
              <BiLoaderAlt />
            </div>
          ) : null}

          {categoriesBrand?.map((item, i) => {
            return (
              <div className="formCheck" key={item.uid}>
                {item.hasOwnProperty("name") ? (
                  <div
                    className="form-check"
                    // onClick={() => {
                    //   filterdValues(item._id, "brands");
                    // }}
                  >
                    <input
                      className="form-check-input"
                      onClick={() => {
                        filterdValues(item.uid, "brands");
                      }}
                      type="checkbox"
                      value=""
                      id={`flexCheckDefault${item.uid}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault${item.uid}`}
                    >
                      {item.name}
                    </label>
                  </div>
                ) : (
                  <div
                    className="form-check"
                    // onClick={() => {
                    //   filterdValues(item._id, "brands");
                    // }}
                  >
                    <input
                      className="form-check-input"
                      onClick={() => {
                        filterdValues(item.uid, "brands");
                      }}
                      type="checkbox"
                      value=""
                      id={`flexCheckDefault${item.uid}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault${item.uid}`}
                    >
                      {item.brand}
                    </label>
                  </div>
                )}
              </div>
            );
          })}
          {brandError && (
            <div className="alertMsg" role="alert">
              {" "}
              No Data Found{" "}
            </div>
          )}

          <div className="viewBtnn">
            <button
              className="btn btn-primary filterMore"
              onClick={() => {
                handleShow("categoriesBrand");
              }}
            >
              {brandTitle ? "View More" : "Less"}
            </button>
          </div>
        </div>

        {/* <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
          <h4>{t("Size")}</h4>
          {sizeLoading ? (
            <div className="loaderIcon">
              <BiLoaderAlt />
            </div>
          ) : null} */}
        {/* 
          {categoriesSize?.slice(0, sizeLoadMore).map((item, i) => {
            return (
              <div className="formCheck" key={item._id}>
                {item.hasOwnProperty("size") ? (
                  <div className="form-check">
                    <div
                      className="form-check"
                      onClick={() => {
                        filterdValues(item._id, "size");
                      }}
                    >
                      <input
                        className="form-check-input"
                        onClick={() => {
                          filterdValues(item._id, "size");
                        }}
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault${item._id}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckDefault${item._id}`}
                      >
                        {item.size}
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="form-check">
                    <div
                      className="form-check"
                      onClick={() => {
                        filterdValues(item._id, "size");
                      }}
                    >
                      <input
                        className="form-check-input"
                        onClick={() => {
                          filterdValues(item._id, "size");
                        }}
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault${item._id}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckDefault${item._id}`}
                      >
                        {item.size_code}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })} */}
        {/* {sizeError && (
            <div className="alertMsg" role="alert">
              {" "}
              No Data Found{" "}
            </div>
          )}

          <div className="viewBtnn">
            <button
              className="btn btn-primary filterMore"
              onClick={() => {
                handleShow("categoriesSize");
              }}
            >
              {sizeTitle ? "View More" : "Less"}
            </button>
          </div>
        </div> */}
        {/* <div className="productsFilterItem">
          <h4>Weight</h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              10 Kg
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckDefault"

            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              20 Kg
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              30 Kg
            </label>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ProductsFilter;
