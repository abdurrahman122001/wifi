import React, { useContext } from 'react';
import { PlansContext } from '../contexts/PlansContext';

const Footer = () => {
  const { content } = useContext(PlansContext);

  if (content.length == 0) return <></>;
  return (
    <footer className="footer-section">
      <nav>
        <div className="plan-details">About</div>
        <div className="plan-details">Contact</div>
        <div className="plan-details">FAQ</div>
        <div className="plan-details">Terms</div>
      </nav>
      <nav>
        <div className="plan-details">{content[0]["content"]}</div>
      </nav>
      <nav>
        <div className="plan-details"><i className="fa fa-phone" aria-hidden="true"></i></div>
        <div className="plan-details"><i className="fa fa-envelope" aria-hidden="true"></i></div>
        <div className="plan-details"><i className="fa fa-user" aria-hidden="true"></i></div>
      </nav>
    </footer>
  )
};

export default Footer;
