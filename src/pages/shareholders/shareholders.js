import { useState } from 'react';
import {  Tabs, Tab } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router';



import ClosedResolutions from 'pages/shareholders/components/closed-resolutions/closed-resolutions';
import OnGoingResolutions from 'pages/shareholders/components/ongoing-resolutions/ongoing-resolutions';

const Opportunities = ( ) => {
  const { tabs } = useParams();
  const navigate = useNavigate();
  console.log(tabs);
  const [currantTab, setCurrantTab] = useState(( tabs != 'ongoing' ? 'ongoing' :'closed'));
  return (
    
            <div className='custom-tabs'>
              <Tabs
                activeKey={currantTab}
                onSelect={(value) => setCurrantTab(value)}
                className="mb-5"
              >
                <Tab eventKey="ongoing" title="Ongoing Voting">
                  <OnGoingResolutions stateChanger={setCurrantTab} />
                </Tab>
                <Tab eventKey="closed" title="Resolutions"  >
                  <ClosedResolutions />
                </Tab>
              </Tabs>
            </div>
         
  )
}

export default Opportunities;