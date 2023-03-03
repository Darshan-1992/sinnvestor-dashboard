import { ProgressBar ,Col } from 'react-bootstrap';
import 'components/past-voting/past-voting.scss';

const PastVoting = (props) => {
   const { title, id,expiry, project_title, voted_users,total_users, yes_voted_percntage,no_voted_percntage,not_voted_percntage,my_vote} = props;
  return (
      <Col md={6}>
    <div className='voting-card'>
      <div className='voting-date'>Voting deadline: {expiry}</div>
      <div className='voting-name'>{ title}</div>
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
    </div>
    </Col>
  )
}

export default PastVoting;