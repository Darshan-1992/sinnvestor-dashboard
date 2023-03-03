import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Button,ToastContainer,Toast } from 'react-bootstrap';
import Select from 'react-select';
import React from "react";
import { postData,getData } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';


const Business = (props) => {
    const {data } = props;

 const [toastShow, setToastShow] = useState(false);
 
 const [message, setMessage] = useState('');
 
 const { control, register, handleSubmit, formState: { errors },reset } = useForm({});
 
 const [isLoading, setIsLoading] = useState(false);
 const [countryOptions, setCountryOptions] = useState([]);
 const [business, setBusiness] = useState([]);
 const [companyData, setCompanyData] = useState([]);



  useEffect(() => {
    let formData = {  
      company_id : companyData?.company_id,
      name : companyData?.name,
      email : companyData?.email,
      phone_number : companyData?.phone_number,
      company_street_address : companyData?.company_street_address,
      company_house_number : companyData?.company_house_number,
      company_zip_code : companyData?.company_zip_code,
      company_place : companyData?.company_place,
      company_country : companyData?.company_country,
      account_holder_name : companyData?.account_holder_name,
      iban : companyData?.iban,
      tax : companyData?.tax,
      german_bank_account_exists : data?.german_bank_account_exists}
   reset(formData);
   setCountryOptions(data.country_arr);
   var append = {};
   append['name'] = "Add New Company";append['company_id'] = '';

  let set_Business =  prepend(append,data.business);
  console.log(set_Business);
    setBusiness(set_Business);
  }, [data,companyData]);
  const onSubmit = (data) => {
    console.log(data);

    postData({ data, api: "api/user/business_details" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
          setMessage(response?.message);
          
      }
    }).catch((error) => {
      console.log('error', error);
    })
  };
    const handler = (value) => {
    console.log("value",value);
     setCompanyData(value);

  }
const prepend = (value, array) => {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
}
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="sub-heading">
        <h3>Business data</h3>
      </div>
      <Row className='gx-5'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Select Company <span className="text-danger">*</span></Form.Label>
              <Controller
             {...register("company")}
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { value, onChange } }) => <Select
                className="custom-select"
                classNamePrefix="select"
                isSearchable={true}
                options={business.map((item)=>{ item['label'] = item?.name;
                                               item['value'] = item?.company_id ;
                                               return item; })}
                value={business?.find(c => c.company_id === value)}
                onChange={handler}
                
              />}
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Company name <span className="text-danger">*</span></Form.Label>
             <Form.Control type="hidden" {...register("company_id")} />
            <Form.Control type="text" placeholder="Company name" {...register("name", { required: true })} />
            {errors.name && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Email address"   {...register("email", { required: true })}  />
            {errors.email && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-4">
            <Form.Label>Phone number <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="e.g. +49 176 12345678" {...register("phone_number", { required: true })} />
            {errors.phone_number && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={9}>
          <Form.Group className="mb-4">
            <Form.Label>Street <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Street" {...register("company_street_address", { required: true })} />
            {errors.company_street_address && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-4">
            <Form.Label>House no. <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="No." {...register("company_house_number", { required: true })} />
            {errors.company_house_number && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className='gx-5'>
        <Col lg={3}>
          <Form.Group className="mb-4">
            <Form.Label>Zip code <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Zip code" {...register("company_zip_code", { required: true })} />
            {errors.company_zip_code && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
        <Col lg={9}>
          <Form.Group className="mb-4">
            <Form.Label>City <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="City" {...register("company_place", { required: true })} />
            {errors.company_place && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
      <Row className='gx-5'>
        <Col lg={6}>
           <Form.Group className="mb-4">
            <Form.Label>Country <span className="text-danger">*</span></Form.Label>
            <Controller
             {...register("company_country")}
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
            {errors.company_country && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
      <div className="sub-heading mt-4">
        <h3>Company bank details</h3>
      </div>
      <Form.Group className="mb-4">
        <Form.Label>Account holder</Form.Label>
        <Form.Control type="text" placeholder="First name Last name" {...register("account_holder_name")} />
        {errors.account_holder_name && <span className="invalid-feedback d-block">This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>IBAN <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" placeholder="e.g. DE12 1234 5678 1234 5678 00" {...register("iban")} />
        {errors.iban && <span className="invalid-feedback d-block">This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Tax ID (required for interest payment) <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" placeholder="Tax ID No." {...register("tax")} />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="german_bank_account_exists"
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

export default Business;