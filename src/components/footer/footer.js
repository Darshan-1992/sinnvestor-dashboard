import { Navbar, Nav, Container, NavDropdown, Toast, ToastContainer,Row,Col } from 'react-bootstrap';



import 'components/footer/footer.scss';
import { login } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [toastShow, setToastShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    
  }, []);

  return (
     <div >
       <div className="footer_content">
            <div className="main">
              <Row className="footer_box">
                <Col id="footer_column_rights" className="footer_column">
                  <h4>rechtliches</h4>
                  <ul>
                    <li><a href="https://www.sinnvestment.eu/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a></li>
                    <li><a href="https://www.sinnvestment.eu/impressum" target="_blank">Impressum</a>
                    </li>
                  </ul>
                </Col>
                <Col id="footer_column_fundernation" className="footer_column">
                  <h4>fundernation</h4>
                  <ul>
                    <li><a href="https://www.fundernation.eu/home" target="_blank">zur Website</a>
                    </li>
                    <li><a href="https://www.fundernation.eu/registrieren" target="_blank">Registrieren</a></li>
                    <li><a href="https://www.fundernation.eu/login/" target="_blank">Login</a></li>
                  </ul>
                </Col>
                <Col id="footer_column_contact" className="footer_column">
                  <div className="contact_data">
                    <h4>kontakt</h4>
                    <p><a href="mailto:fundernation@fundernation.eu">Fundernation(at)Fundernation.eu</a>
                    </p>
                    <p>Tel: +49 6251 8008328</p>
                  </div>
                </Col>
                <Col id="footer_column_follow" className="footer_column">
                  <div id="social_icons">

                    <div className="social_icons">
                      <div>
                        <h4>folgen sie uns</h4>
                      </div>
                      <div>
                        <a href="https://facebook.com/FunderNation" className="fa fa-facebook"></a>
                        <a href="https://linkedin.com/company/fundernation-gmbh" className="fa fa-linkedin"></a>
                        <a href="https://twitter.com/fundernationeu" className="fa fa-twitter"></a>
                        <a href="https://youtube.com/channel/UCIYi8N4CruibiUI-7rLIEjA" className="fa fa-youtube"></a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row> 
             
            </div>
             </div>
            
           <Row className="footerB">
            <div className="main">
              <div className="fl copyright width50">©2022 <span>Sinnvestment GmbH </span>| Alle Rechte
                vorbehalten.</div>
              <div className="clear"></div>
            </div>
          
          </Row>              
         
          </div>

  )
}

export default Footer;