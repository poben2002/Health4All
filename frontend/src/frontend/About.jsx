import React from 'react';
import Navbar from './Navbar';


const About = () => {
  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>About</h1>

        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            This project was created to examine the relationship between social determinants of health—such as income, race, education, and healthcare
            access—and cancer outcomes in Seattle’s communities. By analyzing and visualizing this data, we aim to uncover patterns that may reveal
            disparities in health, with a specific focus on cancer rates across different neighborhoods and zip codes. At its core, this project strives to:
          </p>

          <div className="mission-box">
            <strong>Identify Health Disparities:</strong>
            <p>Explore patterns in behavior risk factors, education, and access to healthcare.</p>
          </div>
          <div className="mission-box">
            <strong>Promote Equity:</strong>
            <p>Help policymakers, community organizations, and healthcare providers address health inequities.</p>
          </div>
          <div className="mission-box">
            <strong>Empower Communities:</strong>
            <p>Enable individuals to make informed decisions for improved health outcomes.</p>
          </div>
        </div>

        <div className="mission-section">
          <h2>Why It Matters</h2>
          <p>
            Social determinants of health are key factors that shape how individuals and communities experience health outcomes.
            These factors—such as where you live, your income level, your access to quality education,
            and your healthcare options—often dictate the kind of health challenges a community will face.
            In Seattle, as in many other cities, these factors can influence the likelihood of developing serious diseases, including cancer.
            By connecting this social data to cancer rates across neighborhoods, this project seeks to:
          </p>
          <ul>
            <li>Identify patterns that may reveal higher or lower cancer risks based on social conditions.</li>
            <li>Inform public health strategies aimed at addressing these disparities.</li>
            <li>Encourage local residents to engage in discussions about improving health equity.</li>
          </ul>
        </div>

        <div className="team-section">
          <h2>The Team Behind the Project</h2>
          <p>Some general description of all of us...</p>
          <div className="team-members">
            <div className="team-card">
              <img src="placeholder.jpg" alt="Team Member" />
              <p><strong>Benjamin Po</strong></p>
              <p>Bio...</p>
            </div>
            <div className="team-card">
              <img src="placeholder.jpg" alt="Team Member" />
              <p><strong>Noah Karst</strong></p>
              <p>Bio...</p>
            </div>
            <div className="team-card">
              <img src="placeholder.jpg" alt="Team Member" />
              <p><strong>Halle Hwang</strong></p>
              <p>Bio...</p>
            </div>
            <div className="team-card">
              <img src="placeholder.jpg" alt="Team Member" />
              <p><strong>Dahira Abukar</strong></p>
              <p>Bio...</p>
            </div>
            <div className="team-card">
              <img src="placeholder.jpg" alt="Team Member" />
              <p><strong>Caleb Lee</strong></p>
              <p>Bio...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>Contact Us<br />someemail@uw.edu</p>
      </div>
    </div>
  );
};

export default About;