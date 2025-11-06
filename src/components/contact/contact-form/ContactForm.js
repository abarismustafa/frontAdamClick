import React, { useState } from "react";
import { useContactMessageMutation } from "../../products/productSlice";

function ContactForm({ t }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [sendDataContact, { isLoading }] = useContactMessageMutation();

  const chengehandle = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };

  const sendData = () => {
    sendDataContact(state);
    setState({
      name: "",
      email: "",
      message: "",
      phone: "",
    });
  };
  return (
    <>
      <div className="contactForm ">
        {isLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="fisherman-content">
          <h3>{t("Send Us a Message")}</h3>
        </div>
        <form className="bgGray p-4 rounded" action="#">
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="contact-name">
              {t("Your Name")}
            </label>
            <input
              type="text"
              className="form-control"
              id="contact-name"
              name="name"
              onChange={chengehandle}
              value={state.name}
              required
              placeholder={t("Your Name")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="contact-email">
              {t("Your E-mail")}
            </label>
            <input
              type="email"
              className="form-control"
              id="contact-email"
              name="email"
              onChange={chengehandle}
              value={state.email}
              required
              placeholder={t("Your E-mail")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="contact-email">
              {t("Phone Number")}
            </label>
            <input
              type="number"
              className="form-control"
              id="contact-email"
              name="phone"
              onChange={chengehandle}
              value={state.phone}
              required
              placeholder={t("Phone Number")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="contact-message">
              {t("Your Message")}
            </label>
            <textarea
              cols={30}
              rows={4}
              id="contact-message"
              className="form-control"
              name="message"
              required
              onChange={chengehandle}
              value={state.message}
              defaultValue={""}
              placeholder={t("Your Message")}
            />
          </div>
          <div className="form-footer mb-0">
            <button
              type="button"
              className="btn btn-dark font-weight-normal"
              onClick={sendData}
              disabled={!state.email || !state.name || !state.message}
            >
              {t("Send Message")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
