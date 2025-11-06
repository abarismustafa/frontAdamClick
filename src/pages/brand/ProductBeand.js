import { Link, useParams } from "react-router-dom";
import AsideBar from "../../components/product-category/AsideBar";
import CatogaryItem from "../../components/product-category/CatogaryItem";

import {
  useBrandProductQuery,
  useGetProductsQuery,
} from "../../components/products/productSlice";
import QuiekViewModal from "../QueikViewModal/QuiekViewModal";
import { useState } from "react";
import axios from "axios";
import { base_url } from "../../server";

function PrductBrandPage() {
  const params = useParams();
  // const { data: allData, isLoading, isError } = useBrandProductQuery(params.id)
  const { data: allData, isError, isLoading } = useGetProductsQuery();

  const [data, setData] = useState(allData);
  const [modelDataId, setModelDataId] = useState(null);
  const setProduct_id = (id) => {
    setModelDataId(id);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };

  const [filterState, setFilterState] = useState({
    categories: [],
    brands: [],
    minprice: "",
    maxprice: "",
  });
  const baseUrl = base_url();
  const filterdValues = async (id, str) => {
    const clone = { ...filterState };
    if (str === "categories") {
      const arrCat = [...clone.categories];

      let flag = false;
      let index;
      if (!arrCat.length) {
        arrCat.push(id);
        clone.categories = arrCat;
        setFilterState(clone);
      } else {
        for (let i = 0; i <= arrCat.length; i++) {
          if (arrCat[i] === id) {
            flag = true;
            index = i;
          }
        }
        if (index) {
          arrCat.splice(index, 1);
          clone.categories = arrCat;
          setFilterState(clone);
          flag = false;
          index = undefined;
          return;
        }
        if (!flag) {
          arrCat.push(id);
          clone.categories = arrCat;
          setFilterState(clone);
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
          flag = false;
          index = undefined;
          return;
        }
        if (!flag) {
          arrBr.push(id);
          clone.brands = arrBr;
          setFilterState(clone);
        }
      }
    }
    if (str === "size") {
    }
  };

  const getFilterdData = async () => {
    try {
      const res = await axios.post(`${baseUrl}product/filter`, filterState);
      setData(res.data);
    } catch (error) {
      alert("Filter Not Apply");
    }
  };

  return (
    <section className="prodcutsSec">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <AsideBar
              filterdValues={filterdValues}
              getFilterdData={getFilterdData}
            />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="row">
              <div className="col-lg-12">
                {isLoading && (
                  <div className="preloaderCount">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {isError && <h4>Server Error</h4>}

                <div className="collectionFilter">
                  <div className="totalProducts">
                    <h6>{data?.length} products</h6>
                  </div>
                  <div className="collectionFilterItem">
                    <div className="collectionFilterSort">
                      <select>
                        <option value="DEFAULT" selected="">
                          Default Sorting
                        </option>
                        <option value="manual">Featured</option>
                        <option value="best-selling">Best selling</option>
                        <option value="title-ascending">
                          Alphabetically, A-Z
                        </option>
                        <option value="title-descending">
                          Alphabetically, Z-A
                        </option>
                        <option value="price-ascending">
                          Price, low to high
                        </option>
                        <option value="price-descending">
                          Price, high to low
                        </option>
                        <option value="created-ascending">
                          Date, old to new
                        </option>
                        <option value="created-descending">
                          Date, new to old
                        </option>
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
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
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
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
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

                <div className="row changeGrid ">
                  {data ? (
                    data?.map((item, i) => {
                      return (
                        <CatogaryItem
                          key={item._id}
                          item={item}
                          i={i}
                          handleShow={handleShow}
                          setProduct_id={setProduct_id}
                        />
                      );
                    })
                  ) : (
                    <div className="preloaderCount">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
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
export default PrductBrandPage;
