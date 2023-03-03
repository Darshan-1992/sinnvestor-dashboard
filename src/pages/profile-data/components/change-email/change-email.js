import { useForm } from "react-hook-form";
import { Form, Row, Col, Button,ToastContainer,Toast } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { postData,getData } from 'Utils/ApiHelper';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


const ChangeEmail = () => {

  const formSchema = Yup.object().shape({
    new_email: Yup.string()
      .required('Password is mendatory')
  });
    const [toastShow, setToastShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [message, setMessage] = useState('');
   const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(formSchema) }
  const { watch, register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log(data);

    postData({ data, api: "api/user/change_email" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
            setErrorShow(false);
          setMessage(response?.message);
          
      }
         if(response.success==false){
        // alert(response?.message);
           setErrorShow(true);
           setToastShow(false);


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
              <Form.Label>New Email<span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" {...register("new_email", { required: true })} />
              {errors.new_email?.message && <span className="invalid-feedback d-block">{errors.new_email?.message}</span>}
            </Form.Group>
            <div className="mt-5">
              <Button variant="primary" type="submit">
                Update Email
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
  
  export default ChangeEmail;