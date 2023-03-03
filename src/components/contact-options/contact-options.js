import React, { useState } from 'react';
import userImg from "assets/images/user.png";
import { Button } from 'react-bootstrap';

const ContactOptions = (props) => {
const { contact_persons } = props;

  return (
    <>
    {contact_persons.map((item, index) => 
    <div className="card-box mt-3" key={index}>
      <div className="d-flex align-items-center">
        <img src={item.image} className="rounded-circle" style={{ width: '48px' }} alt='user'/>
          <h3 className="pb-0 ms-3">{item.name}</h3>
        </div>
        <a href={'mailto:'} className='btn btn-info mt-4'>Send message</a>
    </div>
    )}
    </>
  )
}

export default ContactOptions;