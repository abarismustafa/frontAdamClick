import React, { useEffect, useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { useSendCommentBlogsMutation } from "../../products/productSlice";
import { t } from "i18next";
import LoginAllPage from "../../../common/loginAllPage/LoginAllPage";

function BlogCommentForm({ data, resviewCommet }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendComment, { isLoading, isSuccess }] = useSendCommentBlogsMutation();
  // console.log(isSuccess);

  const params = useParams();
  const [state, setState] = useState({
    blog_Id: data && data._id,
    user_id: window.localStorage.getItem("user_id"),
    name: "",
    review: "",
    url: "",
  });

  const onchangeHandle = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };

  const sendData = () => {
    const isLogin = window.localStorage.getItem('isLogin') === 'true';

    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    sendComment(state);
    setState({
      blog_Id: data && data?._id,
      user_id: window.localStorage.getItem("user_id"),
      name: "",
      review: "",
      url: "",
    });
  };

  useEffect(() => {
    setState({
      blog_Id: data && data._id,
      user_id: window.localStorage.getItem("user_id"),
      name: "",
      review: "",
      url: "",
    })
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      resviewCommet()
      alert("Comment added successful")
    }
  }, [isSuccess])

  return (
    <>
      <div className="blogFormSec">
        <h4>{t("Leave a Reply")}</h4>
        <div className="blogFormInfo">
          <p>
            {t("leaveText")}
          </p>

          {isLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <form className="mb-3">
            <div className="form-group mb-3">
              <label htmlFor="comment">{t("Comment")}</label>
              <textarea
                type="text"
                placeholder={t("Enter Your Comment")}
                className="form-control"
                rows="4"
                name="review"
                value={state.review}
                onChange={onchangeHandle}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="name">{t("Name")}</label>
              <input
                type="text"
                placeholder={t("Enter Your Name")}
                className="form-control"
                name="name"
                value={state.name}
                onChange={onchangeHandle}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="website">{t("Website")}</label>
              <input
                type="url"
                placeholder={t("Enter Website URL")}
                className="form-control"
                name="url"
                value={state.url}
                onChange={onchangeHandle}
              />
            </div>

            <div className="form-group mb-3">
              <button
                className="commonButton"
                type="button"
                onClick={sendData}
              >

                {t("post comment")}
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default BlogCommentForm;
