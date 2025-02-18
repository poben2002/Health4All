import React from "react";
import Navbar from "./Navbar";
import ResourceCard from "./ResourceBase/ResourceCard";
import InfoSection from "./ResourceBase/InfoSection";

const ResourcesPage = () => {
  const resourceCards = [
    {
      title: "Get Involved",
      image: "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/ad6ec1f06b2684c6c52d196bb755dd00e4a5795b14fa09c03764f9a581fe6e36?apiKey=8b5f020b1697482bb283efed7adbe58e&",
      alt: "Get Involved image"
    },
    {
      title: "Find Local Advocacy Groups",
      description: "Looking to make a difference? Connect with passionate organizations in King County that are working to improve healthcare equity and cancer awareness.",
    },
    {
      title: "Join a Petition. Contact Local Lawmakers.",
      description: "Your voice matters! Take action today by signing a petition or reaching out to lawmakers who can make a real impact on healthcare policies in King County. Whether it's pushing for improved healthcare access or increased funding for public health programs, every signature and message helps move the needle toward a healthier future for all.",
      icon: "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/d0ba8ab5a038951222491353476cb11956d5845c54d7e5154081267e8eacb89a?apiKey=8b5f020b1697482bb283efed7adbe58e&"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      icon: "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/c97e7617cb59e34375e57b99f861e7505a7745ee8954dacf0a58d71bc1453109?apiKey=8b5f020b1697482bb283efed7adbe58e&"
    }
  ];

  const infoSections = [
    {
      title: "Healthcare Access and Support",
      sections: [
        {
          title: "Appointments",
          description: "Make an appointment for a cancer screening or regular check up at a clinic near you. Free and low cost options available."
        },
        {
          title: "Financial Assistance and Insurance Information",
          description: "Worried about healthcare costs? Explore resources like Medicaid, charity care programs, and patient assistance funds that can help make screenings, treatments, and medications more affordable."
        }
      ]
    },
    {
      title: "Education",
      sections: [
        {
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-start text-sm leading-5 text-black bg-white">
      <Navbar />
      <div className="w-full text-center text-5xl font-semibold tracking-tighter py-8">
        Resources
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {resourceCards.map((card, index) => (
          <ResourceCard key={index} {...card} />
        ))}
      </div>
      {infoSections.map((section, index) => (
        <InfoSection key={index} {...section} />
      ))}
    </div>
  );
};

export default ResourcesPage;