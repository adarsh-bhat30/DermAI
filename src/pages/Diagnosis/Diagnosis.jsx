import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Diagnosis.css';

const Diagnosis = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',        // added sex
    location: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!formData.image || !formData.name || !formData.age || !formData.location || !formData.sex) return;

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('sex', formData.sex);         // append sex
    data.append('location', formData.location);
    data.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:510/api/diagnosis', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      // Navigate to /report with formData and server response
      navigate('/report', { state: { formData, response: result } });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit data to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <h1>Skin Diagnosis</h1>
      <form className="diagnosis-form" onSubmit={e => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="0"
            required
          />
        </label>

        <label>
          Sex:
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Location of Skin Issue:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Left Arm, Face"
            required
          />
        </label>

        <label className="upload-label">
          Upload Skin Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
      </form>

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Skin preview" />
        </div>
      )}

      <button
        className="analyze-button"
        onClick={handleAnalyze}
        disabled={loading || !formData.image || !formData.name || !formData.age || !formData.location || !formData.sex}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
};

export default Diagnosis;
