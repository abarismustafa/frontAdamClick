import React from "react";
import { Helmet } from "react-helmet";

function CreateShop() {
  return (
    <>
      <Helmet>
        <title>Shop Page | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <section className="createSec p-30">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="registerFormInfo">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="registerTitle">
                      <h4>Register Your Shop</h4>
                      <hr />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="personalInfo">
                      <h5>Personal Info</h5>
                      <form className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="Your name">Your Name</label>
                            <input
                              type="text"
                              placeholder="Name"
                              className="form-control"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="Your Password">Your Password</label>
                            <input
                              type="password"
                              placeholder="Password"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="Your Email">Your Email</label>
                            <input
                              type="email"
                              placeholder="Your Email"
                              className="form-control"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="Repeat Password">
                              Repeat Password
                            </label>
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="personalInfo">
                      <h5>Basic Info</h5>
                      <form className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label htmlFor="Shop Name">Shop Name</label>
                            <input
                              type="text"
                              placeholder="Shop Name"
                              className="form-control"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="Address">Address</label>
                            <textarea
                              name=""
                              id=""
                              cols="10"
                              rows="3"
                              className="form-control"
                              placeholder="Enter Your Address"
                            ></textarea>
                          </div>
                        </div>
                      </form>
                      <button className="btn btn-primary registerShop">
                        Register Your Shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateShop;
