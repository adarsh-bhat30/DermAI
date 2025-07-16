import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate submission success
    setSubmitted(true);
    // Here you can integrate your backend API or email service
  };

  return (
    <>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or need assistance? We'd love to hear from you!
          Please fill out the form below and we'll get back to you as soon as possible.
        </p>

        {submitted ? (
          <div className="success-message">
            Thank you for reaching out! We will respond shortly.
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Your full name"
            />

            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="your.email@example.com"
            />

            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5" 
              placeholder="Write your message here..."
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Contact;
