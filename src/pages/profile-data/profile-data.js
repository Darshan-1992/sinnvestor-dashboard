import { useState } from 'react';
import {    Tabs, Tab } from 'react-bootstrap';
import PersonalData from 'pages/profile-data/components/personal-data/personal-data';
import ChangePassword from 'pages/profile-data/components/change-password/change-password';
import ChangeEmail from 'pages/profile-data/components/change-email/change-email';

const ProfileData = () => {
  const [currantTab, setCurrantTab] = useState('profileData');
  return (

            <div className='custom-tabs'>
              <Tabs
                activeKey={currantTab}
                onSelect={(value) => setCurrantTab(value)}
                className="mb-5"
              >
                <Tab eventKey="profileData" title="Personal Data">
                  <PersonalData />
                </Tab>
                <Tab eventKey="changePassword" title="Change Password">
                  <ChangePassword />
                </Tab>
                <Tab eventKey="changeEmail" title="Change Email">
                  <ChangeEmail />
                </Tab>
              </Tabs>
            </div>
         
  )
}

export default ProfileData;