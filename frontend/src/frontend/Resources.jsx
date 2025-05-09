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
        "https://image.similarpng.com/file/similarpng/very-thumbnail/2021/06/Law-labels-icon-on-transparent-PNG.png",
       link: "https://nohla.org/"
      },
    {
      title: "Join a Petition",
      subtitle:
        "Your voice matters! Take action today by signing a petition or reaching out to lawmakers who can make a real impact on healthcare policies in King County.",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/d0ba8ab5a038951222491353476cb11956d5845c54d7e5154081267e8eacb89a?apiKey=8b5f020b1697482bb283efed7adbe58e&",
      link: "https://www.fightcancer.org/states/national/actions" 
      },
    {
      title: "Find Local Support Groups",
      subtitle:
      "Find resources to help you and your loved ones manage your lives through treatment and recovery, and get the emotional support you need.",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/c97e7617cb59e34375e57b99f861e7505a7745ee8954dacf0a58d71bc1453109?apiKey=8b5f020b1697482bb283efed7adbe58e&",
      link: "https://www.cancer.org/support-programs-and-services/resource-search.html"
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
                title: "Fred Hutchinson Cancer Center",
                description: "Offering affordable cancer screening and treatment options.",
                link: "https://www.fredhutch.org/en/patient-care/request-appointment.html",
                phone: "1-855-557-0555"
              },
              {
                title: "Washington Breast & Cervical Health Program",
                description: "Free screenings for uninsured/underinsured individuals",
                link: "https://www.swedish.org/services/mammography",
                phone: "206-215-8100"
              },
            ]
          },
        {
          title: "Financial Assistance and Insurance Information",
          description:
            "Worried about healthcare costs? Explore resources like Medicaid, charity care programs, and patient assistance funds.",
            subCards: [
              {
                title: "Premium Payment Program",
                description: "Helps Medicaid patients pay for private/employer/COBRA/Medicare premiums",
                link: "https://www.hca.wa.gov/free-or-low-cost-health-care/i-help-others-apply-and-access-apple-health/premium-payment-program",
                phone: "800-562-3022"
              },
              {
                title: "Co-Pay Relief Program",
                description: "Helps cover cancer treatment copays",
                link: "https://copays.org/patients-family/",
                phone: "1-866-512-3861"
              },
              {
                title: "Neighborhood Legal Clinics",
                description: "Free legal help for low-income King County residents (civil cases)                ",
                link: "https://www.kcba.org/?pg=Neighborhood-Legal-Clinics",
                phone: "206-267-7070"
              },
            ]
        },
      ],
    },
    {
          title: "Studies and Articles",
          sections: [
            {
              title: "Lung Cancer Preventative Care in AI/AN Community",
              description:
              "Understanding determinants of lung cancer preventive care in at-risk urban American Indians and Alaska Natives: A mixed-methods study",
              link: "https://www.sciencedirect.com/science/article/pii/S2211335524002377",
            },
            {
              title: "Cancer Prevention and Mental Health of College Students",
              description:
              "The impact of cancer prevention education on the mental health of college students based on the difference-in-differences method",
              link: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2024.1446225/full",
            },
          ],
        },
  ];
  

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
        <div className="w-full max-w-[90%] mx-auto bg-[#b8ccc7] rounded-2xl px-8 py-10 shadow-md flex flex-col items-center gap-6">
    {/* <div className="max-w-7xl mx-auto"> */}
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
    {/* </div> */}
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
