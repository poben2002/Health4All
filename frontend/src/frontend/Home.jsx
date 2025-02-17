import React from "react";
import DataMap from './DataMap';
import DataSidebar from './DataSidebar';
import Navbar from './Navbar'

function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center items-center w-full h-screen bg-cover bg-center bg-no-repeat font-inter"
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
          Social Determinants and Cancer in Seattle
        </h1>
        <p className="mt-6 text-2xl font-light leading-10">
          Explore how race, income, education, and other social factors
          intersect with cancer data across Seattle's neighborhoods with our interactive map.
        </p>
        <div className="mt-10">
          <a href="#explore" className="inline-block px-6 py-3 text-xl font-medium bg-gray-200 text-black rounded-xl shadow-md">
            Start Exploring
          </a>
        </div>
      </div>
    </section>
  );
}

function DataExplanation() {
  return (
    <section className="flex flex-col justify-center p-16 w-full text-gray-700 bg-white max-md:px-5 max-md:max-w-full font-inter">
      <div className="flex flex-wrap gap-16 items-center w-full max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px] max-md:max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <h2 className="text-5xl font-semibold tracking-tighter leading-tight text-black text-center mb-8 max-md:text-4xl">
                Why This Data Matters
              </h2>
              <p className="mt-2 text-2xl leading-9 max-md:max-w-full">
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
  );
}


function ExploreData() {
  return (
    <section className="flex flex-col items-center w-full text-black bg-white font-inter">
      <h2 className="text-5xl font-semibold tracking-tighter leading-tight text-center mb-8 max-md:text-4xl">
        Explore The Data
      </h2>
      <div className="flex flex-wrap gap-4 items-start pr-16 pl-16 w-full min-h-[940px] max-md:px-5 max-md:max-w-full">
        <DataMap />
        <DataSidebar />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex overflow-hidden flex-wrap gap-4 items-start px-8 pt-8 pb-1 w-full text-base leading-snug text-black bg-white border-t border-zinc-300 min-h-[142px] max-md:px-5 max-md:max-w-full font-inter">
      <div className="flex flex-col items-start w-full max-w-[320px]">
        <div className="flex flex-col self-stretch pb-4 w-full font-semibold">
          <h3 className="w-full">Contact Us</h3>
        </div>
        <div className="flex flex-col items-start">
          <a href="mailto:someemail@uw.edu" className="left 40 mt-3 text-black hover:text-gray-600">
            someemail@uw.edu
          </a>
        </div>
      </div>
    </footer>
  );
}


function Home() {
  return (
    <div className="font-inter">
      <Navbar />
      <Hero />
      <DataExplanation />
      <ExploreData />
      <Footer />
    </div>
  );
}

export default Home;
