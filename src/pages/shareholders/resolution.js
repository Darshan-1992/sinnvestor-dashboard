import React, { useEffect, useState } from 'react';
import { Row, Col,ToastContainer,Toast,Button,ProgressBar  } from 'react-bootstrap';
import PastVoting from 'components/past-voting/past-voting';
import OngoingVoting from 'components/ongoing-voting/ongoing-voting';
import { getData,postData } from 'Utils/ApiHelper';
import {Link} from 'react-router-dom';
import { useParams,useNavigate } from 'react-router';
import "pages/postbox/postbox-list.scss";
import "pages/shareholders/styles.scss";


const Resolution = () => {
	  const [voted, setvoted] = useState(false);

	const { id } = useParams();
  const navigate = useNavigate();
const [noData, setNoData] = useState(false);

    const [item, setlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    
  const [toastShow, setToastShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/shareholder/'+id });
    setlist(response.shareHolder);
     
      setIsLoading(false);
          setvoted((response.shareHolder.my_vote == null) ? false : true);

  }
    const setVote = (vote, id ) => {
   // const postVote = (vote , id) => {
   
   
    var data = {
      "vote": vote, 
      "id": id.id,   
    }
   
// setMyVoteNo(vote)
     postData({ data, api: "api/user/shrareholder_vote" })
    .then(async (response) => {
      console.log('response', response);
      if(response.success==true){
        // alert(response?.message);
           setToastShow(true);
            setErrorShow(false);
           setMessage(response?.message);
           setIsLoading(true);
           fetchData();
           // navigate('/opportunities/voting');
            // window.location.href =  'http://'+window.location.host+'/sinnvestor-dashboard/opportunities/voting';
          
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

  // }
}
 
 
  return (
        <React.Fragment>
        { isLoading ?
        <div className='p-5 text-center fw-bold'>
          Loading...
        </div>
        :
        <React.Fragment>

            
            <div className='postbox-section'>
              <div className='sub-heading'>
                <h3>{item.title}</h3>
                 
              </div>
              <div className='postbox-list'>
              <ul>
              <li className="thread">

   
               
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
                 {voted ?
        <React.Fragment>
          <div className='voting-text'>Voted: {item.voted_users}/{item.total_users}</div>
          { (item.yes_voted_percntage + item.no_voted_percntage ) >= 75 ? <p>Quorum Reached</p> :  <p>Quorum Not Reached</p> } 
          <div className='voting-progressbar'>
          <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>Yes { (item.my_vote==1) ? <label>(including my vote)</label>: ''}</div>
              <ProgressBar variant='info' now={item.yes_voted_percntage} label={`${item.yes_voted_percntage}%`} />
            </div>
            <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>No { (item.my_vote==0) ? <label>(including my vote)</label>:''}</div>
              <ProgressBar variant='primary' now={item.no_voted_percntage} label={`${item.no_voted_percntage}%`} />
            </div>
            
              <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>No Voted</div>
              <ProgressBar variant='primary' now={item.not_voted_percntage} label={`${item.not_voted_percntage}%`} />
            </div>
            
          </div>
          <div className='mt-4'>
          <Button variant="secondary" onClick={() => {
          setvoted(false)
          
        }}>Change vote</Button>
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <h2 className='voting-text'>Vote:</h2>
          <div className='mt-3 d-flex gap-2 '>
              <Button variant="primary" className='w-30' onClick={() => {
         
               setVote(false,{id})
        }} >No</Button>
              <Button variant="info" className=' w-30' onClick={() => {
         setVote(true,{id})
        }}>Yes</Button>
          </div>
        </React.Fragment>
      }
                    
                  </Col>
                   
                  </Row>
                 
              
                 
              </li>
              </ul>
              </div>
               </div>

       <ToastContainer className="p-3 position-fixed" position="top-end">
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={9000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
        </React.Fragment>
    }
     </React.Fragment>
  )
}
export default Resolution;