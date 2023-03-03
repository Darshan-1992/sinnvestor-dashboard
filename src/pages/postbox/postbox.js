import React, { useState,useEffect } from 'react';
import {  Row, Col,  } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router';
import "pages/postbox/postbox-list.scss";
import { getData } from 'Utils/ApiHelper';
import {Link} from 'react-router-dom';


const Postbox = ( ) => {
  const { tabs } = useParams();
  const navigate = useNavigate();
const [noData, setNoData] = useState(false);

    const [list, setlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/postbox' });
    setlist(response.list);
     if(response.list.length === 0){
      setNoData(true);

    }
      setIsLoading(false);
  };

 
  


 
  
  return (
    
            
           <React.Fragment>
              <div className='postbox-section'>
               <div className='sub-heading'>
                <h3>Postbox</h3>
                 <Link to="/postbox/create" className="btn btn-primary">+ Create New Thread</Link>
              </div>
      { isLoading ?
        <div className='p-5 text-center fw-bold'>
          Loading...
        </div>
        :
        <React.Fragment>
       <div className='postbox-list'>

              <ul>
              {list.map(item => (
              <li key={item.id} className={ !item.is_read ? 'thread unread' : 'thread'} >
               
                <Row className="e-card" onClick={() => navigate("/postbox/conversion/"+item.id)}  >
                  <Col lg={1}>
                  <div className="bar">
                      <img className="rounded-circle" src={item.image} width=""/>
                       
                  </div>
                  </Col>
                   <Col lg={11}>
                    <div className="timestap"  >{item.created_at}</div>
                   <h4>{item.user_name} {item.last_name}</h4>
                   <h2 className="e-card-title mt-0">{item.subject} </h2>
                  
                  <div className="e-card-content">{item.message}
                    { (item?.unred_count) ? 
                 <span className="badge badge-yellow">{item?.unred_count}</span> :
                 <span></span>
                
               }
                  </div>
                  </Col>
                  </Row>
                 
                </li>
              ))}
              </ul>
                 
              </div>
        </React.Fragment>
      }
        {noData === true ? (<div className="text-center p-5">No result found</div>) : ""}
         </div>
         
    </React.Fragment>
         
  )
}

export default Postbox;