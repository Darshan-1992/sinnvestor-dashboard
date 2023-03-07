import React, { useEffect, useState } from "react";
import { Col, ProgressBar, Row, Button, Form, ToastContainer, Toast } from 'react-bootstrap';
import 'components/opportunity-card/opportunity-card.scss';
import { goToProjectUrl } from 'Utils/ApiHelper';
import DownloadIcon from "components/icons/download-icon";
import { postData, getData } from 'Utils/ApiHelper';
import ReactPlayer from 'react-player'
import Modal from 'react-modal';
import { useForm, Controller } from "react-hook-form";

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const OpportunityCard = (props) => {

  const { agree_docroom, video, pitch_video, nextcloud_link, document_file, url_project_title, project_title, project_image, category_card, project_desc, amount, amount_get, total_investors, days_left, percentage, checkpoint } = props;
  let subtitle;
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({});
  const [toastShow, setToastShow] = useState(false);

  const [message, setMessage] = useState('');
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const playVideo = function play() {
    setIsLoading(true);



  };

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = event => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsSubscribed(current => !current);
  };

  const onSubmit = (data) => {
    console.log(data);

    postData({ data, api: "api/user/agree" })
      .then(async (response) => {
        console.log('response', response);
        if (response.success == true) {
          // alert(response?.message);
          setToastShow(true);
          setMessage(response?.message);
          window.location.href = nextcloud_link;
        }
      }).catch((error) => {
        console.log('error', error);
      })
  };


  return (
    <div className='opportunity-card' >
      <div className='opportunity-img-wrapper'>
        {video ?
          <div >

            {isLoading ?
              <ReactPlayer url={video} playing={true} />
              : <div className="responsive-video-container" style={{ backgroundImage: `url(${project_image})` }}>
                <svg className="svg" onClick={() => playVideo()} fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path d="M 23.919922 4 C 12.873922 4 3.9199219 12.954 3.9199219 24 C 3.9199219 35.046 12.873922 44 23.919922 44 C 34.965922 44 43.919922 35.046 43.919922 24 C 43.919922 12.954 34.965922 4 23.919922 4 z M 19.498047 16.154297 C 19.737047 16.154297 19.977219 16.211125 20.199219 16.328125 L 32.251953 22.673828 C 32.746953 22.933828 33.053734 23.442953 33.052734 24.001953 C 33.052734 24.560953 32.746953 25.068125 32.251953 25.328125 L 20.199219 31.671875 C 19.978219 31.787875 19.737047 31.845703 19.498047 31.845703 C 19.230047 31.845703 18.963609 31.772906 18.724609 31.628906 C 18.270609 31.354906 18 30.87375 18 30.34375 L 18 17.65625 C 18 17.12625 18.270609 16.645094 18.724609 16.371094 C 18.963609 16.226094 19.231047 16.154297 19.498047 16.154297 z"></path></svg>
              </div>
            }
          </div>
          : null
        }

      </div>
      <div className='opportunity-body'>
        <Row className='align-items-center'>
          <Col>
            <h2 className='opportunity-title pb-0'>{project_title}</h2>
          </Col>
          <Col xs='auto'>
            <img src={category_card} width={40} alt={project_title} />

          </Col>
        </Row>
        <p className='mt-2'>{project_desc}</p>
        <div className='mt-3 position-relative'>
          <ProgressBar variant='info' now={percentage} />
          <div className='checkpoint' style={{ left: '{checkpoint}%' }} />
        </div>
        <Row className='align-items-center mt-4'>
          <Col className='text-center'>
            <div className='raised-value'>{amount_get} </div>
            <div className='raised-label'>invested</div>
          </Col>
          <Col className='text-center'>
            <div className='raised-value'>{total_investors}</div>
            <div className='raised-label'>Investors</div>
          </Col>
          <Col className='text-center'>
            <div className='raised-value'>{days_left}</div>
            <div className='raised-label'>days left</div>
          </Col>
        </Row>
      </div>
      <div>
        <a href={document_file} target="_blank" className="btn btn-primary mt-2" > Deal Teaser <DownloadIcon style={'ms-3'} /></a>
      </div>
      <div>
        <a href="javascript://" onClick={() => goToProjectUrl(url_project_title)} className="btn btn-primary mt-2"> Visit Company profile on Fundernation</a>
      </div>
      <div>
        {agree_docroom == "1" ? <a href={nextcloud_link} target="_blank" className="btn btn-primary mt-2"> Access Due diligence Dataroom</a> :
          <a href="javascript://" onClick={openModal} className="btn btn-primary mt-2"> Access Due diligence Dataroom</a>
        }
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Access Docroom"
      >
        <div className="model-body">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ 'float': 'left' }}>Access Docroom ?</h2>
          <a href="javascript://" className="close-button" onClick={closeModal} style={{ 'float': 'right' }}>x</a>
        </div>
        <div>
          <p className="mt-6">You're going to redirect after you agree to the terms.</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="agree"
                {...register("agree")}
                label="Please check agree"
                style={{ fontWeight: 500 }}
                rules={{
                  required: true,
                }}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" disabled={!isSubscribed} className="btn btn-primary mt-2">Update</Button>
          </Form>
          <div>
          </div>
        </div>
      </Modal>

      <ToastContainer className="p-3 position-fixed" position="top-end">
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={9000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default OpportunityCard;