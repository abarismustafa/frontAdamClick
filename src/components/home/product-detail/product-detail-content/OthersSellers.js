import { Button, Modal } from "react-bootstrap";

function OthersSellers(props) {

    const chengeSeller = (val) => {
        props.setStoreSeller(val)
        props.onHide()
    }
    return (
        <Modal
            {...props}
            size="l"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select a Seller
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="sellerOther">

                    {props?.data?.variations[props.count1]?.prices[0]?.seller_id &&
                        <div className="form-check">
                            <div>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    checked
                                    // onClick={() => { chengeSeller(item) }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                    // onClick={() => { chengeSeller(item) }}
                                >
                                    {props?.data?.variations[props.count1]?.prices[0]?.seller_id?.firstname}  {props?.data?.variations[props.count1]?.prices[0]?.seller_id?.lastname}
                                </label>
                            </div>
                            {/* <div>ZK : {item.sale_rate}</div> */}
                        </div>
                    }

                    {/* {props?.data?.variations[props.count1]?.prices?.map((item) => {
                        console.log(item);
                        return <div className="form-check" key={item._id}>
                            <div>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    onClick={() => { chengeSeller(item) }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                    onClick={() => { chengeSeller(item) }}
                                >
                                    {item?.seller_id?.firstname}  {item?.seller_id?.lastname}
                                </label>
                            </div>
                            <div>ZK : {item.sale_rate}</div>
                        </div>
                    })} */}

                    {/* <div className="form-check">
                        <div>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                                onClick={() => { chengeSeller('ddd') }}
                            >
                                Net Banking
                            </label>
                        </div>
                        <div>hello price</div>
                    </div>
                    <div className="form-check">
                        <div>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault3"
                                defaultChecked
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault3"
                                onClick={() => { chengeSeller('ddd') }}
                            >
                                Net Banking
                            </label>
                        </div>
                        <div>hello price</div>
                    </div> */}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default OthersSellers