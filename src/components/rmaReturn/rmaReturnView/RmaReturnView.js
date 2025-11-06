
import React from 'react'

const RmaReturnView = () => {
    return (
        <div className="container my-5">
            {/* Header */}
            <h2 className="fw-bold mb-4">
                RMA #10000005 <span className="text-muted">- Pending Approval</span>
            </h2>

            {/* Progress Bar */}
            <div className="d-flex justify-content-between align-items-center position-relative mb-5" style={{ maxWidth: "900px", margin: "auto" }}>
                {["Pending Approval", "Approved", "Package Sent", "Closed"].map((step, index) => (
                    <div key={index} className="text-center flex-fill position-relative">
                        {/* Connector line */}
                        {index < 3 && (
                            <div
                                className={`position-absolute top-50 start-50 translate-middle-y`}
                                style={{
                                    width: "100%",
                                    height: "2px",
                                    backgroundColor: index === 0 ? "#ffc107" : "#adb5bd",
                                    zIndex: 0,
                                }}
                            ></div>
                        )}

                        {/* Step circle */}
                        <div
                            className={`rounded-circle border d-inline-flex align-items-center justify-content-center position-relative`}
                            style={{
                                width: "40px",
                                height: "40px",
                                zIndex: 1,
                                borderWidth: "3px",
                                backgroundColor: index === 0 ? "#ffc107" : "#fff",
                                color: index === 0 ? "#fff" : "#6c757d",
                                borderColor: index === 0 ? "#ffc107" : "#6c757d",
                                fontWeight: "600",
                            }}
                        >
                            {index + 1}
                        </div>

                        {/* Step label */}
                        <div className="mt-2 fw-semibold text-dark">{step}</div>
                    </div>
                ))}
            </div>

            {/* Request Info */}
            <div className="card shadow-sm mb-4">
                <div className="card-body row">
                    <div className="col-md-6 border-end">
                        <h5 className="fw-bold mb-3">Request Information</h5>
                        <p>
                            <strong>RMA:</strong> <span className="text-primary">#10000005</span>{" "}
                            <span className="badge bg-warning text-dark">Pending Approval</span>
                        </p>
                        <p>
                            <strong>Order:</strong>{" "}
                            <a href="#" className="text-decoration-none">
                                #000000007
                            </a>{" "}
                            <span className="text-muted">@ Oct 30, 2025 ($84.28)</span>
                        </p>
                        <p>
                            <strong>Date Requested:</strong> Oct 29, 2025
                        </p>
                    </div>

                    <div className="col-md-6">
                        <h5 className="fw-bold mb-3">Return Address</h5>
                        <p className="mb-0">
                            Winnie Palmer Hospital <br />
                            83 West Miller Street <br />
                            Orlando, FL 32806 <br />
                            <a href="tel:+13218439792" className="text-decoration-none">
                                (321) 843-9792
                            </a>
                        </p>
                    </div>
                </div>
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
                            <th>Condition</th>
                            <th>Resolution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="d-flex align-items-center">
                                <img
                                    src="https://m.media-amazon.com/images/I/61R4HkZPgrL._AC_UL320_.jpg"
                                    alt="product"
                                    width="50"
                                    className="me-3 rounded"
                                />
                                Jade Yoga Jacket-M-Blue
                            </td>
                            <td>WJ09-M-Blue</td>
                            <td>
                                <a href="#" className="text-decoration-none">
                                    #000000007
                                </a>
                            </td>
                            <td>1</td>
                            <td>Don't like</td>
                            <td>Opened</td>
                            <td>
                                <button className="btn btn-primary btn-sm">Exchange</button>
                            </td>
                        </tr>
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
    )
}

export default RmaReturnView