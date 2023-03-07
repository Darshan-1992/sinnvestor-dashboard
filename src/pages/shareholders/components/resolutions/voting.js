import React, { useEffect, useState } from 'react';
import { Row, Col,ToastContainer,Toast  } from 'react-bootstrap';
import PastVoting from 'components/past-voting/past-voting';
import OngoingVoting from 'components/ongoing-voting/ongoing-voting';
import { getData,postData } from 'Utils/ApiHelper';

import 'pages/opportunities/components/voting/voting.scss';

const Voting = () => {
    const [diligence, setDiligence] = useState(false);
  const [contact, setContact] = useState(false);

  const [data, setData] = useState([]);
  const [length, setLength] = useState();
  const [noDataOngoing, setNoDataOngoing] = useState(false);
  const [noDataExpired, setNoDataExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);
 

  const fetchData = async () => {
    let response = await getData({ api: 'api/user/opportunity_vote' });
    console.log(response);
    setData(response);
    // setLength();
    if(response.ongoing.length === 0){
      setNoDataOngoing(true)
    }
     if(response.expired.length === 0){
      setNoDataExpired(true)
    }
    setIsLoading(false);

  };
  console.log(length);
  const parentFunction = (vote, id ) => {
   // const postVote = (vote , id) => {
   
   
    var data = {
      "vote": vote, 
      "id": id.id,   
    }
   
// setMyVoteNo(vote)
     postData({ data, api: "api/user/send_vote" })
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
      <div className="sub-heading">
        <h3>Ongoing voting</h3>
      </div>
      <div className="ongoing-wrapper">
        {isLoading ?
        <div className='p-5 text-center fw-bold'>
          Loading...
        </div>
        :
        <Row className="gx-5">
         
            
             {data.ongoing?.map((item) =>
         
            <OngoingVoting {...item} key={item.id}   parentFunction  = {parentFunction } 
 />
          )}
          {noDataOngoing === true ? (<div className="text-center p-5">No result found</div>) : ""}
         
        </Row>
         }
      </div>
      
      <div className="sub-heading">
        <h3>Past voting</h3>
      </div>
    
      <Row className="gx-5">

             {data.expired?.map((item) =>
         
            <PastVoting {...item} key={item.id} />
          )}
       {noDataExpired === true ? (<div className="text-center p-5">No result found</div>) : ""}
      </Row>
      
       <ToastContainer className="p-3 position-fixed" position="top-end">
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={9000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
    </React.Fragment>
  )
}
export default Voting;