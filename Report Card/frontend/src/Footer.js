import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer" style={{"backgroundColor":"lightgreen"}}>
      &copy; {currentYear} All Rights Reserved | Created by Group A
    </div>
  );
};

export default Footer;
