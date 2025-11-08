
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { base_url } from '../../../server'
import Loader from '../../../common/loader/Loader'

const RmaReturnView = () => {
    const params = useParams()
    const [loader, setLoader] = useState(false)
    const token = window.localStorage.getItem("token");
    const [ramaDetailsList, setRamaDetailsList] = useState(null)
    const baseUrl = base_url();
    const getRamaDetails = async (id) => {
        setLoader(true)
        try {
            const res = await axios.get(`${baseUrl}rma/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            })
            setRamaDetailsList(res?.data)
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    }
    useEffect(() => {
        if (params?.id) {
            getRamaDetails(params?.id)
        }
    }, [params?.id])
    return (
        <>
            {loader && <Loader />}
            <div className="container my-5">
                {/* Header */}
                <h2 className="fw-bold mb-4">
                    RMA {ramaDetailsList?.[0]?._id} <span className="text-muted">- {ramaDetailsList?.[0]?.status}</span>
                </h2>

                {/* Progress Bar */}
                {ramaDetailsList?.[0] && (
                    <div
                        className="d-flex justify-content-between align-items-center position-relative mb-5"
                        style={{ maxWidth: "600px", margin: "auto" }}
                    >
                        {["Pending", ramaDetailsList[0].status === "Rejected" ? "Rejected" : "Approved"].map(
                            (step, index) => {
                                const currentStatus = ramaDetailsList[0].status;
                                const isActive =
                                    (currentStatus === "Pending" && index === 0) ||
                                    (currentStatus === "Approved" && index <= 1) ||
                                    (currentStatus === "Rejected" && index <= 1);

                                // Step color (green for approved, red for rejected)
                                const activeColor =
                                    currentStatus === "Rejected" ? "#dc3545" : "#28a745";

                                return (
                                    <div key={index} className="text-center flex-fill position-relative">
                                        {/* Connector line */}
                                        {index < 1 && (
                                            <div
                                                className="position-absolute top-50 start-50 translate-middle-y"
                                                style={{
                                                    width: "100%",
                                                    height: "3px",
                                                    backgroundColor: isActive ? activeColor : "#dee2e6",
                                                    zIndex: 0,
                                                    transition: "background-color 0.3s ease-in-out",
                                                }}
                                            ></div>
                                        )}

                                        {/* Step circle */}
                                        <div
                                            className="rounded-circle border d-inline-flex align-items-center justify-content-center position-relative"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                zIndex: 1,
                                                borderWidth: "3px",
                                                backgroundColor: isActive ? activeColor : "#fff",
                                                color: isActive ? "#fff" : "#6c757d",
                                                borderColor: isActive ? activeColor : "#6c757d",
                                                fontWeight: "600",
                                                transition: "all 0.3s ease-in-out",
                                            }}
                                        >
                                            {index + 1}
                                        </div>

                                        {/* Step label */}
                                        <div
                                            className={`mt-2 fw-semibold ${isActive ? "text-success" : "text-muted"
                                                }`}
                                            style={{
                                                color:
                                                    isActive && currentStatus === "Rejected"
                                                        ? "#dc3545"
                                                        : isActive
                                                            ? "#28a745"
                                                            : "#6c757d",
                                            }}
                                        >
                                            {step}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}

                {/* Request Info */}
                <div className="card shadow-sm mb-4">
                    {ramaDetailsList && ramaDetailsList?.map((item) => {
                        return <div className="card-body row" key={item?._id}>
                            <div className="col-md-6 border-end">
                                <h5 className="fw-bold mb-3">Request Information</h5>
                                <p>
                                    <strong>RMA:</strong> <span className="text-primary">{item?._id}</span>{" "}
                                    <span
                                        className={`badge text-white ${item?.status === "Pending"
                                            ? "bg-warning"
                                            : item?.status === "Approved"
                                                ? "bg-success"
                                                : item?.status === "Rejected"
                                                    ? "bg-danger"
                                                    : "bg-secondary"
                                            }`}

                                    >
                                        {item?.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Order: </strong>{" "}
                                    <a href="#" className="text-decoration-none">
                                        {item?.orderId?.order_referenceNo}
                                    </a>{" "}
                                    <span className="text-muted">  {new Date(item?.orderId?.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</span>
                                </p>
                                <p>
                                    <strong>Date Requested:</strong> {new Date(item?.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <h5 className="fw-bold mb-3">Return Address</h5>
                                <p className="mb-0">
                                    {item?.returnPickupAddress?.addressLine1} <br />
                                    {item?.returnPickupAddress?.city} {item?.returnPickupAddress?.state} {item?.returnPickupAddress?.country}<br />
                                    {item?.returnPickupAddress?.zip} <br />
                                    <a
                                        // href="tel:+13218439792"
                                        href='#'
                                        className="text-decoration-none">
                                        {item?.returnPickupAddress?.phone}
                                    </a>
                                </p>
                            </div>
                        </div>
                    })}

                </div>

                {/* RMA Items */}
                <h5 className="fw-bold mb-3">RMA Items</h5>
                <div className="table-responsive mb-5">
                    <table className="table align-middle table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Order</th>
                                <th>Qty</th>
                                <th>Reason</th>
                                {/* <th>Condition</th> */}
                                <th>Resolution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ramaDetailsList && ramaDetailsList?.map((item) => {
                                return <tr key={item?._id}>

                                    <td className="d-flex align-items-center">
                                        <img
                                            src={item?.variant_id?.mainImage_url?.url}
                                            alt="product"
                                            width="50"
                                            className="me-3 rounded"
                                        />
                                        {item?.product_id?.name?.length > 40
                                            ? item?.product_id?.name.slice(0, 40) + "..."
                                            : item?.product_id?.name}
                                    </td>
                                    <td>{item?.orderId?.products[0]?.sku}</td>
                                    <td>
                                        <a href="#" className="text-decoration-none">
                                            {item?.orderId?.order_referenceNo}
                                        </a>
                                    </td>
                                    <td>{item?.orderId?.products[0]?.qty}</td>
                                    <td>{item?.reason[0]?.reason}</td>
                                    {/* <td>Opened</td> */}
                                    <td>
                                        {item?.resulution_type}
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>

                {/* Message + History */}
                <div className="row g-4">
                    {/* Add Message */}
                    <div className="col-md-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Add Message</h5>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter your message here..."
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Attach files</label>
                                    <input type="file" className="form-control" />
                                    <small className="text-muted">Max file size: 2MB</small>
                                </div>
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>

                    {/* RMA History */}
                    <div className="col-md-7">
                        <div className="card shadow-sm">
                            <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                <h5 className="fw-bold mb-3">RMA History</h5>

                                <div className="mb-3">
                                    <div className="bg-light p-3 rounded border">
                                        <strong>Veronica Costello</strong>{" "}
                                        <span className="text-muted float-end">Oct 29, 2025 7:37 PM</span>
                                        <p className="mb-0 mt-2">What should I do next?</p>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="bg-info bg-opacity-25 p-3 rounded border">
                                        <strong>Katie Couris</strong>{" "}
                                        <span className="text-muted float-end">Oct 29, 2025 7:18 PM</span>
                                        <p className="mb-0 mt-2">
                                            Your return request has been received. You will be notified when your request is reviewed.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-success bg-opacity-25 p-3 rounded border">
                                        <strong>Veronica Costello</strong>{" "}
                                        <span className="text-muted float-end">Oct 29, 2025 7:16 PM</span>
                                        <p className="mb-0 mt-2">
                                            Hi! I need to exchange the jacket I bought a week ago in your store. The color is beautiful, but when
                                            I tried it on, I realized it made me look pale-faced and unhealthy. So I don’t really like the jacket
                                            because its color doesn’t fit me. Please, exchange it for the Blue one.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RmaReturnView