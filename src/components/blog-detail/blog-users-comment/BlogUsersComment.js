import React, { useEffect } from "react";
import blog1 from "../../../assets/img/product-detail/fertilizer-application1.jpg";
import blog2 from "../../../assets/img/product-detail/fertilizer-application-bg1.jpg";
import { Link, useParams } from "react-router-dom";
import { useGetRevireBlogQuery, useSendLinkeMutation } from "../../products/productSlice";

function BlogUsersComment({ reviewData, resviewCommet }) {
  const params = useParams()
  const [sendLink, { isLoading, isSuccess }] = useSendLinkeMutation()

  const SendLinke = (id) => {
    sendLink(id)
  }

  // console.log(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      alert("Like successful")
      resviewCommet()
    }
  }, [isSuccess])


  return (
    <>
      <div className="blogComment p-30">
        <div className="comment-option">
          <h4>{reviewData?.length} Comments</h4>
          {isLoading && <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}

          {reviewData && reviewData?.map((item) => {
            console.log(item);

            return <div className="single-comment-item first-comment" key={item._id}>
              {item?.user_id?.profilePhoto?.url &&
                <div className="sc-author">
                  <img src={item?.user_id?.profilePhoto?.url} alt="Blog" className="img-fluid" />
                </div>
              }
              <div className="sc-text">
                <span>  {new Date(item?.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
                <h5>{item.name}</h5>
                <p>
                  {item.review}
                </p>
                {/* <button className={`comment-btn ${item.like_count === 1 && 'activeLike'}`} onClick={() => SendLinke(item._id)}>
                  Like
                </button> */}
                {/* <Link to="/" className="comment-btn">
                  Reply
                </Link> */}
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  );
}

export default BlogUsersComment;
