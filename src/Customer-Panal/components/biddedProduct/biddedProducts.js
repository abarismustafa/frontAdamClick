import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const image = [
  {
    id: "1",
    imgSrc:
      "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png",
  },
  // {
  //   id: "2",
  //   imgSrc2:
  //     "https://s40424.pcdn.co/in/wp-content/uploads/2022/04/March_How-to-become-Product-Manager-1.jpg",
  // },
];
function BiddedProducts() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="aiz-user-panel">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Bidded Products</h5>
          </div>
          <div className="card-body">
            <table
              className="table aiz-table mb-0 footable footable-1 breakpoint-xl"
              style={{}}
            >
              <thead>
                <tr className="footable-header">
                  <th
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    #
                  </th>
                  <th
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    Product Image
                  </th>
                  <th
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    Product Name
                  </th>
                  <th data-breakpoints="md" style={{ display: "table-cell" }}>
                    My Bidded Amount
                  </th>
                  {/* <th style={{ display: "table-cell" }}>Amount</th> */}
                  <th data-breakpoints="md" style={{ display: "table-cell" }}>
                    Highest Bid Amount
                  </th>
                  <th data-breakpoints="md" style={{ display: "table-cell" }}>
                    Auction End Date
                  </th>
                  <th
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6  INRxaU5PMFpqN3dZSWYySXB0T0VUbUE9PSIsInZhbHVlIjoiZE9UL0l3L3hFS3p5OHdFTGdxU0oyUT09IiwibWFjIjoiOGYwMThjYzM4MWExNmQyZTEyYTdkYTAyY2U4ZjM5YTI4Yjc5NmMwY2U4NmY5MmYxMjUzZjhmYjlkNDIxMzQwMiIs  INRhZyI6IiJ9">
                      1
                    </a>
                  </td>
                  <td style={{ display: "table-cell" }}>
                    <img onClick={handleShow} src={image[0].imgSrc} style={{ width: 60 }} alt="" />
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        {/* <Modal.Title>Modal title</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <img src={image[0].imgSrc} alt="" />
                      </Modal.Body>
                      {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                      </Modal.Footer> */}
                    </Modal>
                  </td>
                  <td style={{ display: "table-cell" }}>abc</td>
                  <td style={{ display: "table-cell" }}>$5550.000</td>
                  <td style={{ display: "table-cell" }}>
                    <span className="badge badge-inline badge-success">
                      $5550.000
                    </span>
                  </td>
                  <td style={{ display: "table-cell" }}>2025-03-01 00:00:00</td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    N/A
                    {/* <a
                      href="https://mmslfashions.in/purchase_history/details/eyJpdiI6Im5tRm00cC91RUltd2ZNUHcrVjJtbmc9PSIsInZhbHVlIjoibEdadVBaSlEvK1phR3YzRWZNajJDUT09IiwibWFjIjoiNTRmMWM2ZTdhMjFjN2NjN2IyMjhiYzUyZDhkN2I1YzlkMjAyNDA4YThmM2EzMGZiM2RjYmQ3ZDBjZWE0MDJlZCIs  INRhZyI6IiJ9"
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Order Details"
                    >
                      <i className="las la-eye" />
                    </a>
                    <a
                      className="btn btn-soft-warning btn-icon btn-circle btn-sm"
                      href="https://mmslfashions.in/invoice/6"
                      title="Download Invoice"
                    >
                      <i className="las la-download" />
                    </a> */}
                  </td>
                </tr>
                <tr>
                  <td
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6IktxWnBrWUZRM29Ic3FXOFdjdVBiYUE9PSIsInZhbHVlIjoiVVJSOEVnYldFbGZmSEVDUjhqYWdXZz09IiwibWFjIjoiNTVkYzMzMzVlOWM4YWI1ODkwYjk2MDRjYTY4MTE2M2E4NGFhMmUwNDM3MGUwZTNkMjA3ZGFjMzQ0MWEwZjU0NyIs  INRhZyI6IiJ9">
                      2
                    </a>
                  </td>
                  <td style={{ display: "table-cell" }}>
                  <img onClick={handleShow} src={image[0].imgSrc} style={{ width: 60 }} alt="" />
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        {/* <Modal.Title>Modal title</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <img src={image[0].imgSrc} alt="" />
                      </Modal.Body>
                      {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                      </Modal.Footer> */}
                    </Modal>
                  </td>
                  <td style={{ display: "table-cell" }}>abc</td>
                  <td style={{ display: "table-cell" }}>$5550.000</td>
                  <td style={{ display: "table-cell" }}>
                    <span className="badge badge-inline badge-danger">
                      $5550.000
                    </span>
                  </td>
                  <td style={{ display: "table-cell" }}>
                    2025-03-01 00:00:00
                    {/* <span className="badge badge-inline badge-danger">
                      Un-Paid
                    </span> */}
                  </td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    <span className="badge badge-inline badge-success">
                      Purchased
                    </span>
                    {/* <a
                      href="javascript:void(0)"
                      className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete"
                      data-href="https://mmslfashions.in/purchase_history/destroy/3"
                      title="Cancel"
                    >
                      <i className="las la-trash" />
                    </a>
                    <a
                      href="https://mmslfashions.in/purchase_history/details/eyJpdiI6Ijdvc05nM0JsV3lsb0JyUHhHbEQ4MkE9PSIsInZhbHVlIjoiZFQrUXdWNG5IL3ErS0Z4dlhjR29Cdz09IiwibWFjIjoiM2MwMjEyZGE4ZDgyMTc1OTJiM2EyMDI1ZjQyZGUwNzE0OTY4N2M1MDFmY2UwMDQ2YzRkMjczZmExNmU4NDE5ZCIs  INRhZyI6IiJ9"
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Order Details"
                    >
                      <i className="las la-eye" />
                    </a>
                    <a
                      className="btn btn-soft-warning btn-icon btn-circle btn-sm"
                      href="https://mmslfashions.in/invoice/3"
                      title="Download Invoice"
                    >
                      <i className="las la-download" />
                    </a> */}
                  </td>
                </tr>
                <tr>
                  <td
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6  INRxaU5PMFpqN3dZSWYySXB0T0VUbUE9PSIsInZhbHVlIjoiZE9UL0l3L3hFS3p5OHdFTGdxU0oyUT09IiwibWFjIjoiOGYwMThjYzM4MWExNmQyZTEyYTdkYTAyY2U4ZjM5YTI4Yjc5NmMwY2U4NmY5MmYxMjUzZjhmYjlkNDIxMzQwMiIs  INRhZyI6IiJ9">
                      3
                    </a>
                  </td>
                  <td style={{ display: "table-cell" }}>
                  <img onClick={handleShow} src={image[0].imgSrc} style={{ width: 60 }} alt="" />
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        {/* <Modal.Title>Modal title</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <img src={image[0].imgSrc} alt="" />
                      </Modal.Body>
                      {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                      </Modal.Footer> */}
                    </Modal>
                  </td>
                  <td style={{ display: "table-cell" }}>abc</td>
                  <td style={{ display: "table-cell" }}>$5550.000</td>
                  <td style={{ display: "table-cell" }}>
                    <span className="badge badge-inline badge-success">
                      $5550.000
                    </span>
                  </td>
                  <td style={{ display: "table-cell" }}>2025-03-01 00:00:00</td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    N/A
                    {/* <a
                      href="https://mmslfashions.in/purchase_history/details/eyJpdiI6Im5tRm00cC91RUltd2ZNUHcrVjJtbmc9PSIsInZhbHVlIjoibEdadVBaSlEvK1phR3YzRWZNajJDUT09IiwibWFjIjoiNTRmMWM2ZTdhMjFjN2NjN2IyMjhiYzUyZDhkN2I1YzlkMjAyNDA4YThmM2EzMGZiM2RjYmQ3ZDBjZWE0MDJlZCIs  INRhZyI6IiJ9"
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Order Details"
                    >
                      <i className="las la-eye" />
                    </a>
                    <a
                      className="btn btn-soft-warning btn-icon btn-circle btn-sm"
                      href="https://mmslfashions.in/invoice/6"
                      title="Download Invoice"
                    >
                      <i className="las la-download" />
                    </a> */}
                  </td>
                </tr>
                <tr>
                  <td
                    className="footable-first-visible"
                    style={{ display: "table-cell" }}
                  >
                    <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6IktxWnBrWUZRM29Ic3FXOFdjdVBiYUE9PSIsInZhbHVlIjoiVVJSOEVnYldFbGZmSEVDUjhqYWdXZz09IiwibWFjIjoiNTVkYzMzMzVlOWM4YWI1ODkwYjk2MDRjYTY4MTE2M2E4NGFhMmUwNDM3MGUwZTNkMjA3ZGFjMzQ0MWEwZjU0NyIs  INRhZyI6IiJ9">
                      4
                    </a>
                  </td>
                  <td style={{ display: "table-cell" }}>
                    <img onClick={handleShow} src={image[0].imgSrc} style={{ width: 60 }} alt="" />
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        {/* <Modal.Title>Modal title</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <img src={image[0].imgSrc} alt="" />
                      </Modal.Body>
                      {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                      </Modal.Footer> */}
                    </Modal>
                  </td>
                  <td style={{ display: "table-cell" }}>abc</td>
                  <td style={{ display: "table-cell" }}>$5550.000</td>
                  <td style={{ display: "table-cell" }}>
                    <span className="badge badge-inline badge-danger">
                      $5550.000
                    </span>
                  </td>
                  <td style={{ display: "table-cell" }}>
                    2025-03-01 00:00:00
                    {/* <span className="badge badge-inline badge-danger">
                      Un-Paid
                    </span> */}
                  </td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    <span className="badge badge-inline badge-success">
                      Purchased
                    </span>
                    {/* <a
                      href="javascript:void(0)"
                      className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete"
                      data-href="https://mmslfashions.in/purchase_history/destroy/3"
                      title="Cancel"
                    >
                      <i className="las la-trash" />
                    </a>
                    <a
                      href="https://mmslfashions.in/purchase_history/details/eyJpdiI6Ijdvc05nM0JsV3lsb0JyUHhHbEQ4MkE9PSIsInZhbHVlIjoiZFQrUXdWNG5IL3ErS0Z4dlhjR29Cdz09IiwibWFjIjoiM2MwMjEyZGE4ZDgyMTc1OTJiM2EyMDI1ZjQyZGUwNzE0OTY4N2M1MDFmY2UwMDQ2YzRkMjczZmExNmU4NDE5ZCIs  INRhZyI6IiJ9"
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Order Details"
                    >
                      <i className="las la-eye" />
                    </a>
                    <a
                      className="btn btn-soft-warning btn-icon btn-circle btn-sm"
                      href="https://mmslfashions.in/invoice/3"
                      title="Download Invoice"
                    >
                      <i className="las la-download" />
                    </a> */}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="aiz-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BiddedProducts;
