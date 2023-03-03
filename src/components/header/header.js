import { Navbar, Nav, Container, NavDropdown, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

import logo from "assets/images/logo.png";
import userImg from "assets/images/user.png";

import 'components/header/header.scss';
import { login } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';

const Header = () => {
  const [toastShow, setToastShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    onLogin();
  }, []);

  const onLogin = async () => {
    let data =  {
      'logintoken': "ajdgakgdkgkag"
    }

    try {
      let response = await localStorage.getItem('token') ?? '';
      // setToastShow(true);
      // setMessage(response?.message);
      console.log('login', response);
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <Navbar bg="white" expand="lg" className='px-lg-4'>
      <Container fluid>
        <Navbar.Brand href="#" className='me-5'>
          <img src={logo} alt="Sinnvestment" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link href="https://www.sinnvestment.eu#about-us">ÜBER UNS</Nav.Link>
            <Nav.Link href="https://www.sinnvestment.eu#fundernation">FUNDERNATION</Nav.Link>
            <Nav.Link href="https://www.sinnvestment.eu#contact">KONTAKT</Nav.Link>
            <Nav.Link href="https://www.sinnvestment.eu#more">MEHR ERFAHREN</Nav.Link>
          </Nav>

          <Nav
            className="ms-auto my-2 my-lg-0"
            navbarScroll
          >
            <NavDropdown 
              title={ <div><FontAwesomeIcon icon={faEarthAmericas} className="me-1" /> En</div> } 
              id="language" 
              align={{ lg: 'end' }}
            >
                <NavDropdown.Item>English</NavDropdown.Item>
                <NavDropdown.Item>Deutsch</NavDropdown.Item>
              </NavDropdown>
            <Nav.Link href="#" className='p-0 me-0'><img src="https://s3-eu-west-1.amazonaws.com/fundernation.eu/upload/user/user_big_image/no_man.jpg" className="rounded-circle" style={{ width: '37px' }} alt='user'/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ToastContainer className="p-3" position={'top-end'}>
        <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Container>
    </Navbar>
  )
}

export default Header;