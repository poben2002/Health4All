import React from "react";
import DataMap from './DataMap';
import DataSidebar from './DataSidebar';
import Navbar from './Navbar';
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat font-inter"
      style={{
        backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/6dbd5e49b7ba35a3f444e71ab032b6917712e69008fc6c72291c658fcb0b995c?apiKey=8b5f020b1697482bb283efed7adbe58e&')",
        backgroundSize: "cover",   // Ensure the image covers the whole section without stretching
        backgroundPosition: 'center',  // Centers the background image
        margin: 0,                  // Removes default margin
        padding: 0,                 // Removes default padding
      }}
    >
      <div className="flex flex-col text-center max-w-3xl px-4">
        <h1 className="text-6xl font-bold tracking-tighter leading-tight max-md:text-4xl">
          Social Determinants and Breast Cancer in Seattle
        </h1>
        <p className="mt-6 text-2xl font-light leading-10">
          Explore how race, income, education, and other social factors
          intersect with breast cancer data across Seattle's neighborhoods with our interactive map.
        </p>
        <div className="mt-10">
          <Link to="/Map" className={`inline-block px-6 py-3 text-xl font-medium bg-gray-200 text-black rounded-xl shadow-md`}>
            Start Exploring
          </Link>
          <Link to="/Resources" className={`inline-block m-2 px-6 py-3 text-xl font-medium bg-gray-200 text-black rounded-xl shadow-md`}>
            More Information
          </Link>
        </div>
      </div>
    </section>
  );
}

function DataExplanation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("coming into view")
      controls.start({opacity : 1, y : 0, transition: { duration : 0.8 }});
    } else {
      console.log("leaving view")
      controls.start({opacity: 0, y: 50, transition: { duration: 0.8 }});
    }
  }, [isInView, controls])
  return (
    <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={controls}
    className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="flex flex-wrap gap-16 items-center w-full">
          <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
              <div className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">
                  Why This Data Matters
                </h2>
                <p className="mt-2 text-xl text-left mb-2">
                  Social factors—like income, race, and access to education—have
                  a profound impact on health outcomes. This project uses data
                  from Seattle's communities to explore how these factors might
                  influence cancer rates and outcomes. By visualizing this data,
                  we aim to spark conversations and inform decisions that can
                  lead to healthier, more equitable communities.
                  <br /><br />
                  As you scroll down, you'll find an interactive map that allows
                  you to dive deep into the data for each Seattle neighborhood.
                  You can examine how cancer rates compare with factors like
                  income, education, and race in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function MapPreview() {
  return (
    <section className="bg-white py-16 text-center px-4">
      <h2 className="text-4xl font-semibold mb-4">See the Map in Action</h2>
      <p className="mb-6 text-xl text-gray-700">
        Here’s a glimpse of our interactive map exploring health equity in King County.
      </p>
      <a>
        <img 
          src="/images/map-preview.png" 
          alt="Map preview" 
          className="mx-auto rounded-2xl shadow-xl max-w-4xl w-full hover:opacity-90 transition duration-300"
        />
      </a>
    </section>
  );
}

function ExploreData() {
  const ref = useRef(null);  // Reference to the ExploreData section
  const isInView = useInView(ref, { amount: 0.5 });  // Track visibility
  const controls = useAnimation();  // Animation controls

  useEffect(() => {
    if (isInView) {
      console.log("coming into view");
      controls.start({ opacity: 1, y: 0, transition: { duration: 1.0 } });
    } else {
      console.log("leaving view");
      controls.start({ opacity: 0, y: 50, transition: { duration: 1.0 } });
    }
  }, [isInView, controls]);
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}  // Start with opacity 0 and y offset
      animate={controls}  // Use animation controls
      className="flex flex-col items-center w-full text-black bg-white font-inter mt-[-10px]"
    >
      <h2 className="text-5xl font-semibold tracking-tighter leading-tight text-center mb-4 max-md:text-4xl">
        Explore The Data
      </h2>
      <div className="flex flex-wrap gap-4 items-start pr-8 pl-8 w-full min-h-[940px] max-md:px-5 max-md:max-w-full mb-8">
        <DataMap />
        <DataSidebar />
      </div>
    </motion.section>
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


function Home() {
  return (
    <div className="font-inter min-h-screen">
      <Navbar />
      <Hero />
      <DataExplanation />
      <MapPreview />
      <ExploreData />
      <Footer />
    </div>
  );
}

export default Home;
