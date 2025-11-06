
import Modal from 'react-bootstrap/Modal';
import img from "../../assets/img/blog/2.jpg"

function ModalftgMan(props) {
    console.log(props.value);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   {props?.value?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5> {props?.value?.department}
                </h5>
                <img src={props?.value?.photo ? props?.value?.photo.url : img} style={{margin:"10px" ,width:"200px" ,height:"200px"}}/>
                <p>
                  {props?.value?.description}
                </p>
            </Modal.Body>
         
        </Modal>
    );
}
export default ModalftgMan