
import React, { useEffect, useState } from 'react'
import { base_url } from '../../../server';
import axios from 'axios';
import { Select } from 'antd';
import { ToastContainer } from 'react-toastify';
import { toastSuccessMessage, toastSuccessMessageError } from '../../../common/messageShow/MessageShow';
import { useParams } from 'react-router-dom';
const { Option } = Select;
const CraeteRmaReturm = () => {
    const params = useParams()
    console.log(params);

    const orders = [
        { id: "#00000003", date: "Oct 30, 2025", total: "$43.77" },
        { id: "#00000007", date: "Oct 30, 2025", total: "$84.28" },
        { id: "#00000008", date: "Oct 30, 2025", total: "$171.14" },
        { id: "#00000009", date: "Oct 30, 2025", total: "$224.59" },
        { id: "#00000010", date: "Oct 30, 2025", total: "$164.88" },
    ];

    const [initialValue, setInitialValue] = useState({
        orderId: "",
        variant_id: [],
        resulution_type: "",
        reason: '',
        // userid: ''
    })


    const [orderCombo, setOrderCombo] = useState([])
    const baseUrl = base_url();
    const token = window.localStorage.getItem("token");



    const [selectedOrder, setSelectedOrder] = useState("");
    const [appliedOrders, setAppliedOrders] = useState([]);
    // console.log(appliedOrders);


    const getOrder = async () => {
        try {
            const res = await axios.get(`${baseUrl}order/getorderbyuser`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(res?.data);
            setOrderCombo(res?.data || []);
        } catch (error) {

        }
    }

    const deatilsApi = async (id) => {
        try {
            const res = await axios.get(`${baseUrl}order/getOrderById/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppliedOrders(res?.data);
            setInitialValue((prev) => ({ ...prev, orderId: id }));
            // setAppliedOrders((prev) => {
            //     const alreadyExists = prev.find((o) => o._id === res.data._id);
            //     if (alreadyExists) return prev;
            //     return [...prev, res.data]; // naya order add karo
            // });

        } catch (error) {

        }
    }




    // console.log('selectedOrder', selectedOrder);


    const handleApply = () => {
        if (selectedOrder) {
            deatilsApi(selectedOrder);
            setSelectedOrder("");
        }
    };

    useEffect(() => {
        if (params?.id) {
            deatilsApi(params?.id)
        }

    }, [params?.id])

    const handleRemove = (id) => {
        setAppliedOrders((prev) => prev.filter((o) => o._id !== id));
    };


    const handleCheckboxChange = (variationId, checked) => {
        setInitialValue((prev) => {
            let updatedVariants = [...prev.variant_id];
            if (checked) {
                // add variation id
                updatedVariants.push(variationId);
            } else {
                // remove variation id
                updatedVariants = updatedVariants.filter((id) => id !== variationId);
            }
            return { ...prev, variant_id: updatedVariants };
        });
    };

    const handleSelectAll = (order) => {
        const allIds = order?.products?.map(
            (item) => item?.productId?.variations?._id
        );
        setInitialValue((prev) => ({ ...prev, variant_id: allIds }));
    };

    const changeHandle = (e) => {
        const { name, value } = e.target;
        setInitialValue((prev) => ({ ...prev, [name]: value }));
    };

    const submitData = async () => {
        // console.log("Submit Payload:", initialValue);
        if (!initialValue.variant_id.length) {
            toastSuccessMessageError("Please select at least one product variant!");
            return;
        }

        if (!initialValue.resulution_type) {
            toastSuccessMessageError("Please select a resolution type!");
            return;
        }

        if (!initialValue.reason.trim()) {
            toastSuccessMessageError("Please enter a reason for your request!");
            return;
        }
        try {
            const res = await axios.post(`${baseUrl}rma/requestRMA`, initialValue, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            // if (res?.status == ) {

            // }
            toastSuccessMessage(res?.data?.message || "RMA Request submitted successfully!");
        } catch (error) {
            toastSuccessMessageError(
                error?.response?.data?.message || "Something went wrong, please try again!"
            );
        }
    };

    const [reasons, setReasons] = useState(null);
    const getData = async () => {
        try {
            const res = await axios.get(`${baseUrl}cancelReason`);
            setReasons(res.data);
        } catch (error) {
            alert("Somthing Wend Wrong");
        }
    };

    // useEffect(() => {
    //     getData();
    // }, []);


    useEffect(() => {
        getData();
        getOrder()
    }, [])
    return (
        <div className="container my-5">
            <h2 className="fw-bold mb-4 text-dark">Create RMA</h2>

            {/* Select Order Section */}
            {/* <div className="card shadow-sm mb-4 border-0">
                <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <label className="fw-semibold me-2 mb-0">
                            Please, select an order
                        </label>
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Select an Order"
                            value={selectedOrder}
                            onChange={(value) => setSelectedOrder(value)}
                            optionLabelProp="label"
                        >
                            {orderCombo?.map((order) =>
                                order?.productDetails?.map((details) =>
                                    details?.matchedVariation?.map((variation) => {
                                        const shortName =
                                            details?.name?.length > 30
                                                ? details?.name.slice(0, 27) + "..."
                                                : details?.name;

                                        return (
                                            <Option
                                                key={variation?._id || `${order?._id}-${details?.name}`}
                                                value={order?._id}
                                                label={`${shortName} ${variation?.variant_slug || ""} ${order?.grandTotal}`}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    <img
                                                        src={variation?.mainImage_url?.url}
                                                        alt=""
                                                        style={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: 6,
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <span style={{ fontSize: "14px" }}>
                                                        {shortName}{" "}
                                                        {variation?.variant_slug && (
                                                            <span style={{ color: "#888" }}>
                                                                ({variation?.variant_slug})
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span>{order?.grandTotal}</span>
                                                </div>
                                            </Option>
                                        );
                                    })
                                )
                            )}
                        </Select>
                      
                        <button
                            className="btn btn-primary"
                            onClick={handleApply}
                            disabled={!selectedOrder}
                        >
                            Apply
                        </button>
                        
                    </div>
                </div>
            </div> */}

            {/* Applied Orders */}
            {appliedOrders?.map((order, index) => (
                <div key={order._id} className="card mb-4 shadow-sm">
                    {/* <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            Order #{index + 1} - {order?.order_referenceNo}
                        </h5>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRemove(order._id)}
                        >
                            Remove
                        </button>
                    </div> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleSelectAll(order)}
                                            />{" "}
                                            Select All
                                        </th>
                                        <th>image / Product Name</th>
                                        <th>Variant</th>
                                        <th>Quantity</th>
                                        <th>Sale Rate</th>
                                        <th>Sub Total</th>
                                        <th>IGST</th>
                                        <th>SGST</th>
                                        <th>CGST</th>
                                        <th>Total</th>
                                        <th>Delivery Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.products?.map((item, idx) => {
                                        const variationId = item?.productId?.variations?._id;
                                        return (<tr key={item._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={initialValue.variant_id.includes(
                                                        variationId
                                                    )}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(variationId, e.target.checked)
                                                    }
                                                />
                                            </td>
                                            <td className='d-flex item-center'>
                                                <img style={{ width: '150px' }} src={item?.productId?.mainImage_url?.url || "/no-image.jpg"} alt="" />
                                                {item?.productId?.name}
                                            </td>
                                            <td>{item?.productId?.variations?.weight}</td>
                                            <td>{item?.qty}</td>
                                            <td>{item?.price?.sale_rate}</td>
                                            <td>{item?.subTotal}</td>
                                            <td>{item?.igst}</td>
                                            <td>{item?.sgst}</td>
                                            <td>{item?.cgst}</td>
                                            <td>{item?.total}</td>
                                            <td>{item?.deliveryType}</td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Grand Total Card */}
                        <div className="border rounded p-3 bg-light mt-3" style={{ width: "300px", marginLeft: "auto" }}>
                            <h6 className="fw-bold mb-3">Price Details</h6>
                            <p className="d-flex justify-content-between mb-1">
                                <span>Base Price</span> <span>{order?.basePrice?.toFixed(2)}</span>
                            </p>
                            {/* <p className="d-flex justify-content-between mb-1">
                                <span>Discount</span> <span>{order?.discount}</span>
                            </p> */}
                            <p className="d-flex justify-content-between mb-1">
                                <span>Tax</span> <span>{order?.tax}</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between fw-bold">
                                <span>Grand Total</span> <span>{order?.grandTotal}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom Form */}
            {appliedOrders.length > 0 && (
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <form>
                            {/* <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="prepaidLabel"
                                />
                                <label
                                    htmlFor="prepaidLabel"
                                    className="form-check-label fw-semibold"
                                >
                                    Provide a Prepaid Return Label
                                </label>
                                <div className="form-text">example of custom field</div>
                            </div> */}

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Resulution Type <span style={{ color: 'red' }}>*</span>
                                </label>
                                <select className="form-select" aria-label="Default select example" name='resulution_type' value={initialValue?.resulution_type} onChange={changeHandle}>
                                    <option selected>Open this select menu</option>
                                    <option value={"Refund"}>Refund</option>
                                    <option value={"Replacement"}>Replacement</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold" >
                                    Reason <span style={{ color: 'red' }}>*</span>
                                </label>
                                {/* <textarea className="form-control" rows="3" name='reason' value={initialValue?.reason} onChange={changeHandle}></textarea> */}
                                <select className="form-select" aria-label="Default select example" name='reason' value={initialValue?.reason} onChange={changeHandle}>
                                    <option selected>Open this select menu</option>
                                    {reasons &&
                                        reasons.map((item) => {
                                            return <option value={item?._id}>{item.reason}</option>;
                                        })}
                                </select>
                            </div>

                            {/* <div className="mb-3">
                                <label className="form-label fw-semibold">Attach files</label>
                                <input type="file" className="form-control" />
                                <div className="form-text">Max file size: 2M</div>
                            </div> */}

                            <button type="button" className="btn btn-primary px-4" onClick={submitData}>
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}


            <ToastContainer />
        </div>
    )
}

export default CraeteRmaReturm