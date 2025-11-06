import { useState } from "react";
import { Form, Modal } from "react-bootstrap";

function ManegeProile() {
  const [show, setShow] = useState(false);

  const handleClose4 = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="aiz-user-panel">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3">Manage Profile</h1>
            </div>
          </div>
        </div>
        <form
          action="https://mmslfashions.in/user/update-profile"
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="hidden"
            name="_token"
            defaultValue="sB8aPYBcqhOnp7P2UogQBrENgojfhDfxAjE2FkBq"
          />{" "}
          {/* Basic Info*/}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 h6">Basic Info</h5>
            </div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Your name</label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    name="name"
                    defaultValue="Azharuddin Shamim"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Your Phone</label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Phone"
                    name="phone"
                    defaultValue="+91-8920073535"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Photo</label>
                <div className="col-md-10">
                  <div
                    className="input-group"
                    data-toggle="aizuploader"
                    data-type="image"
                  >
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-soft-secondary font-weight-medium">
                        Browse
                      </div>
                    </div>
                    <div className="form-control file-amount">Choose File</div>
                    <input
                      type="hidden"
                      name="photo"
                      defaultValue
                      className="selected-files"
                    />
                  </div>
                  <div className="file-preview box sm"></div>

                  


                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Your Password</label>
                <div className="col-md-10">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="new_password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">
                  Confirm Password
                </label>
                <div className="col-md-10">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirm_password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-0 text-right">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
        <br />
        {/* Address */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Address</h5>
          </div>
          <div className="card-body">
            <div className="row gutters-10">
              <div className="col-lg-6">
                <div className="border p-3 pr-5 rounded mb-3 position-relative">
                  <div>
                    <span className="w-50 fw-600">Address:</span>
                    <span className="ml-2">Gali No. 21, Zakir Nagar,</span>
                  </div>
                  <div>
                    <span className="w-50 fw-600">Postal code:</span>
                    <span className="ml-2">110025</span>
                  </div>
                  <div>
                    <span className="w-50 fw-600">City:</span>
                    <span className="ml-2">New Delhi</span>
                  </div>
                  <div>
                    <span className="w-50 fw-600">State:</span>
                    <span className="ml-2">Delhi</span>
                  </div>
                  <div>
                    <span className="w-50 fw-600">Country:</span>
                    <span className="ml-2">India</span>
                  </div>
                  <div>
                    <span className="w-50 fw-600">Phone:</span>
                    <span className="ml-2">08851746286</span>
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
                      <a className="dropdown-item" onclick="edit_address('1')">
                        Edit
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://mmslfashions.in/addresses/set_default/1"
                      >
                        Make This Default
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://mmslfashions.in/addresses/destroy/1"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mx-auto" onClick={handleShow}>
                <div className="border p-3 rounded mb-3 c-pointer text-center bg-light">
                  <i className="la la-plus la-2x" />
                  <div className="alpha-7">Add New Address</div>
                </div>
              </div>
              <Modal className="modle-manage" show={show} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title>New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="p-3 p-3-3">
                    <div className="row">
                      <div className="col-md-2">
                        <label>Address</label>
                      </div>
                      <div className="col-md-10">
                        <textarea
                          className="form-control mb-3"
                          placeholder="Your Address"
                          rows={2}
                          name="address"
                          required
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <label>Country</label>
                      </div>
                      <div className="col-md-10">
                        <div className="mb-3">
                          <select
                            className="form-select form-control aiz-selectpicker"
                            aria-label="Default select example"
                          >
                            <option selected>Select your country</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>Saudi Arabia</option>
                            <option>Zambia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <label>State</label>
                      </div>
                      <div className="col-md-10 mb-3">
                       
                          
                        <select
                            className="form-select form-control aiz-selectpicker"
                            aria-label="Default select example"
                          >
                            <option selected>Select your state</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>Saudi Arabia</option>
                            <option>Zambia</option>
                          </select>
                        
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <label>City</label>
                      </div>
                      <div className="col-md-10 mb-3">
                      <select
                            className="form-select form-control aiz-selectpicker"
                            aria-label="Default select example"
                          >
                            <option selected>Select your state</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>Saudi Arabia</option>
                            <option>Zambia</option>
                          </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <label>Postal code</label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Your Postal Code"
                          name="postal_code"
                          defaultValue
                          required
                          fdprocessedid="dif5"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder={+880}
                          name="phone"
                          defaultValue
                          required
                          fdprocessedid="6co9k"
                        />
                      </div>
                    </div>
                    <div className="form-group text-right">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        fdprocessedid="t3o4q"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        {/* Change Email */}
        <form action="https://mmslfashions.in/new-user-email" method="POST">
          <input
            type="hidden"
            name="_token"
            defaultValue="sB8aPYBcqhOnp7P2UogQBrENgojfhDfxAjE2FkBq"
          />{" "}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 h6">Change your email</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <label>Your Email</label>
                </div>
                <div className="col-md-10">
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      name="email"
                      defaultValue="abarissolution@gmail.com"
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary new-email-verification"
                      >
                        <span className="d-none loading">
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Sending Email...
                        </span>
                        <span className="default">Verify</span>
                      </button>
                    </div>
                  </div>
                  <div className="form-group mb-0 text-right">
                    <button type="submit" className="btn btn-primary">
                      Update Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default ManegeProile;
