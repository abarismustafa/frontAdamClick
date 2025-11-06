import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useSetBillingActiveMutation } from "../../components/products/productSlice";
import FormBillAdd from "../../components/profile/FormBillAdd";
import EditAddress from "../../components/profile/EditAddress";
import axios from "axios";
import { useEffect } from "react";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function BillingAddress() {
  const userid = window.localStorage.getItem("user_id");
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const [setActive, { isLoading, isSuccess }] = useSetBillingActiveMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState(false);
  const token = window.localStorage.getItem("token");
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}user/billAddress`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.address);
    } catch (error) {
      alert("Server Error Failed To load Data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const setIdAddresdEdit = (id) => {
    window.localStorage.setItem("setIdEditAdress", id);
    handleShow();
  };

  useEffect(() => {
    if (isSuccess) {
      getData();
    }
  }, [isSuccess]);

  const billingShippingActive = (item) => {
    setState(true);
    setActive({ itemId: item._id, userid: userid, token: token });
    setTimeout(() => {
      setState(false);
    }, 1000);
  };
  
    const { t, i18n } = useTranslation();

  return (
    <section className="sectionPD">
      <div className="addressInfo mt-3">
        {isLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {state && (
          <div className="preloaderCount">
            <h4 style={{ color: "Black" }}>
              <strong>{t("Billing Address Active")}</strong>{" "}
            </h4>
          </div>
        )}
        <div className="container">
          <div className="fisherman-content">
            <h3>{t("Billing Address")}</h3>
          </div>
          <div className="card-body">
            <div className="col-lg-12">
              <div className="bgGray p-3 rounded mb-3 c-pointer ">
                <i className="la la-plus la-2x" />
                <div
                  className="alpha-7"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  {t("Add Billing Address")}
                </div>
              </div>
            </div>
            <div className="row gutters-10">
              {/* {!data && <div className="preloaderCount">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>} */}
              {data &&
                data.map((item) => {
                  return (
                    <div className="col-lg-6" key={item._id}>
                      <div className="border p-3 pr-5 rounded mb-3 position-relative">
                        <h6>
                          {t("Type")} :{item.type} {t("Address")}
                          <div className="form-check form-switch">
                            <FaEdit
                              onClick={() => {
                                setIdAddresdEdit(item._id);
                              }}
                            />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.active ? true : false}
                              role="switch"
                              id="flexSwitchCheckChecked"
                              onClick={() => billingShippingActive(item)}
                            />
                          </div>
                        </h6>
                        {/* <div>
                                    <span className="w-50 fw-600">Address:</span>
                                    <span className="ml-2">
                                        {item.province}
                                    </span>
                                </div> */}
                        <div>
                          <span className="w-50 fw-600">{t("Address Line 1")}:</span>
                          <span className="ml-2">{item.addressLine1}</span>
                        </div>
                        <div>
                          <span className="w-50 fw-600">{t("Address Line 2")}:</span>
                          <span className="ml-2">{item.addressLine2}</span>
                        </div>
                        <div>
                          <span className="w-50 fw-600">{t("Postal code")}:</span>
                          <span className="ml-2">{item.zip}</span>
                        </div>
                        <div>
                          <span className="w-50 fw-600">{t("City")}:</span>
                          <span className="ml-2">{item.city}</span>
                        </div>
                        <div>
                          <span className="w-50 fw-600">{t("State")}:</span>
                          <span className="ml-2">{item.state}</span>
                        </div>
                        <div>
                          <span className="w-50 fw-600">{t("Country")}:</span>
                          <span className="ml-2">{item.country}</span>
                        </div>

                        <div className="dropdown position-absolute right-0 top-0">
                          <button
                            className="btn bg-gray px-2"
                            type="button"
                            data-toggle="dropdown"
                          >
                            <i className="la la-ellipsis-v" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item">{t("Edit")}</a>
                            <a className="dropdown-item" href="">
                              {t("Make This Default")}
                            </a>
                            <a className="dropdown-item" href="">
                              {t("Delete")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {t("Add Address")}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <FormBillAdd
                    getData={getData}
                    ship="billing"
                    type="billing"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* edit modal */}

          <Modal show={show} style={{ padding: "20px" }} onHide={handleClose}>
            <EditAddress
              handleClose={handleClose}
              getData={getData}
              ship="billing"
              type="billing"
            />
          </Modal>
        </div>
      </div>
    </section>
  );
}
export default BillingAddress;
