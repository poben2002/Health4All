import React from "react";
import { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import ResourceCard from "./ResourceBase/ResourceCard";
import InfoSection from "./ResourceBase/InfoSection";
import { motion, useInView, useAnimation } from "framer-motion";

function Hero() {
  return (
    <section className="w-full">
      <div
        className="relative flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat font-inter"
        style={{
          backgroundImage:
            'url("https://t4.ftcdn.net/jpg/02/86/41/49/360_F_286414909_WMqfFJGRJaIdfC5lHjfprGXFl2dzT0gq.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-white opacity-30" />

        <div className="relative z-10 flex flex-col w-full text-center px-4">
          <h1 className="text-7xl font-bold tracking-tighter text-black leading-tight">
            Resources
          </h1>
          <p className="w-full text-center text-xl text-black font-semibold tracking-tighter z-20">
            Explore opportunities, take action, and find the support you need—all in one place
          </p>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
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

  const resourceCards = [
    {
      title: "Contact Local Lawmakers",
      subtitle:
        "Connect with passionate organizations in King County that are working to improve healthcare equity and cancer awareness.",
      icon:
        "https://cdn-icons-png.flaticon.com/512/7847/7847753.png",
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="p-16 w-full font-inter">
        <h2 className="text-4xl font-semibold tracking-tighter text-left text-black mb-8">Community Resources</h2>
        <p className="text-xl text-left mb-8">
          Get involved, advocate for healthcare equity, and find support networks to help navigate health challenges.
        </p>
        
        <div className="bg-[#b8ccc7] rounded-2xl px-8 py-10 shadow-md">
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
      </section>
    </motion.div>
  );
}

function HealthcareSection() {
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

  const healthcareSections = {
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
            description: "Free legal help for low-income King County residents (civil cases)",
            link: "https://www.kcba.org/?pg=Neighborhood-Legal-Clinics",
            phone: "206-267-7070"
          },
        ]
      },
    ],
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full"
    >
      <section className="p-16 max-md:px-5 font-inter">
        <InfoSection
          title={healthcareSections.title}
          sections={healthcareSections.sections}
        />
      </section>
    </motion.div>
  );
}

function StudiesSection() {
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

  const studiesSections = {
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
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full"
    >
      <section className="p-16 max-md:px-5 font-inter">
        <InfoSection
          title={studiesSections.title}
          sections={studiesSections.sections}
        />
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

function ResourcesPage() {
  return (
    <div className="font-inter">
      <Navbar />
      <Hero />
      <ResourcesSection />
      <HealthcareSection />
      <StudiesSection />
      <Footer />
    </div>
  );
}

export default ResourcesPage;