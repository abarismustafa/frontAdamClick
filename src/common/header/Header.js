import React, { useEffect } from "react";
import TopHeader from "./top-header/TopHeader";
import SearchBox from "./search-box/SearchBox";
import { isMobile } from "react-device-detect";
import * as bootstrap from "bootstrap";

import "./Header.css";
import Menus from "./menu/Menus";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";


import { FaChevronRight, FaFolder, FaChevronDown, FaFolderOpen } from "react-icons/fa";
import { FaWalkieTalkie } from "react-icons/fa6";

function Header({ changeLang }) {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const baseUrl = base_url();
  const location = useLocation();
  const fixedHeader = () => {
    if (window.scrollY >= 1) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  window.addEventListener("scroll", fixedHeader);

  const [state, setState] = useState({
    front_top_message: "",
    icon: "",
  });

  const onMenuButtonClicked = () => {
    if (isMobile) {
      setShowMenu(!showMenu);
    }
  };

  const [ourCategoryData, setOurCategoryData] = useState(null);
  const [ourCatData, setOurCatData] = useState(null);
  const [openParent, setOpenParent] = useState(null);
  const [openSubChild, setOpenSubChild] = useState(null);
  const [clickedParentId, setClickedParentId] = useState(null);
  const [clickedChildId, setClickedChildId] = useState(null);
  const navigate = useNavigate();


  // useEffect(() => {
  //   const offcanvasEl = document.querySelector(".offcanvas.show");
  //   if (offcanvasEl) {
  //     const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  //     if (bsOffcanvas) {
  //       bsOffcanvas.hide();
  //     }
  //   }
  // }, [location]);

  useEffect(() => {
    const offcanvasEl = document.getElementById("offcanvasExample");
    if (!offcanvasEl) return;

    let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (!bsOffcanvas) {
      bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl, { backdrop: false });
    }

    const toggleOffcanvas = () => {
      if (offcanvasEl.classList.contains("show")) {
        bsOffcanvas.hide();
      } else {
        bsOffcanvas.show();
      }
    };

    const menuBtn = document.getElementById("menuButton");
    if (menuBtn) {
      menuBtn.addEventListener("click", toggleOffcanvas);
    }

    return () => {
      if (menuBtn) menuBtn.removeEventListener("click", toggleOffcanvas);
    };
  }, []);

  // 🔹 Automatically close offcanvas when route changes
  useEffect(() => {
    const offcanvasEl = document.getElementById("offcanvasExample");
    if (!offcanvasEl) return;

    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas && offcanvasEl.classList.contains("show")) {
      bsOffcanvas.hide();
    }

    // Optional: cleanup backdrop and overflow if any remains
    document.querySelectorAll(".offcanvas-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("offcanvas-backdrop", "show", "modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, [location]);

  const handleParentClick = (parent) => {
    // 🔹 Agar parent ke child hain:
    if (parent.children?.length > 0) {
      if (openParent === parent._id && clickedParentId === parent._id) {
        // 2nd click pe navigate
        navigate(`/product/category/${parent.uid}/${parent.slug}`);
      } else {
        // 1st click pe dropdown open
        setOpenParent(parent._id);
        setClickedParentId(parent._id);
        setOpenSubChild(null);
      }
    } else {
      // 🔹 Agar koi child nahi hai -> direct navigate
      navigate(`/product/category/${parent.uid}/${parent.slug}`);
    }
  };

  const handleChildClick = (child) => {
    // 🔹 Agar child ke subChildren hain:
    if (child.subChildren?.length > 0) {
      if (openSubChild === child._id && clickedChildId === child._id) {
        // 2nd click pe navigate
        navigate(`/product/category/${child.uid}/${child.slug}`);
      } else {
        // 1st click pe subchild open
        setOpenSubChild(child._id);
        setClickedChildId(child._id);
      }
    } else {
      // 🔹 Agar koi subChild nahi hai -> direct navigate
      navigate(`/product/category/${child.uid}/${child.slug}`);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setOurCategoryData(res.data);

      const resCat = await axios.get(`${baseUrl}category/level`);
      setOurCatData(resCat?.data?.data);
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
      {/* <button type="button" onClick={()=>{changeLang('en')}}>EEE</button>
                    <button type="button" onClick={()=>{changeLang('de')}}>ARR</button> */}
      <header className={`${isSticky ? "sticky active" : "sticky"}`}>
        <TopHeader state={state} changeLange={changeLang} />
        <SearchBox val={state} showMenu={onMenuButtonClicked} />
        {!isMobile && (
          <div className="navbarArea">
            <div className="abaris-nav">
              <div className="container-fluid">
                <div className="menuCard">
                  <div className="allCategoryDrop">
                    <span>categories</span>
                    <i className="ri-menu-line"></i>

                    <div className="categoryList">
                      <ul>
                        <li>
                          <Link to="/products">Baby bottles</Link>
                        </li>
                        <li>
                          <Link to="/products">Breastfeeding Accessories</Link>
                        </li>
                        <li>
                          <Link to="/products">Bibs & Cloths</Link>
                        </li>
                        <li>
                          <Link to="/products">Teethers & Pacifiers</Link>
                        </li>
                        <li>
                          <Link to="/products">Feeding Essentials</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>


      <div
        className="offcanvas offcanvas-start custom-offcanvas"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header custom-header">
          <h5 className="offcanvas-title text-white">Shop by Category</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>




        </div>

        <div className="offcanvas-body custom-body">
          {Array.isArray(ourCatData) && ourCatData.length > 0 ? (
            ourCatData.map((parent) => (
              <div key={parent._id} className="category-block">
                {/* ==== Parent ==== */}
                <div
                  className="d-flex align-items-center justify-content-between category-header"
                  onClick={() => handleParentClick(parent)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <FaWalkieTalkie className="fs-4 me-2 toggle-folder" />
                    <span className="category-link text-white fw-semibold">
                      {parent?.name || "Unnamed Category"}
                    </span>
                  </div>
                  {parent.children?.length > 0 && (
                    <span className="toggle-arrow text-white">
                      {openParent === parent._id ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </div>

                {/* ==== Child List ==== */}
                <div
                  className={
                    openParent === parent._id ? "slide-down" : "slide-up"
                  }
                >
                  {parent.children?.length > 0 && (
                    <ul className="child-list mt-1">
                      {parent.children.map((child) => (
                        <li key={child._id} className="child-item">
                          <div
                            className="d-flex align-items-center justify-content-between child-toggle"
                            onClick={() => handleChildClick(child)}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="child-link text-dark">
                              <FaChevronRight className="me-2 small" />
                              {child.name}
                            </span>

                            {child.subChildren?.length > 0 && (
                              <span className="toggle-icon">
                                {openSubChild === child._id ? (
                                  <FaChevronDown />
                                ) : (
                                  <FaChevronRight />
                                )}
                              </span>
                            )}
                          </div>

                          {/* ==== Subchild List ==== */}
                          <div
                            className={
                              openSubChild === child._id
                                ? "slide-down"
                                : "slide-up"
                            }
                          >
                            {child.subChildren?.length > 0 && (
                              <ul className="subchild-list ms-4 mt-1">
                                {child.subChildren.map((sub) => (
                                  <li key={sub._id}>
                                    <Link
                                      to={`/product/category/${sub.uid}/${sub.slug}`}
                                      className="sub-link text-secondary"
                                    >
                                      <FaChevronRight className="me-2 small text-secondary" />
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white mt-3">No categories found</p>
          )}
        </div>
      </div>

      {/* <div
        className="offcanvas offcanvas-start p-0"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-white"
            id="offcanvasScrollingLabel"
          >
            Shop by Category
          </h5>
          <button
            type="button"
            className="btn-close text-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="categoryItems d-none">
            <ul>
              {ourCategoryData?.map((item, i) => {
                return (
                  <li key={i}>
                    <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                      {item?.name} xfgd
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Face Wash
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <div className="categoryItems">
                    <ul>
                      <li>
                        <Link to={`/product/category/4/FaceWash`}>
                          Body Serum For Women
                        </Link>
                      </li>
                      <li>
                        <Link to={`/product/category/4/FaceWash`}>
                          True Match Nude
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Beauty Glow
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <div className="categoryItems">
                    <ul>
                      <li>
                        <Link to={`/product/category/1/BeautyGlow`}>
                          Moisturizer Summer Skin
                        </Link>
                      </li>
                      <li>
                        <Link to={`/product/category/1/BeautyGlow`}>
                          Drop Stitch Wakeboard
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Body Lotion
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <div className="categoryItems">
                    <ul>
                      <li>
                        <Link to={`/product/category/2/BodyLotion`}>
                          100% Body Care
                        </Link>
                      </li>
                      <li>
                        <Link to={`/product/category/2/BodyLotion`}>
                          Dry Skin Moisturizer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Cosmetics
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <div className="categoryItems">
                    <ul>
                      <li>
                        <Link to={`/product/category/3/Cosmetics`}>
                          Women Beauty Glow
                        </Link>
                      </li>
                      <li>
                        <Link to={`/product/category/3/Cosmetics`}>
                          ISUP Drop Stitch
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Header;
