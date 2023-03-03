import React, { useState,useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Form, Button,Row, Col, ToastContainer,Toast  } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router';
import "pages/postbox/postbox-list.scss";
import { postData,getData } from 'Utils/ApiHelper';


const Conversion = ( ) => {
  const { id } = useParams();

  const navigate = useNavigate();
const [noData, setNoData] = useState(false);
const [allowReaponse, setAllowReaponse] = useState('');
const [subject, setSubject] = useState('');
 

 const [toastShow, setToastShow] = useState(false);
 
 const [message, setMessage] = useState('');
 
 const { control, register, handleSubmit, formState: { errors }, reset } = useForm({});
 
 const [isLoading, setIsLoading] = useState(false);
 const [countryOptions, setCountryOptions] = useState([]);


   const [list, setlist] = useState([]);
  

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/thread/'+id });
    setlist(response.list);
    setSubject(response.parent_thread.subject);
    setAllowReaponse(response.parent_thread.allow_response);
     let formData = {  
      parent_id : response.parent_thread.id,
      subject : response.parent_thread.subject,
      message : '',
      }
   reset(formData);
     if(response.list.length === 0){
      setNoData(true);

    }
    
      setIsLoading(false);
  };



 const onSubmit2 = (data) => {

  // alert('sdfsd');
    console.log(data);

    postData({ data, api: "api/user/thrade" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
          setMessage(response?.message);
           fetchData()
      }
    }).catch((error) => {
      console.log('error', error);
    })
  }

 
  
  return (
     <Form onSubmit={handleSubmit(onSubmit2)}>
      
            
            <div className='postbox-section'>
              <div className='sub-heading'>
                <h3>{subject}</h3>
                 
              </div>
              <div className='postbox-list'>
              <ul>
              {list.map(item => (
              <li key={item.id} className={ item.is_my? 'thread-reply' : 'thread'}>
                <Row className="e-card">
                  <Col lg={1}>
                  <div>
                      <img className="rounded-circle" src={item.image} width="45px"/>

                  </div>
                  </Col>
                   <Col lg={11}>

                   <h4 className="e-card-title">{item.user_name} {item.last_name} </h4>

                  <div className="e-card-content">
                   {item.message} 
                   <div className="timestap"  >{item.created_at}</div>
                   
                  </div>
                  </Col>
                  </Row>
                </li>
              ))}
              </ul>
      {allowReaponse == 1 ?
       <React.Fragment>
      <Row className='gx-5'>
       
        <Col lg={12}>

          <Form.Group className="mb-4">
            <Form.Control   type="hidden"  {...register("parent_id")} />
            <Form.Control  type="hidden"  {...register("subject")}  />
              
            <Form.Control as="textarea" rows={3} type="text" placeholder="Type a message" {...register("message", { required: true })} />
            {errors.message && <span className="invalid-feedback d-block">This field is required</span>}
          </Form.Group>
        </Col>
      </Row>
         
     
      <div className="mt-1 ml-auto">
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
      <ToastContainer className="p-3 position-fixed" position="top-end">
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={9000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
         </React.Fragment>:  <React.Fragment> </React.Fragment>
     }
                
              </div>
            </div>
          </Form>
  )
}

export default Conversion;