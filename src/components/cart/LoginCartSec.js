import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { usePostCartOfflineMutation, useSetLoginMutation } from '../products/productSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function LoginCartSec(props) {
    const mailRef = useRef()
    const passRef = useRef()
    const user_id = window.localStorage.getItem("user_id");

    const [loginFormStatus, { data, isError, isSuccess, isLoading }] = useSetLoginMutation()

    const { updatedProducts } = useSelector((state) => {
        return state.productList
    })

    const [postCartOffline] = usePostCartOfflineMutation()

    const SendData = () => {
        const obj = {
            email: mailRef.current.value,
            password: passRef.current.value
        }
        loginFormStatus(obj)
    }


    const navigate = useNavigate()
    useEffect(() => {
        if (data?.firstname) {
            setTimeout(() => {
                console.log(data);
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("user_id", data._id);
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem("email", data.email);
                window.localStorage.setItem("userName", `${data.firstname} ${data.lastname}`);
                postCartOffline({ cart: updatedProducts, userid: data._id })
                navigate('/checkout')
            }, 1000);
        }
    }, [isSuccess])


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login First
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <input className='form-control' ref={mailRef} placeholder='Email@gmail.com' type='mail' style={{ margin: '10px 0' }} />
                    <input className='form-control' ref={passRef} placeholder='Password' type='password' />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={SendData}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default LoginCartSec