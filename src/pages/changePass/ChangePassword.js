import axios from "axios";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaKey } from "react-icons/fa";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const idUser = window.localStorage.getItem("user_id");
  const [storeValue, setStoreValue] = useState({
    userid: idUser,
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandelVal = (e) => {
    const clone = { ...storeValue };
    clone[e.target.name] = e.target.value;
    setStoreValue(clone);
  };

  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [issusess, setissuss] = useState(false);
  const [errmsg, seterrmsg] = useState(null);
  const baseUrl = base_url();
  const sendData = async () => {
    setIsloading(true);
    try {
      const res = await axios.put(`${baseUrl}user/password`, storeValue);
      setIsloading(false);
      setissuss(true);
      setIserror(false);
    } catch (error) {
      seterrmsg(error.response.data.message);
      setIsloading(false);
      setIserror(true);
    }
  };
    const { t, i18n } = useTranslation();

  return (
    <section className="sectionPD">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fisherman-content">
              <h3>
                <FaKey /> {t("Change Password")}
              </h3>
            </div>
            <div className="border rounded p-4">
              <div className="form-group">
                <label>{t("Old Password")} </label>
                <input
                  onChange={changeHandelVal}
                  name="oldPassword"
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>{t("New Password")} </label>
                <input
                  onChange={changeHandelVal}
                  name="password"
                  className="form-control"
                  type="password"
                />
              </div>
              <div className="form-group">
                <label>{t("Confirm New Password")}</label>
                <input
                  onChange={changeHandelVal}
                  placeholder={t("Confirm New Password")}
                  name="confirmPassword"
                  className="form-control"
                  type="password"
                />
              </div>
              {iserror && (
                <h5 style={{ color: "red" }}>{errmsg} Password Not Change !</h5>
              )}
              {issusess && (
                <h5 style={{ color: "green" }}>Password Change Successfully</h5>
              )}
              <button
                onClick={sendData}
                className="commonButton"
              >
                {isloading && <Spinner animation="border" />} {t("Change Password")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ChangePassword;
