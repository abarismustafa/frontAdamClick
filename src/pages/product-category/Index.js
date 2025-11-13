import { Link, useParams } from "react-router-dom";
import AsideBar from "../../components/product-category/AsideBar";
import CatogaryItem from "../../components/product-category/CatogaryItem";

import { useGetCategoriesProductQuery } from "../../components/products/productSlice";
import QuiekViewModal from "../QueikViewModal/QuiekViewModal";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import UseStatisticTracker from "../../common/useStatisticTracker/UseStatisticTracker";
import Slider from "react-slick";

function ProductCategoryPage() {
  const params = useParams();
  // console.log(params);
  UseStatisticTracker({ category_id: params?.id });

  // const { data: allData, isLoading } = useGetCategoriesProductQuery(params.id)
  let isError = false;
  const [data, setData] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [listView, setListView] = useState("");
  const [modelDataId, setModelDataId] = useState(null);
  const [defaultRangeValue, setDefaultRangeValue] = useState({});
  const setProduct_id = (id) => {
    setModelDataId(id);
  };
  const handleList = () => {
    setListView("listView");
  };
  const handleGrid = () => {
    setListView("");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };
  const baseUrl = base_url();
  const getDatas = async () => {
    const res = await axios.get(`${baseUrl}product/category/${params.id}`, {
      withCredentials: true,
    });
    setData(res.data);
    setAllProducts(res.data);
    findMinMaxSaleRate(res.data);
  };

  useEffect(() => {
    if (params?.id) {
      // getDatas();
      const getFilterd = async () => {
        try {
          const res = await axios.post(
            `${baseUrl}product/filter`,
            { ...filterState, categories: [params?.id] },
            { withCredentials: true }
          );
          setData(res.data);
          findMinMaxSaleRate(res.data);
          setAllProducts(res.data);

          setIsloadingVal(false);
        } catch (error) {
          alert("Filter Not Apply");
          setIsloadingVal(false);
        }
      };
      getFilterd();
    }
  }, [params?.id]);
  const [filterState, setFilterState] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sort: "1",
  });
  const [isLoadingVal, setIsloadingVal] = useState(false);
  const findMinMaxSaleRate = (allProducts) => {
    const { minSaleRate, maxSaleRate } = allProducts.reduce(
      (result, item) => {
        const saleRate = item.prices ? item.prices.sale_rate : null;

        if (saleRate !== null) {
          result.minSaleRate =
            result.minSaleRate === null
              ? saleRate
              : Math.min(result.minSaleRate, saleRate);

          result.maxSaleRate =
            result.maxSaleRate === null
              ? saleRate
              : Math.max(result.maxSaleRate, saleRate);
        }

        return result;
      },
      { minSaleRate: null, maxSaleRate: null }
    );
    setDefaultRangeValue({ minSaleRate, maxSaleRate });
  };

  const [sliderValue, setSliderValue] = useState(100); // Initial value

  const handleSliderChange = (range) => {
    let result = allProducts.filter((item) => {
      const saleRate = item.prices ? item.prices.sale_rate : null;
      return saleRate !== null && saleRate >= range[0] && saleRate <= range[1];
    });
    setData(result);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      setIsloadingVal(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedHandleSliderChange = debounce((value) => {
    handleSliderChange(value);
    setIsloadingVal(false);
  }, 300);

  const filterdValues = async (id, str) => {
    const clone = { ...filterState };
    if (str === "categories") {
      const arrCat = [...clone.categories];
      let flag = false;
      let indexflag = false;
      let index;
      if (!arrCat.length) {
        arrCat.push(id);
        clone.categories = arrCat;
        setFilterState(clone);
        getFilterdData(clone);
      } else {
        for (let i = 0; i <= arrCat.length; i++) {
          if (arrCat[i] == id) {
            flag = true;
            indexflag = true;
            index = i;
          }
        }
        if (indexflag) {
          arrCat.splice(index, 1);
          clone.categories = arrCat;
          setFilterState(clone);
          getFilterdData(clone);
          index = undefined;
          return;
        }
        if (!flag) {
          arrCat.push(id);
          clone.categories = arrCat;
          setFilterState(clone);
          getFilterdData(clone);
        }
      }
    }
    if (str === "brands") {
      const arrBr = [...clone.brands];

      let flag = false;
      let index;
      if (!arrBr.length) {
        arrBr.push(id);
        clone.brands = arrBr;
        setFilterState(clone);
        getFilterdData(clone);
      } else {
        for (let i = 0; i <= arrBr.length; i++) {
          console.log(arrBr[i], id);
          if (arrBr[i] === id) {
            flag = true;
            index = i;
          }
        }
        if (index) {
          console.log("innndel");
          arrBr.splice(index, 1);
          clone.brands = arrBr;
          setFilterState(clone);
          getFilterdData(clone);
          flag = false;
          index = undefined;
          return;
        }
        if (!flag) {
          arrBr.push(id);
          clone.brands = arrBr;
          setFilterState(clone);
          getFilterdData(clone);
        }
      }
    }
    if (str === "size") {
    }
  };

  const getFilterdData = async (val) => {
    setIsloadingVal(true);
    if (val) {
      try {
        const res = await axios.post(
          `${baseUrl}product/filter`,
          {
            ...val,
            minPrice: defaultRangeValue?.minSaleRate || 0,
            maxPrice: defaultRangeValue?.maxSaleRate || 1000,
          },
          { withCredentials: true }
        );
        setData(res.data);
        setAllProducts(res.data);
        findMinMaxSaleRate(res.data);
        setIsloadingVal(false);
      } catch (error) {
        alert("Filter Not Apply");
        setIsloadingVal(false);
      }
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}product/filter`, filterState, {
        withCredentials: true,
      });
      setData(res.data);
      setAllProducts(res.data);
      findMinMaxSaleRate(res.data);
      setIsloadingVal(false);
    } catch (error) {
      alert("Filter Not Apply");
      setIsloadingVal(false);
    }
  };
  const getDataShort = async (e) => {
    const clone = { ...filterState, sort: e.target.value };
    setFilterState(clone);
    getFilterdData(clone);
  };
  const [categoriesDatas, setCateData] = useState(null);
  const getcateData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setCateData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getcateData();
  }, []);
  const settings = {
    speed: 500,
    slidesToShow: 8, // Number of items to show on desktop
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1120, // Screen size for tablets
        settings: {
          slidesToShow: 5, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024, // Screen size for tablets
        settings: {
          slidesToShow: 4, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // Screen size for mobile devices

        settings: {
          slidesToShow: 4, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 500, // Screen size for mobile devices
        settings: {
          slidesToShow: 4, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  const { t, i18n } = useTranslation();
  return (
    <section className="prodcutsSec sectionPD">
      <div className="container">
        <div className="row">
          {isLoadingVal && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="col-lg-3 col-md-4 col-sm-4">
            <AsideBar
              t={t}
              filterdValues={filterdValues}
              getFilterdData={getFilterdData}
              sliderValue={sliderValue}
              filterState={filterState}
              setFilterState={setFilterState}
              handleSliderChange={debouncedHandleSliderChange}
              defaultRangeValue={defaultRangeValue}
            />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-8">
            <div className="row">
              <div className="col-lg-12">
                {isError && <h4>Server Error</h4>}
                {/* {isLoading && <div className="preloaderCount">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>} */}
                <div className="subCategoriesCard">
                  <div className="categoryWrapper">
                    <Slider {...settings}>
                    {categoriesDatas
                      ?.filter((item) => item.parent_id !== null)
                      .reverse()
                      .map((item, i) => (
                        <div className="mediaQueryClass" key={i}>
                          <Link
                            to={`/product/category/${item.uid}/${item?.slug}`}
                          >
                            <div className="serviceItemIcon category">
                              <img
                                src={item?.icon?.url}
                                alt="Product"
                                className="img-fluid"
                              />
                            </div>
                            <div className="serviceItemText d-none">
                              <h5>
                                <Link
                                  to={`/product/category/${item.uid}/${item?.slug}`}
                                >
                                  {item?.name}
                                </Link>
                              </h5>
                            </div>
                          </Link>
                        </div>
                      ))}
                      </Slider>
                  </div>
                </div>
                <div className="collectionFilter">
                  <div className="totalProducts">
                    <h6>
                      {/* {data?.length} {t("Products")} */}
                      {data?.reduce(
                        (total, item) =>
                          total + (item?.variations?.length || 0),
                        0
                      )}{" "}
                      {t("Products")}
                    </h6>
                  </div>
                  <div className="collectionFilterItem">
                    <div className="collectionFilterSort">
                      <select defaultValue="DEFAULT" onChange={getDataShort}>
                        <option value="1">{t("Newly added last")}</option>
                        <option value="2">{t("Newly added first")}</option>
                        <option value="3">{t("Ascending by Name")}</option>
                        <option value="4">{t("Descending by Name")}</option>

                        <option value="5">{t("Price High to Low")}</option>
                        <option value="6">{t("Price Low to High")}</option>
                      </select>
                    </div>
                    <div className="collectionFilterList">
                      <ul className="no-bullets inline-list text-right">
                        <li>
                          <button
                            type="button"
                            className="grid-view-btn"
                            data-view="Grid"
                            title="Grid"
                            onClick={handleGrid}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="grid-view-btn"
                            data-view="list"
                            title="List"
                            onClick={handleList}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 448 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`row featuredRow changeGrid ${
                    listView ? "listView" : ""
                  }`}
                >
                  {data &&
                    data?.map((item, i) => {
                      return (
                        <CatogaryItem
                          setProduct_id={setProduct_id}
                          key={item._id}
                          item={item}
                          i={i}
                          t={t}
                          handleShow={handleShow}
                        />
                      );
                    })}
                  {data?.length === 0 && <h4>No Products</h4>}
                </div>
              </div>
            </div>
          </div>
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
  );
}
export default ProductCategoryPage;
