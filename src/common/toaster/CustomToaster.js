import Toast from "react-bootstrap/Toast";
import Toastcontainer from "react-bootstrap/Toastcontainer";

export const CustomToaster = ({
  show,
  setShow,
  message,
  position,
  delay,
  title,
  color,
}) => {
  return (
    <Toastcontainer position={position} className="tostConatainer">
      <Toast
        onClose={() => setShow()}
        show={show}
        delay={delay}
        autohide
        bg={color}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "white" }}>{message}</Toast.Body>
      </Toast>
    </Toastcontainer>
  );
};
