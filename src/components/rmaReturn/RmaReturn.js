
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Badge, Image, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../../server";
import Loader from "../../common/loader/Loader";

const RmaReturnList = () => {
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    const getStatusBadge = (status) => {
        if (status === "Pending")
            return <Badge bg="warning" text="dark">{status}</Badge>;
        if (status === "Approved")
            return <Badge bg="primary">{status}</Badge>;
        return <Badge bg="danger">{status}</Badge>;
    };


    const createRma = () => {
        navigate('/returns/rma/new')
    }
    const baseUrl = base_url();
    const [ramaList, setRamaList] = useState(null)
    // console.log(ramaList);

    const getBydata = async () => {
        setLoader(true)
        try {
            const res = await axios.get(`${baseUrl}rma/user`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            })
            setRamaList(res?.data)
            setLoader(false)

        } catch (error) {
            setLoader(false)
        }
    }

    useEffect(() => {
        getBydata()
    }, [])

    return (
        <>
            {loader && <Loader />}

            <Container className="my-5">
                <Row className="mb-4 align-items-center justify-content-between">
                    <Col>
                        <h2 className="fw-bold text-dark">My Returns</h2>

                    </Col>
                    <Col xs="auto">
                        <p className="text-muted mb-0">{ramaList?.length} Items</p>
                        {/* <Button variant="primary" className="shadow-sm rounded-pill" onClick={createRma}>
                        Request New Return
                    </Button> */}
                    </Col>
                </Row>

                <div className="table-responsive shadow-sm rounded">
                    <Table hover className="align-middle mb-0 table-main-main">
                        <thead className="table-light">
                            <tr>
                                <th>RMA #</th>
                                <th>Date</th>
                                <th>Order #</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ramaList && ramaList?.map((item, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold text-primary">
                                        <Link to={`/returns/rma/view/${item?._id}`}>{item?._id}</Link>
                                    </td>
                                    <td>{new Date(item?.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</td>
                                    <td>
                                        <div className="text-primary small">
                                            <Link to={`/order-detail/${item?.orderId?._id}`}> {item?.orderId?.order_referenceNo}</Link>
                                        </div>
                                        <div className="d-flex gap-2 mt-2">
                                            <img src={item?.variant_id?.mainImage_url?.url} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", border: "1px solid #ddd" }} />
                                            {/* {item.images.map((img, i) => (
                                            <Image
                                                key={i}
                                                src={img}
                                                alt="product"
                                                rounded
                                                style={{ width: "40px", height: "40px", objectFit: "cover", border: "1px solid #ddd" }}
                                            />
                                        ))} */}
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(item?.status)}</td>
                                    <td>
                                        <Button onClick={() => navigate(`/returns/rma/view/${item?._id}`)} variant="link" className="text-decoration-none p-0">
                                            Show Return
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* <div className="d-flex justify-content-between align-items-center mt-3 text-muted small">
                <span>{returns.length} Item(s)</span>
                <div>
                    Show{" "}
                    <select className="form-select d-inline-block w-auto form-select-sm mx-1">
                        <option>12</option>
                        <option>24</option>
                        <option>36</option>
                    </select>{" "}
                    per page
                </div>
            </div> */}
            </Container>
        </>
    );
};

export default RmaReturnList;
