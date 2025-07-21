import React, { useContext } from 'react';
import { PlansContext } from '../contexts/PlansContext';

const Header = () => {
  const { url, content } = useContext(PlansContext);
  
  if (url.length == 0) return <></>;
  if (content.length == 0) return <></>;
  return (
    <header className="header-section">
      <img src={url + "/uploads/logo/logo.jpg"} alt="Logo" />
      <div className="header-section-content">
        <h1>{content[5]["content"]}</h1>
        <p>{content[4]["content"]}</p>
      </div>
    </header>
  )
};

export default Header;
