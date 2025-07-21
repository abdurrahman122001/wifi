import React, { useContext } from 'react';
import { PlansContext } from '../contexts/PlansContext';

import icon1 from '../assets/icon1.svg';
import icon2 from '../assets/icon2.svg';
import icon3 from '../assets/icon3.svg';

const features = [
  {
    icon: icon1,
    title: 'Unlimited Data',
    details: ['No more top-ups! Ever.'],
    bold: true,
  },
  {
    icon: icon2,
    title: 'Up to 180 Mbps',
    details: ['Power business and stream without buffering.', 'only with Chafinity!'],
    bold: true,
    red: true,
  },
  {
    icon: icon3,
    title: 'Flexible Logins',
    details: ['One device or bulk!'],
    bold: true,
  },
];

const FeaturesSection = () => {
  const { url, card, content } = useContext(PlansContext);

  if (url.length == 0) return <></>;
  if (content.length == 0) return <></>;
  if (card.length == 0) return <></>;
  return (
    <section className="features-section">
      <div className="plan-title">{content[2]["content"]}</div>
      <div className="features-section-card">
        {card.map((feature, i) => (
          <div className="feature" key={i}>
            <div className="icon"><img src={url + "/uploads/" + feature.image} alt="" /></div>
            <div className={`plan-details plan-details-bold`}>{feature.title}</div>
            <div className="plan-details">{feature.subtitle}</div>
            {feature.description && <div className="plan-details-red">{feature.description}</div>}
          </div>
        ))}
      </div>
    </section>
  )
};

export default FeaturesSection;
