import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function CardModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter card details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modalCards'>
                    <div style={{ marginRight: "10px" }}>
                        <div>
                            <span style={{ font: "18px", marginRight: "8px" }}><strong>Card number</strong></span>
                            <input className='form-control' placeholder='Card number' />
                        </div>
                        <div style={{ margin: "10px 0" }}>
                            <span style={{ font: "18px", marginRight: "8px" }}><strong>Name on card</strong></span>
                            <input className='form-control' placeholder='Name on card' />
                        </div>
                        <div>
                            <span style={{ font: "18px", marginRight: "8px" }}><strong>Expiry date</strong></span>
                            <input className='form-control' placeholder='Name on card' />
                        </div>
                    </div>
                    <div className='cardRight'>
                        <h5 style={{ color: "#007185" }}>ETG accepts all major credit and debit cards:</h5>
                        <img src={""} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success">Submit</Button>
                <Button variant='danger' onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardModal