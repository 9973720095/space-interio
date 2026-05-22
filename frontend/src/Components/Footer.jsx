import React from 'react';
import { InstagramOutlined, WhatsAppOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
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
            <li><a href="/kitchen">Modular Kitchen</a></li>
            <li><a href="/bedroom">Bedroom</a></li>
            <li><a href="/portfolio">Our Portfolio</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#"><InstagramOutlined /></a>
            <a href="#"><WhatsAppOutlined /></a>
            <a href="#"><LinkedinOutlined /></a>
          </div>
          <p className="contact-email"><MailOutlined /> hello@spaceinterio.co.in</p>
        </div>
      </div>
      <div className="footer-bar">
        <p>© 2026 Space Interio. Crafted for Excellence.</p>
      </div>
    </footer>
  );
};
export default Footer;