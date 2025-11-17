import React from "react";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetSizesQuery,
  useGetBrandsQuery,
} from "../products/productSlice";
import { BiLoaderAlt } from "react-icons/bi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../products-filter/ProductsFilter.css";
import { Link, useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { base_url } from "../../server";
import { getCountryCode, getCurrencyCode } from "../../Utils/localStorage";
let showCategoryItem = 5;
function ProductsFilter({
  filterdValues,
  getFilterdData,
  t,
  handleSliderChange,
  sliderValue,
  filterState,
  setFilterState,
  defaultRangeValue,
  getcateData,
}) {
  const [showCheckbox, setShowCheckbox] = useState("");
  const [categoryLoadMore, setCategoryLoadMore] = useState(showCategoryItem);
  const [sizeLoadMore, setSizeLoadMore] = useState(showCategoryItem);
  const [brandLoadMore, setBrandLoadMore] = useState(showCategoryItem);
  const [categoryTitle, setCategoryTitle] = useState("View More");
  const [sizeTitle, setSizeTitle] = useState("View More");
  const [brandTitle, setBrandTitle] = useState("View More");
  const param = useParams();

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

  const {
    data: categoriesSize,
    isLoading: sizeLoading,
    error: sizeError,
  } = useGetSizesQuery();
  const [allCategories, setallCategories] = useState(null);

  const [categoriesBrand, setcategoriesBrand] = useState(null);
  const [brandLoading, setbrandLoading] = useState(false);
  const [brandError, setbrandError] = useState(false);
  const baseUrl = base_url();
  const [priceRange, setPriceRange] = useState([
    defaultRangeValue?.minSaleRate,
    defaultRangeValue?.maxSaleRate,
  ]);
  console.log("defaultRangeValue", defaultRangeValue);
  useEffect(() => {
    setPriceRange([
      defaultRangeValue?.minSaleRate,
      defaultRangeValue?.maxSaleRate,
    ]);
  }, [defaultRangeValue]);
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
    const res = await axios.get(`${baseUrl}category/public`, {
      withCredentials: true,
    });
    // debugger;
    // console.log();
    // setSelect(res?.data[0]?.title?.uid)

    const arr = [];
    // for (let i = 0; i < res?.data?.length; i++) {
    //   const element = res.data[i];
    //   arr.push(element.name);
    //   if (element.Submenu) {
    //     for (let j = 0; j < element.Submenu?.length; j++) {
    //       const element2 = element?.Submenu[j];
    //       arr.push(element2);
    //     }
    //   }
    // }
    let id;
    const newArr = res?.data?.map((item) => {
      const isCheacked = item.uid === param.id;
      if (isCheacked) {
        id = item.uid;
        getcateData(item._id)
      }
      return {
        name: item.name,
        uid: item.uid,
        isCheacked: isCheacked,
      };
    });

    const clone = { ...filterState, categories: [id] };
    setFilterState(clone);
    setallCategories(newArr);
    // autoSellectedCategory(select)
  };

  useEffect(() => {
    getData();
    getData2();
  }, [param?.id]);
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

  const getValue = (e) => {
    console.log(e.target.value);
  };

  const setActive = (id, str, bul) => {
    filterdValues(id, str, bul);
    const newArr = allCategories.map((item) => {
      if (item.uid == id) {
        return { ...item, isCheacked: !item.isCheacked };
      } else {
        return item;
      }
    });
    setallCategories(newArr);
  };

  const filterData = (uuid) => {
    filterdValues(uuid, "brands");
  };

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // };
  // const debouncedHandleSliderChange = debounce((value) => {
  //   setPriceRange(value);
  //   handleSliderChange(value);
  // }, 300);

  const handleSliderChange2 = (value) => {
    handleSliderChange(value);
    setPriceRange(value);
  };

  const handleStyle = {
    borderColor: "#242424",
    backgroundColor: "white",
  };

  const railStyle = { backgroundColor: "#a79999" };

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
          <div className="d-none">
            <h4>price</h4>
            <div className="crossFil" onClick={closeFIlter}>
              <GrClose />
            </div>
          </div>

          {defaultRangeValue?.maxSaleRate && priceRange[0] ? (
            <Slider
              min={defaultRangeValue?.minSaleRate}
              max={defaultRangeValue?.maxSaleRate}
              step={1}
              range
              defaultValue={priceRange}
              onChange={handleSliderChange2}
              trackStyle={{ backgroundColor: "#242424" }}
              handleStyle={[handleStyle, handleStyle]}
              railStyle={railStyle}
            />
          ) : (
            <div className="loaderIcon">
              <BiLoaderAlt />
            </div>
          )}

          {/* <div className="rangeNumber">
            <span className="minNum">QAR 0</span>
            <span className="maxNum">QAR 100</span>
          </div> */}
          <div className="rangeNumber">
            <span className="minNum">
              {/* {t("Min")} : {getCurrencyCode()} {priceRange[0]}*/}
              {t("Min")} : ₹ {priceRange[0]}
            </span>
            <span className="maxNum">
               {/* {t("Max")} : {getCurrencyCode()} {priceRange[1]}*/}
              {t("Max")} : ₹ {priceRange[1]}
            </span>
          </div>

          {/* <input
            style={{ width: "100%" }}
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>Value: {sliderValue}</p> */}
        </div>
        {/* <div className="searchFilterBtn">
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
        </div> */}

        <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
          <h4>{t("Categories")}</h4>
          <div className="scroller">
            {allCategories?.map((item, i) => {
              return (
                <div className="formCheck" key={item._id}>
                  <div className="formCheck" key={item._id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onClick={(e) => {
                          setActive(item.uid, "categories", item.isCheacked);
                        }}
                        type="checkbox"
                        checked={item.isCheacked}
                        id={`flexCheckDefault${item.uid}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckDefault${item.uid}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="viewBtnn">
            <button
              className="btn btn-primary filterMore"
              onClick={() => {
                handleShow("allCategories");
              }}
            >
              {categoryTitle ? `${t("View More")}` : `${t("Less")}`}
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
                  <div className="form-check">
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
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onClick={() => {
                        filterData(item.uid, "brands");
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
              {brandTitle ? `${t("View More")}` : `${t("Less")}`}
            </button>
          </div>
        </div>

        {/* <div className={`productsFilterItem ${showCheckbox ? "active" : ""}`}>
                    <h4>size</h4>
                    {sizeLoading ? <div className="loaderIcon"><BiLoaderAlt /></div> : null}

                    {categoriesSize?.slice(0, sizeLoadMore).map((item, i) => {
                        return (
                            <div className="formCheck" key={item._id}>
                                {item.hasOwnProperty("size") ? (
                                    <div className="form-check">

                                        <div className="form-check" onClick={() => { filterdValues(item._id, 'size') }}>
                                            <input className="form-check-input" onClick={() => { filterdValues(item._id, 'size') }} type="checkbox" value="" id={`flexCheckDefault${item._id}`} />
                                            <label className="form-check-label" htmlFor={`flexCheckDefault${item._id}`}>
                                                {item.size}
                                            </label>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="form-check">

                                        <div className="form-check" onClick={() => { filterdValues(item._id, 'size') }}>
                                            <input className="form-check-input" onClick={() => { filterdValues(item._id, 'size') }} type="checkbox" value="" id={`flexCheckDefault${item._id}`} />
                                            <label className="form-check-label" htmlFor={`flexCheckDefault${item._id}`}>
                                                {item.size_code}
                                            </label>
                                        </div>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {sizeError && <div className="alertMsg" role="alert"> No Data Found </div>}

                    <div className="viewBtnn">
                        <button className="btn btn-primary filterMore" onClick={() => {
                            handleShow("categoriesSize")
                        }}>
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
