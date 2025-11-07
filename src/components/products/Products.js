import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import ProductItem from "../home/products/product/ProductItem";
import ProductFilter from "../products-filter/ProductsFilter";
import "./Products.css";
import CollectionFilter from "../collecttion-filter/CollectionFilter";
import { productViewContext } from "../../pages/products";
import { Helmet } from "react-helmet";
import QuiekViewModal from "../../pages/QueikViewModal/QuiekViewModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import AsideBar from "../../components/product-category/AsideBar";
let showProduct = 10;

function Products() {
  const productData = useContext(productViewContext);
  const [latestData, setLatestData] = useState(null);
  const params = useParams();

  const [totalProductLength, setTotalProductLength] = useState(0);

  const [loadMore, setLoadMore] = useState(showProduct);
  const [listView, setListView] = useState("");
  const [defaultRangeValue, setDefaultRangeValue] = useState({});

  // const changePage = (num) => {
  //   setPage(num)
  //   getdata()
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  const [modelDataId, setModelDataId] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };

  // Show More Products
  const handleShowProduct = () => {
    if (latestData?.length > 12) {
      setLoadMore(loadMore + 12);
    } else {
    }
  };
  const handleList = () => {
    setListView("listView");
  };
  const handleGrid = () => {
    setListView("");
  };
  const setLenght = (num) => {
    setTotalProductLength(num);
  };

  const [filterState, setFilterState] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sort: "1",
  });

  const [value, setValue] = useState();
  const getDataShort = async (e) => {
    const clone = { ...filterState, sort: e.target.value };
    setFilterState(clone);
    getFilterdData(clone);
  };

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
      let indexflag = false;
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
            indexflag = true;
            index = i;
          }
        }
        if (indexflag) {
          arrBr.splice(index, 1);
          clone.brands = arrBr;
          setFilterState(clone);
          getFilterdData(clone);
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

  const [isLoadingVal, setIsloadingVal] = useState(false);
  const [sliderValue, setSliderValue] = useState(1000000); // Initial value
  const baseUrl = base_url();
  const handleSliderChange = (range) => {
    let result = allProducts.filter((item) => {
      const saleRate = item.prices ? item.prices.sale_rate : null;
      return saleRate !== null && saleRate >= range[0] && saleRate <= range[1];
    });
    setValue(result);
  };

  const getFilterdData = async (val) => {
    if (val) {
      setIsloadingVal(true);
      const obj = {
        ...val,
        minPrice: defaultRangeValue?.minSaleRate || 0,
        maxPrice: defaultRangeValue?.maxSaleRate || 1000,
      };
      try {
        const res = await axios.post(`${baseUrl}product/filter`, obj, {
          withCredentials: true,
        });
        setValue(res.data);
        findMinMaxSaleRate(res.data);
        setAllProducts(res.data);
        setTotalProductLength(res.data);
        setIsloadingVal(false);
      } catch (error) {
        alert("Filter Not Apply");
        setIsloadingVal(false);
      }
    } else {
      setIsloadingVal(true);
      const obj = {
        ...val,
        minPrice: defaultRangeValue?.minSaleRate || 0,
        maxPrice: defaultRangeValue?.maxSaleRate || 1000,
      };
      try {
        const res = await axios.post(`${baseUrl}product/filter`, obj, {
          withCredentials: true,
        });
        setValue(res.data);
        findMinMaxSaleRate(res.data);
        setTotalProductLength(res.data);
        setAllProducts(res.data);
        setIsloadingVal(false);
      } catch (error) {
        alert("Filter Not Apply");
        setIsloadingVal(false);
      }
    }
  };

  // const getdataVal = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}product/search/${params.val}`, {
  //       withCredentials: true,
  //     });
  //     setLatestData(res.data.getSearchedProduct);
  //     setTotalProductLength(res.data.getSearchedProduct);
  //   } catch (error) {
  //     alert("Server Error !");
  //   }
  // };

  // useEffect(() => {
  //   if (params.val) {
  //     getdataVal(0)
  //   }

  // }, [params.val])

  const { t, i18n } = useTranslation();
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

  const updateValue = (data) => {
    setValue(data);
    setAllProducts(data);
    findMinMaxSaleRate(data);
  };

  return (
    <>
      <Helmet>
        <title>Products | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>

      <Breadcrumb title="Products" t={t} />
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

            <div className="col-lg-3 col-md-4 col-sm-12 ddd">
              {/* <ProductFilter
                t={t}
                filterdValues={filterdValues}
                getFilterdData={getFilterdData}
                sliderValue={sliderValue}
                handleSliderChange={debouncedHandleSliderChange}
                defaultRangeValue={defaultRangeValue}
              /> */}
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
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="row">
                <div className="col-lg-12">
                  <CollectionFilter
                    handleList={handleList}
                    handleGrid={handleGrid}
                    totalProductLength={value}
                    getDataShort={getDataShort}
                    t={t}
                  />
                  <div
                    className={`row featuredRow  changeGrid ${
                      listView ? "listView" : ""
                    }`}
                  >
                    <ProductItem
                      listView={listView}
                      productData={productData}
                      loadMore={loadMore}
                      setTotalProductLength={setLenght}
                      latestData={latestData}
                      setLatestData={setLatestData}
                      handleShow={handleShow}
                      setValue={updateValue}
                      t={t}
                      value={value}
                    />
                  </div>
                  {/* {latestData?.length > 2 && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary loadMore"
                        onClick={handleShowProduct}
                      >
                        Load More
                      </button>
                    </div>
                  )} */}

                  {/* <nav aria-label="Page navigation example">
                    <ul className="pagination" style={{ justifyContent: "end" }}>

                      <li className="page-item" onClick={() => getdata(0)}><button className="page-link">1</button></li>
                      <li className="page-item" onClick={() => getdata(1)}><button className="page-link">2</button></li>
                      <li className="page-item" onClick={() => getdata(2)}><button className="page-link">3</button></li>
                      <li className="page-item" onClick={() => getdata(3)}><button className="page-link">4</button></li>
                      <li className="page-item" onClick={() => getdata(4)}><button className="page-link">5</button></li>
                      <li className="page-item" onClick={() => getdata(5)}><button className="page-link">6</button></li>
                      <li className="page-item" onClick={() => getdata(6)}><button className="page-link">7</button></li>
                      <li className="page-item" onClick={() => getdata(7)}><button className="page-link">8</button></li>

                    </ul>
                  </nav> */}
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
    </>
  );
}

export default Products;
