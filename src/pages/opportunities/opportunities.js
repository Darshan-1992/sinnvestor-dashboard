import { useState } from 'react';
import {  Tabs, Tab } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router';



import Voting from 'pages/opportunities/components/voting/voting';
import SinnvestmentOpportunities from 'pages/opportunities/components/sinnvestment-opportunities/sinnvestment-opportunities';

const Opportunities = ( ) => {
  const { tabs } = useParams();
  const navigate = useNavigate();
  console.log(tabs);
  const [currantTab, setCurrantTab] = useState(( tabs != 'voting' ? 'opportunities' :'voting'));
  return (
    
            <div className='custom-tabs'>
              <Tabs
                activeKey={currantTab}
                onSelect={(value) => setCurrantTab(value)}
                className="mb-5"
              >
                <Tab eventKey="opportunities" title="Sinnvestment opportunities">
                  <SinnvestmentOpportunities stateChanger={setCurrantTab} />
                </Tab>
                <Tab eventKey="voting" title="Voting"  >
                  <Voting />
                </Tab>
              </Tabs>
            </div>
         
  )
}

export default Opportunities;