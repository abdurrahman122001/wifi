import React, { useState,useContext } from 'react';
import img01 from '../assets/01.jpg';
import { PlansContext } from '../contexts/PlansContext';


const Swiper = () => {
  const { url } = useContext(PlansContext);
  return (
    <>
      <section className="swiper">
        <div className="swiper-wrapper">

          <div className="swiper-slide">

            <div className="super-flow-image">
              <img src={url + "/uploads/silder/silder.jpg"} />
            </div>

          </div>
        </div>
        <div className="swiper-pagination"></div>
      </section>
    </>
  );
};

export default Swiper;




