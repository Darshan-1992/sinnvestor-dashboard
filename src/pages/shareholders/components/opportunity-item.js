import OpportunityCard from "components/opportunity-card/opportunity-card";
import React, { useEffect, useState } from "react";
import {  Col, Button } from "react-bootstrap";
import "pages/opportunities/components/sinnvestment-opportunities/sinnvestment-opportunities.scss";
import FileIcon from "components/icons/file-icon";
import DownloadIcon from "components/icons/download-icon";
import ArrowIcon from "components/icons/arrow-icon";
import DueDiligence from "components/due-diligence/due-diligence";
import ContactOptions from "components/contact-options/contact-options";

const OpportunityItem = ({stateChanger, ...props}) => {
  const [diligence, setDiligence] = useState(false);
  const [diligenceBox, setDiligenceBox] = useState(true);
  const [contact, setContact] = useState(false);
  const [contactBox, setContactBox] = useState(true);
  const [hideBox, setHideBox] = useState(true);
  const { 
    title,
    url_project_title,
    project_title,
    project_image,
    category_card,
    project_desc,
    amount,
    amount_get,
    total_investors,
    days_left,
   document_file,
   nextcloud_link,
    video_image,
    pitch_video,
    expiry,
    percentage,
    video,
    agree_docroom
  } = props;
  
  const diligenceHandle = () => {
    setDiligence(!diligence);
    setContact(false);
  }

  const contactHandle = () => {
    setContact(!contact);
    setDiligence(false);
  }

  useEffect(() => {
    if (diligence || contact) {
      setHideBox(false);
    } else {
      setHideBox(true);
    }

    if (diligence) {
      setContactBox(false);
    } else {
      setContactBox(true);
    }

    if (contact) {
      setDiligenceBox(false);
    } else {
      setDiligenceBox(true);
    }
  }, [diligence, contact]);

  return (
    <React.Fragment>
      
          <Col md={6}>
            <OpportunityCard
            url_project_title={url_project_title}
            project_title={project_title} 
            project_image={project_image} 
            category_card={category_card} 
            project_desc={project_desc} 
            amount={amount} 
            amount_get={amount_get}
            total_investors={total_investors} 
            days_left={days_left}
            percentage={percentage}
            document_file={document_file}
            nextcloud_link={nextcloud_link}
            video={video}
            pitch_video={pitch_video}
            agree_docroom={agree_docroom}
             />
              <Button variant="info" className="d-block w-100 mt-2" onClick={() => stateChanger('voting')}>Voting Now</Button>
              <strong className="text-success mt-2" style={{float: 'right'}}>Voting deadline: {expiry}</strong>
          </Col>
       
    </React.Fragment>
  )
}
export default OpportunityItem;

