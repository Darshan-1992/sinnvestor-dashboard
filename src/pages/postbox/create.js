import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Button,ToastContainer,Toast } from 'react-bootstrap';
import Select from 'react-select';
import React from "react";
import { postData,getData } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";


const Create = () => {
 
 const navigate = useNavigate();

 const [toastShow, setToastShow] = useState(false);
 
 const [message, setMessage] = useState('');
 
 const { control, register, handleSubmit, formState: { errors },reset } = useForm({});
 
 const [isLoading, setIsLoading] = useState(false);
 const [countryOptions, setCountryOptions] = useState([]);



  // useEffect(() => {
  //   reset(data);
  //   setCountryOptions(data.country_arr);
  // }, [data]);


  const onSubmit = (data) => {
    console.log(data);

    postData({ data, api: "api/user/thrade" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           // setToastShow(true);
          // setMessage(response?.message);
            navigate('/postbox/conversion/'+response.data.id);
      }
    }).catch((error) => {
      console.log('error', error);
    })
  };

  // const formAddressOptions = [
  //   {
  //     label: "Mr.",
  //     value: "1",
  //   },
  //   {
  //     label: "Mrs.",
  //     value: "2",
  //   }
  // ];


  // const titleOptions = [
  //   {
  //     label: "Dr.",
  //     value: "Dr.",
  //   },
  //   {
  //     label: "Prof.",
  //     value: "Prof.",
  //   }
  // ];




  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="sub-heading">
        <h3>Crate new thread</h3>
      </div>
      

      <Row className='gx-5'>
        <Col lg={12}>
          <Form.Group className="mb-4">
           
            <Form.Control type="text" placeholder="Subject" {...register("subject", { required: true })} />
            {errors.subject && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={12}>
          <Form.Group className="mb-4">
            
            <Form.Control as="textarea" rows={3} type="text" placeholder="Type a message" {...register("message", { required: true })} />
            {errors.message && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
        <Form.Group>
        <Form.Check
          type="checkbox"
          id="allow_response"
          {...register("allow_response")}
          label="Allow response"
          style={{ fontWeight: 500 }}
        />
      </Form.Group>
     
      <div className="mt-5">
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
      <ToastContainer className="p-3 position-fixed" position="top-end">
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={9000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
    </Form>


  )
}

export default Create;