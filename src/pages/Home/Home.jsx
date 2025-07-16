import React from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartDiagnosis = () => {
    navigate('/diagnosis');
  };

  const chartData = [
    {
      img: '/images/Type_of_cancers_img.png',
      alt: 'Types of Skin Cancer',
      heading: 'Types of Skin Cancer',
      description:
        'Skin cancer primarily includes melanoma, basal cell carcinoma, and squamous cell carcinoma. This chart provides a breakdown of these types, their relative frequency, and severity. Our AI model is trained to detect features from images corresponding to each type, helping users get early indicators of potentially dangerous lesions. Understanding these types improves self-awareness and medical consultations.',
    },
    {
      img: '/images/year_wise_img.png',
      alt: 'Year-wise Skin Cancer Cases',
      heading: 'Year-wise Skin Cancer Cases',
      description:
        'This graph showcases the alarming increase in skin cancer cases over the years, influenced by climate change, prolonged UV exposure, ozone depletion, and lifestyle changes. Our AI is built with modern data trends in mind, learning from historical datasets to provide insights that are both up-to-date and evidence-driven, especially useful in early detection and tracking potential risk patterns.',
    },
    {
      img: '/images/men_women_skin_cancer_img.png',
      alt: 'Skin Cancer in Men vs Women',
      heading: 'Skin Cancer: Men vs Women',
      description:
        'This comparative insight reveals the differences in skin cancer occurrence between men and women, which can be attributed to behavioral, genetic, and occupational factors. Our AI uses unbiased datasets to ensure accurate predictions for all genders. Knowing these differences aids in crafting targeted awareness campaigns and enhances personalized diagnostic accuracy in real-world usage.',
    },
  ];

  return (
    <div className="home">
      <section className="hero-section animate-fade-in">
        <h1>AI-Powered Skin Cancer Detection</h1>
        <p>
          Upload a photo and get instant predictions for possible skin cancers using advanced
          machine learning models.
        </p>
        <button onClick={handleStartDiagnosis}>Start Diagnosis</button>
      </section>

      {/* Features Section */}
      <Element name="features" className="features-section">
        <h2>How It Works</h2>
        <ul>
          <li>Upload a clear photo of the skin condition</li>
          <li>AI analyzes it in seconds</li>
          <li>Get predictions with confidence score</li>
        </ul>
      </Element>

      {/* Charts/Insights Section */}
      <section className="charts-section">
        {chartData.map((item, index) => (
          <div
            className={`chart-block ${index % 2 === 0 ? 'left-img' : 'right-img'}`}
            key={index}
          >
            <img src={item.img} alt={item.alt} className="chart-img" />
            <div className="chart-description">
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </section>

       {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2>Why Choose Our Model?</h2>
        <ul>
          <li>We care about your well-being and peace of mind.</li>
          <li>Quick and easy results to help you take the next step confidently.</li>
          <li>Completely private — your photos stay on your device.</li>
          <li>Designed for everyone, no medical knowledge needed.</li>
          <li>Built to support you — anytime, anywhere.</li>
        </ul>
      </section>

      {/* Hope Section */}
      <section className="hope-section animate-slide-up">
        <h2>There is Always Hope</h2>
        <p>
          Early detection saves lives. Our AI tool empowers users to take control of their skin
          health through quick, reliable, and private analysis.
        </p>
        <img src="/images/Hope.png" alt="Hopeful Patient" className="hope-img" />
      </section>

     

    </div>
  );
};

export default Home;





