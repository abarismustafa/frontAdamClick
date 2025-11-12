import React, { useEffect, useState } from "react";
import Rating from "../../../../shared/rating/Rating";
import ReviewForm from "../review-form/ReviewForm";
import { MdVerifiedUser } from "react-icons/md";
import "./Review.css";
import { Link, useParams } from "react-router-dom";
import {
  useFilterReviewbyRateMutation,
  useGetReviewsQuery,
} from "../../../products/productSlice";
import axios from "axios";
import { base_url } from "../../../../server";
import LoginAllPage from "../../../../common/loginAllPage/LoginAllPage";
function Review({ ids, dataproduct }) {
  // console.log(dataproduct);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [show, setShow] = useState(false);
  const params = useParams();
  // const { data, isLoading } = useGetReviewsQuery({ proid: params._id, variant_id:ids })

  const [data, setData] = useState();
  const baseUrl = base_url();
  const getReview = async (uid) => {
    try {
      const res = await axios.get(`${baseUrl}rating/product/${ids}/${uid}`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [filterdReview, { data: filterData, isSuccess }] =
    useFilterReviewbyRateMutation();

  const filterdData = (num) => {
    filterdReview({ product_id: params._id, rating: num.target.value });
  };

  useEffect(() => {
    if (dataproduct?.variations[0]?.uid) {
      getReview(dataproduct?.variations[0]?.uid);
    }

  }, [dataproduct?.variations[0]?.uid]);

  useEffect(() => {
    if (isSuccess) {
      setData(filterData);
    }
  }, [isSuccess]);

  const resviewDev = () => {
    const isLogin = window.localStorage.getItem("isLogin") === "true";

    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    setShow(!show)
  }


  // console.log(dataproduct);

  return (
    <>
      <section className="reviewSec sectionPD bgGray">
        <div className="container">
          {/* {isLoading && <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>} */}
          <div className="row">
            <div className="col-lg-4">
              <aside className="customerReviewSidebar">
                <h4>Customer Review</h4>
                <div className="reviewInfo">
                  <div className="reviewNumber">
                    <span>4.5</span>
                  </div>
                  <div className="reviewText">
                    <Rating />
                    <p>Based on 13k reviews</p>
                  </div>
                </div>
                <div className="percentRating">
                  <div className="itemSortingReviews">
                    <span className="number">5</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: 100 + "%" }}
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <strong className="ratingPercent">100%</strong>
                    <span className="TotalRating">(343)</span>
                  </div>
                  <div className="itemSortingReviews">
                    <span className="number">4</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: 75 + "%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <strong className="ratingPercent">75%</strong>
                    <span className="TotalRating">(230)</span>
                  </div>
                  <div className="itemSortingReviews">
                    <span className="number">3</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: 50 + "%" }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <strong className="ratingPercent">50%</strong>
                    <span className="TotalRating">(178)</span>
                  </div>
                  <div className="itemSortingReviews">
                    <span className="number">2</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: 25 + "%" }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <strong className="ratingPercent">25%</strong>
                    <span className="TotalRating">(78)</span>
                  </div>
                  <div className="itemSortingReviews">
                    <span className="number">1</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-secondary"
                        role="progressbar"
                        style={{ width: 14 + "%" }}
                        aria-valuenow="14"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <strong className="ratingPercent">14%</strong>
                    <span className="TotalRating">(33)</span>
                  </div>
                </div>
                <div className="submitReview">
                  <button
                    type="button"
                    className="commonButton"
                    // onClick={() => setShow(!show)}
                    onClick={resviewDev}
                  >
                    Write a Review
                  </button>
                  {show && (
                    <ReviewForm getReview={getReview} setShow={setShow} dataproduct={dataproduct} />
                  )}
                </div>
              </aside>
            </div>
            <div className="col-lg-8">
              <div className="reviewContentDetail">
                <div className="filterReview">
                  <h5>Top Highlight Reviews</h5>
                  <div className="filterBox collectionFilterSort ">
                    <select onChange={filterdData}>
                      <option value="0">Filter</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>

                    {/* <select>
                      <option defaultValue="id">Sort By</option>{" "}
                      <option defaultValue="review_rating_highest">
                        Highest Rating
                      </option>{" "}
                      <option defaultValue="review_rating_lowest">
                        Lowest Rating
                      </option>{" "}
                      <option defaultValue="newest">Newest</option>{" "}
                      <option defaultValue="oldest">Oldest</option>
                    </select> */}
                  </div>
                </div>
                <div className="reviewContentSec">
                  {data &&
                    data?.map((item) => {
                      return (
                        <div key={item._id} className="reviewContent">
                          <div className="ratingPart d-flex align-items-center">
                            {/* <Rating /> */}
                            Rating:
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                style={{
                                  color: star <= item.rating ? "#ffc107" : "#e4e5e9",
                                  fontSize: "18px",
                                  marginRight: "2px",
                                }}
                              >
                                ★
                              </span>
                            ))}
                            {/* <strong style={{ marginLeft: "7px" }}>
                              Rating : {item.rating}
                            </strong> */}
                          </div>
                          <div className="customerName">
                            <div className="verified">
                              <MdVerifiedUser />
                            </div>
                            <div className="customerInfo">
                              <h5>{item.name}</h5>
                              <p>Confirmed</p>
                            </div>
                          </div>
                          <div className="customerDesc">
                            <p>{item?.title}</p>
                            <p>{item?.comments}</p>
                          </div>
                          <div className="reviewDate">
                            <p> {new Date(item.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default Review;
