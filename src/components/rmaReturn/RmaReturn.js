
import React from "react";
import { Table, Button, Badge, Image, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RmaReturnList = () => {
    const navigate = useNavigate()
    const returns = [
        {
            rma: "#100000005",
            date: "10/29/25",
            order: ["#000000007"],
            images: ["/images/item1.png"],
            status: "Pending Approval",
        },
        {
            rma: "#100000007",
            date: "10/29/25",
            order: ["#000000010", "#000000007"],
            images: ["/images/item2.png", "/images/item1.png"],
            status: "Pending Approval",
        },
        {
            rma: "#100000001",
            date: "10/29/25",
            order: ["#000000003"],
            images: ["/images/item3.png"],
            status: "Closed",
        },
        {
            rma: "#100000008",
            date: "10/29/25",
            order: ["eBay order #34545345"],
            images: ["/images/item1.png"],
            status: "Pending Approval",
        },
    ];

    const getStatusBadge = (status) => {
        if (status === "Pending Approval")
            return <Badge bg="warning" text="dark">{status}</Badge>;
        if (status === "Closed")
            return <Badge bg="primary">{status}</Badge>;
        return <Badge bg="secondary">{status}</Badge>;
    };


    const createRma = () => {
        navigate('/returns/rma/new')
    }

    return (
        <Container className="my-5">
            <Row className="mb-4 align-items-center justify-content-between">
                <Col>
                    <h2 className="fw-bold text-dark">My Returns</h2>
                    <p className="text-muted mb-0">{returns.length} Item(s)</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" className="shadow-sm rounded-pill" onClick={createRma}>
                        Request New Return
                    </Button>
                </Col>
            </Row>

            <div className="table-responsive shadow-sm rounded">
                <Table hover className="align-middle mb-0">
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
                        {returns.map((item, index) => (
                            <tr key={index}>
                                <td className="fw-semibold text-primary">{item.rma}</td>
                                <td>{item.date}</td>
                                <td>
                                    {item.order.map((ord, i) => (
                                        <div key={i} className="text-primary small">{ord}</div>
                                    ))}
                                    <div className="d-flex gap-2 mt-2">
                                        {item.images.map((img, i) => (
                                            <Image
                                                key={i}
                                                src={img}
                                                alt="product"
                                                rounded
                                                style={{ width: "40px", height: "40px", objectFit: "cover", border: "1px solid #ddd" }}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>{getStatusBadge(item.status)}</td>
                                <td>
                                    <Button onClick={() => navigate("/returns/rma/view")} variant="link" className="text-decoration-none p-0">
                                        View Return
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 text-muted small">
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
            </div>
        </Container>
    );
};

export default RmaReturnList;
