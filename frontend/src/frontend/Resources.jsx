import React from "react";
import Navbar from "./Navbar";
import ResourceCard from "./ResourceBase/ResourceCard";
import InfoSection from "./ResourceBase/InfoSection";
import { motion } from "framer-motion";


const ResourcesPage = () => {
  const resourceCards = [
    {
      title: "Contact Local Lawmakers",
      subtitle:
        "Connect with passionate organizations in King County that are working to improve healthcare equity and cancer awareness.",
        icon:
        "https://image.similarpng.com/file/similarpng/very-thumbnail/2021/06/Law-labels-icon-on-transparent-PNG.png"
   },
    {
      title: "Join a Petition",
      subtitle:
        "Your voice matters! Take action today by signing a petition or reaching out to lawmakers who can make a real impact on healthcare policies in King County.",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/d0ba8ab5a038951222491353476cb11956d5845c54d7e5154081267e8eacb89a?apiKey=8b5f020b1697482bb283efed7adbe58e&",
    },
    {
      title: "Find Local Advocacy Groups",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/c97e7617cb59e34375e57b99f861e7505a7745ee8954dacf0a58d71bc1453109?apiKey=8b5f020b1697482bb283efed7adbe58e&",
    },
  ];

  const infoSections = [
    {
      title: "Healthcare Access and Support",
      sections: [
        {
          title: "Appointments",
          description:
            "Make an appointment for a cancer screening or regular check up at a clinic near you. Free and low cost options available.",
            subCards: [
              {
                title: "Resource",
                description: "info",
              },
              {
                title: "Resource",
                description: "info",
              },
              {
                title: "Resource",
                description: "info",
              },
            ],
          },
        {
          title: "Financial Assistance and Insurance Information",
          description:
            "Worried about healthcare costs? Explore resources like Medicaid, charity care programs, and patient assistance funds.",
          subCards: [
            {
              title: "Resource",
              description: "info",
            },
            {
              title: "Resource",
              description: "info",
            },
            {
              title: "Resource",
              description: "info",
            },
          ],
        },
      ],
    },
    {
          title: "Education",
          sections: [
            {
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
            {
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ],
        },
  ];
  

  // const infoSections = [
  //   {
  //     title: "Healthcare Access and Support",
  //     sections: [
  //       {
  //         title: "Appointments",
  //         description:
  //           "Make an appointment for a cancer screening or regular check up at a clinic near you. Free and low cost options available.",
  //       },
  //       {
  //         title: "Financial Assistance and Insurance Information",
  //         description:
  //           "Worried about healthcare costs? Explore resources like Medicaid, charity care programs, and patient assistance funds that can help make screenings, treatments, and medications more affordable.",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Education",
  //     sections: [
  //       {
  //         description:
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //       },
  //       {
  //         description:
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //       },
  //     ],
  //   },
  // ];

  return (
    <section>
      <Navbar />
      <div className="flex flex-col items-start text-sm leading-5 text-black"
      // style={{ backgroundColor: "#d6eefe" }}
       >
        <div className="w-full text-center text-7xl font-semibold tracking-tighter pt-40 pb-2">
          Resources
        </div>
        <div className="w-full text-center text-xl font-semibold tracking-tighter pb-2 pb-40">
          <p>
          Explore opportunities, take action, and find the support you need—all in one place
          </p>
        </div>
        <div className="w-full max-w-[90%] mx-auto bg-[#b8ccc7] rounded-2xl px-8 py-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="flex flex-wrap justify-center gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {resourceCards.map((card, index) => (
          <ResourceCard key={index} {...card} />
        ))}
      </motion.div>
    </div>
  </div>

        {/* <div className="flex w-full p-8 gap-8 flex-wrap justify-center">
          <motion.div
            className="flex flex-wrap gap-8 justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {resourceCards.map((card, index) => (
              <ResourceCard key={index} {...card} />
            ))}
          </motion.div>
        </div> */}
        {/* <InfoSection /> */}
        {infoSections.map((section, index) => (
  <InfoSection
    key={index}
    title={section.title}
    sections={section.sections}
  />
))}

      </div>
    </section>
  );
};


export default ResourcesPage;
