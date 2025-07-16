import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <>
      
      <div className="about-container">
        <h1>About Dermai</h1>
        <p>
          Dermai is an AI-powered skin diagnosis web application designed to help users
          quickly analyze their skin conditions from uploaded photos.
        </p>
        <p>
          Our mission is to provide easy, fast, and reliable preliminary insights
          into common skin issues using the power of artificial intelligence and
          modern web technology.
        </p>
        <h2>How it works</h2>
        <ul>
          <li>Upload a clear photo of the affected skin area</li>
          <li>Fill in a few quick personal details</li>
          <li>Get instant visual feedback and diagnosis suggestions</li>
        </ul>
        <h2>Disclaimer</h2>
        <p>
          Dermai is not a replacement for a professional dermatologist. Always consult
          a licensed medical professional for serious or persistent skin conditions.
        </p>
      </div>
     
    </>
  );
};

export default About;

