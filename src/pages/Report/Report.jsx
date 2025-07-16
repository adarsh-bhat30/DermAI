import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Report.css';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, response } = location.state || {};

  if (!formData || !response?.data?.prediction) {
    return (
      <div style={{ padding: '40px' }}>
        <h1>No data provided</h1>
        <button onClick={() => navigate('/diagnosis')}>Go Back</button>
      </div>
    );
  }

  const { label, confidence } = response.data.prediction;
  const accuracy = confidence.toFixed(2);
  const resultClass = label.toLowerCase() + '-result';

  return (
    <div className="report-container">
      <h1>Diagnosis Report</h1>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Age:</strong> {formData.age}</p>
      <p><strong>Sex:</strong> {formData.sex}</p>
      <p><strong>Issue Location:</strong> {formData.location}</p>

      <div className="report-image">
        <img src={URL.createObjectURL(formData.image)} alt="Uploaded Skin" />
      </div>

      <div className={`report-result ${resultClass}`}>
        <p>
          <strong>Result:</strong> The skin lesion appears to be <strong>{label}</strong>{' '}
          with a confidence of <strong>{accuracy}%</strong>.
        </p>
      </div>
    </div>
  );
};

export default Report;
