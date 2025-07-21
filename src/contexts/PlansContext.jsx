import React, { createContext, useState, useEffect } from 'react';

export const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [url, setUrl] = useState(`${import.meta.env.VITE_API_URL}`);
  const [card, setCard] = useState([]);
  const [content, setContent] = useState([]);


  useEffect(() => {
    fetch(url + '/api/plans')
      .then(res => res.json())
      .then(data => {
        setPlans(data);
      })
      .catch(() => {
        setError('Failed to load plans');
      });
    fetch(url + '/api/content1')
      .then(res => res.json())
      .then(data => {
        setCard(data);
      })
      .catch(() => {
        setError('Failed to load plans');
      });
    fetch(url + '/api/content2')
      .then(res => res.json())
      .then(data => {
        setContent(data);
      })
      .catch(() => {
        setError('Failed to load plans');
      });
  }, []);


  return (
    <PlansContext.Provider value={{ plans, url, card, content }}>
      {children}
    </PlansContext.Provider>
  );
};