import React from 'react';
import { InstagramOutlined, WhatsAppOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>Urbane Living</h3>
          <p>Redefining luxury interiors with precision engineering and modern aesthetics.</p>
        </div>
        
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/kitchen">Modular Kitchen</Link></li>
            <li><Link to="/bedroom">Bedroom</Link></li>
            <li><Link to="/portfolio">Our Portfolio</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link target='blank' to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link target='blank' to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link target='blank' to="/refund-policy">Refund Policy</Link></li>
            <li><Link target='blank' to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/urbanelivingofficial/" target='_blank' rel="noopener noreferrer"><InstagramOutlined /></a>
            <a href="https://wa.me/919560555103" target='_blank' rel="noopener noreferrer"><WhatsAppOutlined /></a>
            <a href="https://www.linkedin.com/company/urbaneliving" target='_blank' rel="noopener noreferrer"><LinkedinOutlined /></a>
          </div>
          <a href="mailto:urbanelivingofficial@gmail.com" className="contact-email">
            <MailOutlined /> urbanelivingofficial@gmail.com
          </a>
        </div>
      </div>
      <div className="footer-bar">
        <p>© 2026 Urbane Living. Crafted for Excellence.</p>
      </div>
    </footer>
  );
};
export default Footer;