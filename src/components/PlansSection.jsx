import React,{useContext} from 'react';
import { PlansContext } from '../contexts/PlansContext';
import Modal from './Modal';
import { useState } from 'react';

const PlansSection = () => {
  const { plans,url } = useContext(PlansContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
    setFormData({ phoneNumber: '', email: '' });
    setError('');
    setSuccess('');
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
    setFormData({ phoneNumber: '', email: '' });
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
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!selectedPlan?.title) {
      setError('Please select a plan');
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
        type: selectedPlan.title,
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
        setSuccess('Access code request submitted successfully!');
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setError(result.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
    <section className="plans-section">
      {plans.map((plan, i) => (
        <div className="plan-card" key={i}>
          <div className="plan-title">{plan.title}</div>
          <div className="plan-price" dangerouslySetInnerHTML={{ __html: "₦"+plan.price }} />
          {plan.discount && <div className="plan-discount" dangerouslySetInnerHTML={{ __html: plan.discount }} />}
          <div className="plan-details" style={{fontWeight:'bold'}}> {plan.details}</div>
          <div className="plan-extra">{plan.extra}</div>
          <button onClick={() => handleOpenModal(plan)}>Choose Plan</button>
        </div>
      ))}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} style={{zIndex:'2'}}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.5rem',width:'100%'}}>
          <label style={{fontWeight:500}}>Access Duration
            {selectedPlan ? (
              <input type="text" value={selectedPlan.title} style={{...inputStyle, background:'#f5f5f5'}} readOnly />
            ) : (
              <select name="" id="" placeholder="Abc" style={selectStyle}>
                {plans.map((plan, i) => (
                  <option key={i} value={plan.title}>{plan.title}</option>
                ))}
              </select>
            )}
          </label>
          <label style={{fontWeight:500}}>Phone Number
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="This is an Phone Number" 
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
            {isSubmitting ? 'Submitting...' : (selectedPlan ? 'Purchase Access Code' : 'Claim Discount')}
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

export default PlansSection;
