import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useGetMenuListQuery } from "../../../components/products/productSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../../server";

function MobileMenu() {
  const isLogin = JSON.parse(window?.localStorage?.getItem("isLogin"));

  const { data: categoryData } = useGetMenuListQuery();

  const [data, setData] = useState(null);
  const [showSelectedSubMenu, setShowSelectedSubMenu] = useState({});
  const baseUrl = base_url();

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/filter`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const [ourCategoryData, setOurCategoryData] = useState(null);

  const getCategoryData = async () => {
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
    getCategoryData();
  }, []);

  const { t } = useTranslation();

  const openSubMenu = (name) => {
    setShowSelectedSubMenu((prev) => {
      const updatedState = {};
      Object.keys(prev).forEach((key) => {
        updatedState[key] = false;
      });

      updatedState[name] = !prev[name];
      return updatedState;
    });
  };

  return (
    <div
      className="collapse navbar-collapse mean-menu show"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav mobileMenuList m-0 p-0">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {t("Home")}
          </Link>
        </li>
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
        {/* 
        {data &&
          data.slice(0, 9).map((item, i) => {
            {
              console.log(item?.title);
            }
            return (
              <li className="nav-item perent" key={i}>
                <Link
                  to={`product/category/${item?.title.uid}/${item?.title?.slug}`}
                  className="nav-link"
                >
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
                                    <Link
                                      to={`product/category/${item._id}`}
                                      className="nav-link sub_menu_Text"
                                    >
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
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            {t("Contact Us")}
            <i className="bx bx-chevron-down"></i>
          </Link>
        </li>

        {isLogin === true && (
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Services
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MobileMenu;
