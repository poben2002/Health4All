import React from 'react';
import Navbar from './Navbar';


const About = () => {
  return (
    <div>
      <Navbar />

      <div className="w-full h-[400px] bg-cover bg-no-repeat bg-top-center text-white flex items-center justify-center"
      style={{ backgroundImage: 'url("https://57hours.com/wp-content/uploads/2022/07/hikes-mount-rainier-national-park-768x432.jpg")' }}>
      <h1 className="text-4xl font-semibold text-white text-center drop-shadow-md">About</h1>
      </div>

      <div className="container p-8">
      <div className="w-full max-w-5xl mx-auto text-left px-8 mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            This project was created to examine the relationship between social determinants of health—such as income, race, education, and healthcare
            access—and cancer outcomes in Seattle’s communities. By analyzing and visualizing this data, we aim to uncover patterns that may reveal
            disparities in health, with a specific focus on cancer rates across different neighborhoods and zip codes. At its core, this project strives to:
          </p>

          <div className="mission-box mt-4">
            <strong>Identify Health Disparities:</strong>
            <p>Explore patterns in behavior risk factors, education, and access to healthcare.</p>
          </div>
          <div className="mission-box mt-4">
            <strong>Promote Equity:</strong>
            <p>Help policymakers, community organizations, and healthcare providers address health inequities.</p>
          </div>
          <div className="mission-box mt-4">
            <strong>Empower Communities:</strong>
            <p>Enable individuals to make informed decisions for improved health outcomes.</p>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto text-left px-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Why It Matters</h2>
          <p className="mb-4">
            Social determinants of health are key factors that shape how individuals and communities experience health outcomes.
            These factors—such as where you live, your income level, your access to quality education,
            and your healthcare options—often dictate the kind of health challenges a community will face.
            In Seattle, as in many other cities, these factors can influence the likelihood of developing serious diseases, including cancer.
            By connecting this social data to cancer rates across neighborhoods, this project seeks to:
          </p>
          <ul className="list-disc ml-8 mt-4">
            <li>Identify patterns that may reveal higher or lower cancer risks based on social conditions.</li>
            <li>Inform public health strategies aimed at addressing these disparities.</li>
            <li>Encourage local residents to engage in discussions about improving health equity.</li>
          </ul>
        </div>

        <div className="team-section mb-8">
          <h2 className="text-2xl font-semibold mb-4">The Team Behind the Project</h2>
          <p>University of Washington Winter and Spring 2025 Capstone</p>
          <div className="team-members mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="team-card text-center">
              <img src="placeholder.jpg" alt="Team Member" className="rounded-full w-32 h-32 mx-auto" />
              <p><strong>Benjamin Po</strong></p>
              <p>Frontend / Backend Dev</p>
            </div>
            <div className="team-card text-center">
              <img src="placeholder.jpg" alt="Team Member" className="rounded-full w-32 h-32 mx-auto" />
              <p><strong>Noah Karst</strong></p>
              <p>UI/UX Designer & GIS</p>
            </div>
            <div className="team-card text-center">
              <img src="placeholder.jpg" alt="Team Member" className="rounded-full w-32 h-32 mx-auto" />
              <p><strong>Halle Hwang</strong></p>
              <p>Frontend Dev</p>
            </div>
            <div className="team-card text-center">
              <img src="placeholder.jpg" alt="Team Member" className="rounded-full w-32 h-32 mx-auto" />
              <p><strong>Dahira Abukar</strong></p>
              <p>PM & UI/UX</p>
            </div>
            <div className="team-card text-center">
              <img src="placeholder.jpg" alt="Team Member" className="rounded-full w-32 h-32 mx-auto" />
              <p><strong>Caleb Lee</strong></p>
              <p>Backend Dev</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer text-center py-4 bg-gray-800 text-white">
        <p>Contact Us<br />someemail@uw.edu</p>
      </div>
    </div>
  );
};

export default About;
