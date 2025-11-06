import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useEditUserDetailMutation,
  useGetCurrencyQuery,
  useGetLanguageQuery,
  useGetUserDetailQuery,
} from "../products/productSlice";
import BillingAddres from "./BillingAddres";
import axios from "axios";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function Profile() {
  const user_id = window.localStorage.getItem("user_id");
  const token = window.localStorage.getItem("token");
  const [sendDataUser] = useEditUserDetailMutation();
  const [show, setShow] = useState(false);
  // const { data: language } = useGetLanguageQuery()
  // const { data: currency } = useGetCurrencyQuery()
  // const { data, isSuccess } = useGetUserDetailQuery(user_id)

  const [language, setlanguage] = useState(null);
  const [currency, setcurrency] = useState(null);
  const baseUrl = base_url();
  const getData2 = async () => {
    const res = await axios.get(`${baseUrl}language`);
    const res2 = await axios.get(`${baseUrl}currency`);
    setlanguage(res.data);
    setcurrency(res2.data);
  };

  let isSuccess = false;
  const [data, setData] = useState(null);
  console.log(data);

  const dispach = useDispatch();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    currency: "",
    language: "",
    profilePhoto: {
      public_id: "",
      url: "",
    },
  });
  const getData = async () => {
    const res = await axios.get(`${baseUrl}user/profile`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    getData2();
    getData();
  }, []);

  const onchengeHandle = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    if (e.target.name === "language" || e.target.name === "currency") {
      clone[e.target.id] = e.target.value;
    }
    setState(clone);
  };

  const [file, setFile] = useState(null);
  const onchagePhoto = (e) => {
    setFile(e.target.files[0]);
  };


  const handleChangeImage = async (e) => {
    const { name, files } = e.target;
    const imageData = new FormData();
    imageData.append('image', files[0]);
    try {
      const res = await axios.post(
        `${baseUrl}/image/addImage`,
        imageData
      );
      console.log(res?.data?.url);

      setTimeout(() => {
        // setState((prev) => ({
        //   ...prev,
        //   [name]: res.data?.url,
        // }));
        setState((prev) => ({
          ...prev,
          [name]: {
            public_id: res?.data?.public_id || "",
            url: res?.data?.url || "",
          },
        }));
      }, 1000);
    } catch (error) {
      console.error('Image Upload Error:', error);

    }
  };


  const sendData = async () => {
    const obj = {
      firstname: state.firstName,
      lastname: state.lastName,
      email: state.email,
      mobile: state.mobile,
      userid: user_id,
      currency: state.currId,
      language: state.languId,
      profilePhoto: state?.profilePhoto
    };
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      try {
        const res = await axios.put(`${baseUrl}user/updateProfile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.localStorage.setItem("profilePic", res.data.profilePhoto?.url);
      } catch (error) {
        alert("Server Error Image Not Update");
      }
    }
    formData.delete("image");

    sendDataUser({ data: obj, token, token });
    setShow(true);
    window.localStorage.setItem(
      "userName",
      state.firstName + " " + state.lastName
    );
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  useEffect(() => {
    const obj = {
      firstName: data?.getaUser?.firstname ? data?.getaUser?.firstname : data?.getaUser?.selectedBillingAddress?.firstname,
      lastName: data?.getaUser?.lastname ? data?.getaUser?.lastname : data?.getaUser?.selectedBillingAddress?.lastname,
      email: data?.getaUser?.email ? data?.getaUser?.email : data?.getaUser?.selectedBillingAddress?.email,
      mobile: data?.getaUser?.mobile,
      currency: data?.getaUser?.currency?.name,
      language: data?.getaUser?.language?.name,
      currId: data?.getaUser?.currency?._id,
      languId: data?.getaUser?.language?._id,
      profilePhoto: {
        public_id: "",
        url: data?.getaUser?.profilePhoto?.url,
      },
    };
    window.localStorage.setItem(
      "profilePic",
      data?.getaUser?.profilePhoto?.url
    );
    setState(obj);
  }, [data]);

  const { t, i18n } = useTranslation();

  return (
    <>
      <section className="profilePage sectionPD">
        <div className="container">
          <div className="fisherman-content">
            <h3>{t("Manage Profile")}</h3>
          </div>
          <form className="border rounded p-3">
            <div className="card-header">
              <h4>{t("Basic Info")}</h4>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("Image")}</label>
                  <div>
                    {/* <input
                        
                         
                          placeholder="Image"
                          name="image"
                          autoComplete="off"
                          value={state.image}
                         
                        /> */}
                    <input
                      type="file"
                      name="profilePhoto"
                      className="form-control"
                      onChange={handleChangeImage}
                    />
                    {/* {window.localStorage.getItem("profilePic") && (
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={window.localStorage.getItem("profilePic")}
                      // alt="Profile"
                      />
                    )} */}

                    {state?.profilePhoto && (
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={state?.profilePhoto?.url}
                      // alt="Profile"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("First Name")}</label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John"
                      name="firstName"
                      autoComplete="off"
                      value={state.firstName}
                      onChange={onchengeHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("Last Name")}</label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      autoComplete="off"
                      value={state.lastName}
                      onChange={onchengeHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("email")}</label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Smith"
                      name="email"
                      value={state.email}
                      onChange={onchengeHandle}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("Your Phone")}</label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91-123456789"
                      name="mobile"
                      onChange={onchengeHandle}
                      value={state.mobile}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("Your Language")}</label>
                  <div>
                    <select
                      className="form-select"
                      name="language"
                      id="languId"
                      onChange={onchengeHandle}
                      aria-label="Default select example"
                    >
                      <option selected>
                        {state?.language ? state.language : "Select Language"}
                      </option>
                      {language &&
                        language.map((item) => {
                          if (item.name === state?.language) {
                            return;
                          } else {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            );
                          }
                        })}
                    </select>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-lg-6">
                <div className="form-group mb-3">
                  <label className="col-form-label">{t("Your Currency")}</label>
                  <div>
                    <select
                      className="form-select"
                      name="currency"
                      id="currId"
                      onChange={onchengeHandle}
                      aria-label="Default select example"
                    >
                      <option selected>
                        {state?.currency ? state.currency : "Select Currency"}
                      </option>
                      {currency &&
                        currency.map((item) => {
                          if (item.name === state?.currency) {
                            return;
                          } else {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            );
                          }
                        })}
                    </select>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="form-group mt-3 text-right">
              {show && (
                <div className="alert alert-success" role="alert">
                  Profile Update Successfully!
                </div>
              )}
              <button
                style={{ display: "flex", alignItems: "center" }}
                type="button"
                onClick={sendData}
                className="commonButton"
              >
                {t("Update Profile")}
                {show && (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* <BillingAddres /> */}
        </div>
      </section>
    </>
  );
}

export default Profile;
