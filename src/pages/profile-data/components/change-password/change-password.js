import { useForm } from "react-hook-form";
import { Form, Row, Col, Button,ToastContainer,Toast } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { postData,getData } from 'Utils/ApiHelper';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const ChangePassword = () => {

  const formSchema = Yup.object().shape({
    old_password: Yup.string()
      .required('Password is mendatory'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(3, 'Password must be at 3 char long'),
      confirm_password: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  });
  const [toastShow, setToastShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [message, setMessage] = useState('');
   const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(formSchema) }
  const { watch, register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log(data);


    postData({ data, api: "api/user/change_password" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
          setMessage(response?.message);
          
      }
         if(response.success==false){
        // alert(response?.message);
           setErrorShow(true);
          setMessage(response?.errors);
           
      }
    }).catch((error) => {
      console.log('error', error);
    })
  };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='gx-5'>
          <Col lg={6}>
            <Form.Group className="mb-4">
              <Form.Label>Old Password<span className="text-danger">*</span></Form.Label>
              <Form.Control type="password" {...register("old_password", { required: true })} />
              {errors.old_password?.message && <span className="invalid-feedback d-block">{errors.old_password?.message}</span>}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>New Password<span className="text-danger">*</span></Form.Label>
              <Form.Control type="password" {...register("password", { required: true })} />
              {errors.password?.message && <span className="invalid-feedback d-block">{errors.password?.message}</span>}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
              <Form.Control type="password" {...register("confirm_password", { required: true, validate: (val) => {
                if (watch('password') != val) {
                  return "Your passwords do no match";
                }
              }})} />
              {errors.confirm_password?.message && <span className="invalid-feedback d-block">{errors.confirm_password?.message}</span>}
            </Form.Group>
            <div className="mt-5">
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </div>
          </Col>
        </Row>
          <ToastContainer className="p-3 position-fixed" position={'top-end'}>
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
          <ToastContainer className="p-3 position-fixed" position={'top-end'}>
        <Toast bg={'danger'} onClose={() => setErrorShow(false)} show={errorShow} >
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Form>
    )
  }
  
  export default ChangePassword;