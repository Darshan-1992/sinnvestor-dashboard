import React from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { Container, Row, Col} from 'react-bootstrap';
import Aside from 'components/aside/aside';
import { Navigate, Outlet } from 'react-router-dom';


const Layout = () => {

let isLoggedIn =  localStorage.getItem('isLoggedIn');

  return (
    <React.Fragment>
     { isLoggedIn=="true" ? 
    <React.Fragment>
      <Header />
       <section className="section">
        <Container>
          <Row className='gx-5'>
            <Col xs="auto">
              <Aside />
            </Col>
             <Col>
             <Outlet />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </React.Fragment>
     :  <Navigate to="/home" /> }
     </React.Fragment>

  );
}

export default Layout;
