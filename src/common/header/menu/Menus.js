import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import "./Menus.css";
import { useGetMenuListQuery } from "../../../components/products/productSlice";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { base_url } from "../../../server";

function Menus() {
  const isLogin = window.localStorage.getItem("isLogin");
  // const { data, isSuccess } = useGetMenuListQuery()
  const { data: categoryData } = useGetMenuListQuery();

  const [ourCategoryData, setOurCategoryData] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setOurCategoryData(res.data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <div
        className="collapse navbar-collapse mean-menu show"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav m-0 p-0">
          
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              {t("About Us")}
              <i className="bx bx-chevron-down"></i>
            </Link>
          </li>
           <li className="dropdown categoryDropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {t("Shop Online")}
            </button>
            <ul className="dropdown-menu">
              {ourCategoryData?.slice(0, 10)?.map((item, i) => {
                return (
                  <li className="nav-item" key={i}>
                    <Link
                      to={`/product/category/${item.uid}/${item?.slug}`}
                      className="nav-link"
                    >
                      {item?.name}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              {t("All Products")}
              <i className="bx bx-chevron-down"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {t("Top Deals")}
              <i className="bx bx-chevron-down"></i>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              {t("Contact")}
            </Link>
          </li>

          {/* {data &&
            data.slice(0, 9).map((item, i) => {
              {
                console.log(item?.title);
              }
              return (
                <li className="nav-item perent" key={i}>
                  <Link to={`product/category/${item?.title.uid}/${item?.title?.slug}`} className="nav-link">
                    {item?.title?.name}
                    <i className="bx bx-chevron-down"></i>
                  </Link>

                  {item?.Submenu?.length > 0 && (
                    <ul className={`dropdown-menu dropAgro ${i}`}>
                      <div className="row">
                        <div className="col-lg-3 width-100pr">
                          <div className="menuList" style={{ paddingTop: "0px" }}>
                            <ul>
                              {item.Submenu &&
                                item.Submenu.map((item) => {
                                  {
                                    console.log(item);
                                  }
                                  return (
                                    <li className="nav-item" key={item._id}>
                                      <Link to={`product/category/${item._id}`} className="nav-link sub_menu_Text">
                                        <FiChevronRight /> {item.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </ul>
                  )}
                </li>
              );
            })} */}
          {/* <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
              <i className="bx bx-chevron-down"></i>
            </Link>
          </li> */}

          {isLogin === true && (
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Services
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Menus;
