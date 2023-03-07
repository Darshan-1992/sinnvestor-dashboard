import React, { useEffect, useState } from 'react';
import { Row, Col,ToastContainer,Toast,Button  } from 'react-bootstrap';
import PastVoting from 'components/past-voting/past-voting';
import OngoingVoting from 'components/ongoing-voting/ongoing-voting';
import { getData,postData } from 'Utils/ApiHelper';
import {Link} from 'react-router-dom';
import { useParams,useNavigate } from 'react-router';
import 'pages/shareholders/components/ongoing-resolutions/ongoing-resolutions.scss';

const OnGoingResolutions = () => {
  const navigate = useNavigate();
const [noData, setNoData] = useState(false);

    const [list, setlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/shareholder_resolutions/ongoing' });
    setlist(response);
     if(response.length === 0){
        setNoData(true);

    }
      setIsLoading(false);
  }
 
 
  return (
       <React.Fragment>
              <div className='postbox-section'>
               <div className='sub-heading'>
               
                 <Link to="/resolution/create" className="btn btn-primary">+ Create New poll</Link>
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
               
                <Row className="e-card" >
                  <Col lg={1}>
                  <div className="bar">
                      <img className="rounded-circle" src={item.image} width=""/>
                       
                  </div>
                  </Col>
                   <Col lg={11}>
                    <div className="timestap text-success text-bold"  > Voting deadline {item.end_date}</div>
                   <h4>{item.user_name} {item.last_name}</h4>
                   <h2 className="e-card-title mt-0">{item.title} </h2>
                  
                  <div className="e-card-content">{item.description}
                
               
                  </div>
                  </Col>
                   <Col lg={1}>
                   </Col>
                   <Col lg={11} className="mt-3">
                   <div className="fl">
                   <h2 className="">Voted: {item.voted_users}/{item.total_users}</h2>
                   
                     { (item.yes_voted_percntage + item.no_voted_percntage ) >= 75 ? <p className="text-success ">Quorum Reached</p> :  <p className="text-danger ">Quorum Not Reached</p> }
                   </div>
                   {item.my_vote==null? 

                     <Button variant="info" className='fr'  onClick={() => navigate("/resolution/"+item.id)} >Vote Now</Button>
                     :
                      <Button variant="secondary"  className='fr' onClick={() => navigate("/resolution/"+item.id)} >Change vote</Button>
                    }
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
export default OnGoingResolutions;