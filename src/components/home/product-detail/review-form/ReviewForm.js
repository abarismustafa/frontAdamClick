import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import { useReviewProductMutation } from "../../../products/productSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../../../server";
import { FaStar } from "react-icons/fa";
import { toastSuccessMessage, toastSuccessMessageError } from "../../../../common/messageShow/MessageShow";
function ReviewForm({ setShow, getReview, dataproduct }) {
  const [sendReview, { data, isError, isSuccess }] = useReviewProductMutation();
  const params = useParams();
  console.log(params);


  const [state, setState] = useState({
    name: window.localStorage.getItem("userName"),
    email: "",
    title: "",
    rating: 5,
    comments: "",
    variant_id: "",
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

      toastSuccessMessage("Review added Successfully")
      // alert("Review added Successfully");
      getReview(state?.variant_id);
      setShow(false);
    } catch (error) {
      // alert("Somthing Went Wrong Review not added");
      // console.log(error);
      toastSuccessMessageError(error?.response?.data?.message)
    }
  };

  const handleStarClick = (value) => {
    setState({ ...state, rating: value });
  }

  useEffect(() => {
    if (dataproduct?.variations?.[0]?.uid) {
      setState((prev) => ({
        ...prev,
        variant_id: dataproduct.variations[0].uid,
      }));
    }
  }, [dataproduct]);

  return (
    <>
      <form className="reviewForm mt-3">
        <div className="row">
          <div className="col-lg-12 col-md-6">
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
          {/* <div className="col-lg-6 col-md-6">
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
          </div> */}

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
          {/* <div className="col-lg-12 col-md-12">
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
          </div> */}
          <div className="col-lg-12 col-md-12">
            <div className="form-group star-ratingstar d-flex gap-1 align-center justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= state.rating ? "selected" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  {/* ★ */}
                  <FaStar />
                </span>
              ))}
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
