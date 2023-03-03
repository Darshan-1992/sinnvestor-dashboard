import React, { useEffect, useState } from 'react';
import { Button, ProgressBar,Col,ToastContainer,Toast  } from 'react-bootstrap';
import 'components/past-voting/past-voting.scss';
import { postData,getData } from 'Utils/ApiHelper';
import { Link, useNavigate, useParams } from "react-router-dom";

interface ChildProps {
  parentFunction: Function
}

const OngoingVoting = (props: ChildProps) => {
  const { title, id,expiry, project_title, voted_users,total_users, yes_voted_percntage,no_voted_percntage,not_voted_percntage,my_vote} = props;
  const [voted, setvoted] = useState(false);
  // const [my_vote_yes, setMyVoteYes] = useState(false);
  // const [my_vote_no, setMyVoteNo] = useState(false);
  
   useEffect(() => {
    setvoted((my_vote == null) ? false : true);

  }, [my_vote]);
   

  return (
     <Col md={6}>
    <div className='voting-card'>
      <div className='voting-date text-success'>Voting deadline: {expiry}</div>
      <div className='voting-name'>{ title}</div>
      {voted ?
        <React.Fragment>
          <div className='voting-text'>Voted: {voted_users}/{total_users}</div>
          { (yes_voted_percntage + no_voted_percntage ) >= 75 ? <p>Quorum Reached</p> :  <p>Quorum Not Reached</p> } 
          <div className='voting-progressbar'>
          <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>Yes { (my_vote==1) ? <label>(including my vote)</label>: ''}</div>
              <ProgressBar variant='info' now={yes_voted_percntage} label={`${yes_voted_percntage}%`} />
            </div>
            <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>No { (my_vote==0) ? <label>(including my vote)</label>:''}</div>
              <ProgressBar variant='primary' now={no_voted_percntage} label={`${no_voted_percntage}%`} />
            </div>
            
              <div className='voting-progressbar-item'>
              <div className='voting-progressbar-label'>No Voted</div>
              <ProgressBar variant='primary' now={not_voted_percntage} label={`${not_voted_percntage}%`} />
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
          <div className='voting-text'>Do you vote for a Sinnvestment participation?</div>
          <div className='mt-3 d-flex gap-2'>
              <Button variant="primary" className='flex-fill' onClick={() => {
         
               props.parentFunction(false,{id})
        }} >No</Button>
              <Button variant="info" className='flex-fill' onClick={() => {
         props.parentFunction(true,{id})
        }}>Yes</Button>
          </div>
        </React.Fragment>
      }
    </div>
    
    </Col>
  )
}

export default OngoingVoting;