import React, { useState, useContext } from 'react';
import { PlansContext } from '../contexts/PlansContext';
import Modal from './Modal';

const CTASection = () => {
  const { content, plans, url } = useContext(PlansContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    phoneNumber: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
    setFormData({ type: '', phoneNumber: '', email: '' });
    setError('');
    setSuccess('');
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({ type: '', phoneNumber: '', email: '' });
    setError('');
    setSuccess('');
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.type.trim()) {
      setError('Please select an access duration');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        type: formData.type,
        gmail: formData.email,
        phoneNumber: formData.phoneNumber
      };

      const response = await fetch(url+'/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Discount claim submitted successfully!');
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setError(result.message || 'Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (content.length == 0) return <></>;
  if (plans.length == 0) return <></>;
  
  return (
    <section className="cta-section">
      <div className="plan-details">{content[1]["content"]}</div>
      <button onClick={handleOpenModal}>Claim Discount</button>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.5rem',width:'100%'}}>
          <label style={{fontWeight:500}}>Access Duration
            <select 
              name="type" 
              value={formData.type}
              onChange={handleInputChange}
              style={selectStyle}
            >
              <option value="">Select a plan</option>
              {plans.map((plan, i) => (
                <option key={i} value={plan.title}>{plan.title}</option>
              ))}
            </select>
          </label>
          <label style={{fontWeight:500}}>Phone Number
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="This is an optional" 
              style={inputStyle} 
            />
          </label>
          <label style={{fontWeight:500}}>Email address
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Abc@def.com" 
              style={inputStyle} 
            />
          </label>
          
          {error && (
            <div style={{color: 'red', fontSize: '0.9rem', textAlign: 'center'}}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{color: 'green', fontSize: '0.9rem', textAlign: 'center'}}>
              {success}
            </div>
          )}
          
          <button 
            type="submit" 
            style={{
              ...submitStyle,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Purchase Access Code'}
          </button>
        </form>
      </Modal>
    </section>
  )
};

const inputStyle = {
  width: '100%',
  marginTop: '0.5rem',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#222',
  boxSizing: 'border-box',
};
const submitStyle = {
  marginTop: '1.5rem',
  padding: '0.7rem 0',
  borderRadius: '5px',
  border: 'none',
  background: '#b89553',
  color: '#fff',
  fontWeight: 500,
  fontSize: '1.1rem',
  cursor: 'pointer',
};

const selectStyle = {
  width: '100%',
  marginTop: '0.5rem',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#222',
  boxSizing: 'border-box',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default CTASection;
