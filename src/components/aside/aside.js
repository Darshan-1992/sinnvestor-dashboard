import { Col, Row, ListGroup, Button } from 'react-bootstrap';
import { NavLink  } from "react-router-dom";
import { useEffect, useState } from 'react';
import 'components/aside/aside.scss';
import userImg from "assets/images/user.png";
import { postData,getData,goToProfile } from 'Utils/ApiHelper';


const Aside = () => {

const [data, setData] = useState([]);
 
  useEffect(() => {
  fetchData();

 
  }, []);
 const fetchData = async () => {
    let response = await getData({ api: 'api/user/details' });

    setData(response);
    
    
  
  };

 
  return (
    <div className='profile-aside'>
      <Row className='align-items-center'>
        <Col xs="auto">
          <div>
            <img src={data?.image} className="rounded-circle" style={{ width: '85px' }} alt='user' />
          </div>
        </Col>
        <Col>
          <div className='profile-name'>{data?.user_name} {data?.last_name}</div>
          <p className='profile-since mt-2'>Sinnvestor since: {data?.sinnvestor_date}</p>
        </Col>
      </Row>
      <div className='aside-menu'>
        <ListGroup>
          <ListGroup.Item>
            <NavLink to='/' className="list-group-item-link">Personal data</NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink to='/opportunities' className="list-group-item-link">Sinnvestment opportunities</NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink to='/portfolio' className="list-group-item-link">Sinnvestment portfolio</NavLink>
          </ListGroup.Item>
         
          <ListGroup.Item>
          <NavLink to='/postbox' className="list-group-item-link">Postbox 
           { (data?.postbox_unred_count) ? 
           <span className="badge badge-red">{data?.postbox_unred_count}</span> :
           <span></span>
          
         }
         

            
           </NavLink>
            
          </ListGroup.Item>
          
        </ListGroup>
      </div>
      <div className='mt-5'>
        <a className="btn btn-info"   onClick={() => goToProfile()} >Switch to FunderNation Profile</a>
      </div>
    </div>
  )
}

export default Aside;