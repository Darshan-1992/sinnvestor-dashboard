import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Button,ToastContainer,Toast } from 'react-bootstrap';
import Select from 'react-select';
import React from "react";
import { postData,getData } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";


const PrivatePerson = (props) => {
  const {data } = props;
 const navigate = useNavigate();

 const [toastShow, setToastShow] = useState(false);
 
 const [message, setMessage] = useState('');
 
 const { control, register, handleSubmit, formState: { errors },reset } = useForm({});
 
 const [isLoading, setIsLoading] = useState(false);
 const [countryOptions, setCountryOptions] = useState([]);



  useEffect(() => {
    reset(data);
    setCountryOptions(data.country_arr);
  }, [data]);


  const onSubmit = (data) => {
    console.log(data);

    postData({ data, api: "api/user/details" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
          setMessage(response?.message);
            navigate('/');
      }
    }).catch((error) => {
      console.log('error', error);
    })
  };

  const formAddressOptions = [
    {
      label: "Mr.",
      value: "1",
    },
    {
      label: "Mrs.",
      value: "2",
    }
  ];


  const titleOptions = [
    {
      label: "Dr.",
      value: "Dr.",
    },
    {
      label: "Prof.",
      value: "Prof.",
    }
  ];




  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="sub-heading">
        <h3>Personal data</h3>
      </div>
      <Row className='gx-5'>
        <Col lg={6}>
          <div style={{ maxWidth: '150px' }}>
            <Form.Group className="mb-4">
              <Form.Label>Form of address <span className="text-danger">*</span></Form.Label>
              <Controller
               {...register("gender", { required: true })}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => <Select
                  className="custom-select"
                  classNamePrefix="select"
                  isSearchable={false}
                  options={formAddressOptions}
                  value={formAddressOptions.find(c => c.value === value)}
                  onChange={val => onChange(val.value)}
                />}
              />
              {errors.formAddress && <span className="invalid-feedback d-block">This field is required</span>}
            </Form.Group>
          </div>
        </Col>

        <Col lg={6}>
          <div style={{ maxWidth: '150px' }}>
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Controller
                  {...register("prefix", { required: true })}
                control={control}
                render={({ field: { value, onChange } }) => <Select
                  className="custom-select"
                  classNamePrefix="select"
                  isSearchable={false}
                  options={titleOptions}
                  value={titleOptions.find(c => c.value === value)}
                  onChange={val => onChange(val.value)}
                />}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>First name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="First name" {...register("user_name", { required: true })} />
            {errors.firstName && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Last name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Last name" {...register("last_name", { required: true })} />
            {errors.lastName && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5 align-items-end'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Date of birth <span className="text-danger">*</span></Form.Label>
            <Row className="gx-4">
              <Col lg={4}>
                <Form.Group>
                  <Form.Label className="fw-normal mb-1">Day</Form.Label>
                  <Form.Control type="text" placeholder="DD" {...register("day", { required: true })} />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label className="fw-normal mb-1">Month</Form.Label>
                  <Form.Control type="text" placeholder="MM" {...register("month", { required: true })} />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label className="fw-normal mb-1">Year</Form.Label>
                  <Form.Control type="text" placeholder="YYYY" {...register("year", { required: true })} />
                </Form.Group>
              </Col>
            </Row>
            {errors.day && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Birth place <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Birth place" {...register("birth_place")} />
            {errors.birthPlace && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Email address" {...register("email", { required: true })} disabled />
            {errors.emailAddress && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Phone number <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="e.g. +49 176 12345678" {...register("sinn_phone_number", { required: true })} />
            {errors.sinn_phone_number && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={9}>
          <Form.Group className="mb-4">
            <Form.Label>Street <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Street" {...register("street_address", { required: true })} />
            {errors.street_address && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-4">
            <Form.Label>House no. <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="No." {...register("house_number", { required: true })} />
            {errors.house_number && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={3}>
          <Form.Group className="mb-4">
            <Form.Label>Zip code <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Zip code" {...register("zip_code", { required: true })} />
            {errors.zip_code && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={9}>
          <Form.Group className="mb-4">
            <Form.Label>City <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="City" {...register("place", { required: true })} />
            {errors.place && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
      <Row className='gx-5'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Country <span className="text-danger">*</span></Form.Label>
            <Controller
             {...register("country")}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange } }) => <Select
                className="custom-select"
                classNamePrefix="select"
                isSearchable={false}
                options={countryOptions}
                value={countryOptions?.find(c => c.value === value)}
                onChange={val => onChange(val.value)}
              />}
            />
            {errors.country && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
      <div className="sub-heading mt-4">
        <h3>Bank details</h3>
      </div>
      <Form.Group className="mb-4">
        <Form.Label>Account holder</Form.Label>
        <Form.Control type="text" placeholder="First name Last name" {...register("account_holder_name")} />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>IBAN <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" placeholder="e.g. DE12 1234 5678 1234 5678 00" {...register("iban")} />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Tax ID (required for interest payment) <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" placeholder="Tax ID No." {...register("tax")} />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="germanAccount"
          {...register("german_bank_account_exists")}
          label="I have a German bank account"
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

export default PrivatePerson;