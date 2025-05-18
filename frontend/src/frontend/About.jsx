import React from 'react';
import Navbar from './Navbar';
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";


function Hero() {
  return (
    <section>
      <div
        className="relative flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat font-inter"
        style={{
          backgroundImage:
            'url("https://57hours.com/wp-content/uploads/2022/07/hikes-mount-rainier-national-park-768x432.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-white opacity-20" />

        <div className="relative z-10 flex flex-col text-center max-w-3xl px-4">
          <h1 className="text-7xl font-bold tracking-tighter text-white leading-tight">
            About Health4All
          </h1>
          <div className="w-full text-center text-xl font-semibold tracking-tighter">
        </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("coming into view")
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      console.log("leaving view")
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="flex flex-wrap gap-16 items-center w-full">
          <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
              <div className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8"> Our Mission</h2>
                <p className="mt-2 text-xl text-left mb-2">

                  This project was created to examine the relationship between social determinants of health—such as income, race, education, and healthcare
                  access—and breast cancer outcomes in Seattle’s communities. By analyzing and visualizing this data, we aim to uncover patterns that may reveal
                  disparities in health, with a specific focus on cancer rates across different neighborhoods and zip codes. At its core, this project strives to:
                </p>
              </div>

              <div className="pl-5 mt-2 text-left text-xl mb-2">
                <strong>Identify Health Disparities:</strong>
                <p>Explore patterns in behavior risk factors, education, and access to healthcare.</p>
              </div>
              <div className="pl-5 mt-2 text-left text-xl mb-2">
                <strong>Promote Equity:</strong>
                <p>Help policymakers, community organizations, and healthcare providers address health inequities.</p>
              </div>
              <div className="pl-5 mt-2 text-left text-xl mb-2">
                <strong>Empower Communities:</strong>
                <p>Enable individuals to make informed decisions for improved health outcomes.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-16 items-center w-full">
              <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
                <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
                  <div className="flex flex-col w-full">
                    <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8"> Why It Matters</h2>
                    <p className="mt-2 text-xl text-left mb-2">
                      Social determinants of health are key factors that shape how individuals and communities experience health outcomes.
                      These factors—such as where you live, your income level, your access to quality education,
                      and your healthcare options—often dictate the kind of health challenges a community will face.
                      In Seattle, as in many other cities, these factors can influence the likelihood of developing serious diseases, including cancer.
                      By connecting this social data to cancer rates across neighborhoods, this project seeks to:
                    </p>

                    <ul className="list-disc text-left ml-8 text-lg mt-4">
                      <li>Identify patterns that may reveal higher or lower cancer risks based on social conditions.</li>
                      <li>Inform public health strategies aimed at addressing these disparities.</li>
                      <li>Encourage local residents to engage in discussions about improving health equity.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AboutData() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="flex flex-wrap gap-16 items-center w-full">
          <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
              <div className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8"> Our Data</h2>
                <p className="mt-2 text-xl text-left mb-2">
                Our map brings together publicly available datasets to visualize breast cancer incidence and key social determinants of health across King County, Washington.
                  Breast Cancer Rates: The choropleth map overlays breast cancer incidence rates by Health Reporting Area (HRA). This data comes from the Washington State Cancer Registry and reflects reported cases from 2020, the most recent year with comprehensive, neighborhood-level data available.
                  Social Determinants of Health: When you hover over each neighborhood/HRA, the map displays information including:
                    Median household income
                    Racial and ethnic demographic composition
                    Health insurance coverage rates
                  These indicators are drawn from the U.S. Census Bureau’s 2020 American Community Survey (ACS). Though not fully up-to-date, 2020 is the latest year with consistent data available across both cancer incidence and socioeconomic indicators.
                  Together, these datasets offer a snapshot of how health outcomes and community-level social factors intersect across King County neighborhoods. This project aims to help users explore potential patterns and disparities in cancer outcomes through an equity-informed lens.
                </p>
                </div>
                </div>
              </div>
            </div>
            </section>

    </motion.div> )
}


function TeamIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  const teamMembers = [
    {
      name: "Benjamin Po",
      role: "Frontend / Backend Dev",
      photo: "images/benny.jpg",
    },
    {
      name: "Noah Karst",
      role: "UI/UX Designer & GIS",
      photo: "images/noah.JPG",
    },
    {
      name: "Halle Hwang",
      role: "Frontend Dev",
      photo: "images/halle.png",
    },
    {
      name: "Dahira Abukar",
      role: "PM & UI/UX",
      photo: "images/dahira.jpeg",
    },
    {
      name: "Caleb Lee",
      role: "Backend Dev",
      photo: "images/caleb.JPG",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="w-full max-w-5xl mx-auto text-left px-8">
          <h2 className="text-4xl font-semibold mb-4">The Team Behind the Project</h2>
          <p className="text-xl mb-8">University of Washington Winter and Spring 2025 Capstone</p>
          <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card text-center p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="rounded-full w-40 h-40 mx-auto mb-6 object-cover"
                />
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="flex overflow-hidden flex-wrap gap-4 items-start px-8 pt-8 pb-1 w-full text-base leading-snug text-black bg-white border-t border-zinc-300 min-h-[142px] max-md:px-5 max-md:max-w-full font-inter">
      <div className="flex flex-col items-start w-full max-w-[320px]">
        <div className="flex flex-col self-stretch pb-4 w-full font-semibold">
          <h3 className="text-left w-full">Contact Us</h3>
        </div>
        <div className="flex flex-col items-start">
          <a href="mailto:someemail@uw.edu" className="text-left mt-3 text-black hover:text-gray-600">
            someemail@uw.edu
          </a>
        </div>
      </div>
    </footer>
  );
}

function About() {
  return (
    <div className="font-inter min-h-screen">
      <Navbar />
      <Hero />
      <Mission />
      <AboutData />
      <TeamIntro />
      <Footer />
    </div>
  );
}
export default About;