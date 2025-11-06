import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import { useReviewProductMutation } from "../../../products/productSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../../../server";
function ReviewForm({ setShow, getReview }) {
  const [sendReview, { data, isError, isSuccess }] = useReviewProductMutation();
  const params = useParams();

  const [state, setState] = useState({
    name: window.localStorage.getItem("userName"),
    email: window.localStorage.getItem("email"),
    title: "",
    rating: "",
    comments: "",
    product_id: params._id,
    userid: window.localStorage.getItem("user_id"),
  });

  const onchegeHandle = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };
  const baseUrl = base_url();
  const sendData = async () => {
    try {
      const res = await axios.post(`${baseUrl}rating/add_Rating`, state, {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      alert("Review added Successfully");
      getReview();
      setShow(false);
    } catch (error) {
      alert("Somthing Went Wrong Review not added");
    }
  };

  return (
    <>
      <form className="reviewForm mt-3">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={onchegeHandle}
                placeholder="Enter your name"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={onchegeHandle}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                id="title"
                name="title"
                value={state.title}
                onChange={onchegeHandle}
                placeholder="Enter your review a title"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <input
                type="number"
                id="review-title"
                name="rating"
                value={state.rating}
                onChange={onchegeHandle}
                placeholder="Enter review-number"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <textarea
                name="comments"
                id="review-body"
                cols="30"
                rows="7"
                value={state.comments}
                onChange={onchegeHandle}
                placeholder="Write your comments here"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="submitReview">
              <button type="button" className="commonButton" onClick={sendData}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
