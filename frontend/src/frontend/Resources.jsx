import React from "react";
import { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import ResourceCard from "./ResourceBase/ResourceCard";
import InfoSection from "./ResourceBase/InfoSection";
import { motion, useInView, useAnimation } from "framer-motion";

function Hero() {
  return (
    <section className>
      <div
        className="relative flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat font-inter"
        style={{
          backgroundImage:
            'url("https://t4.ftcdn.net/jpg/02/86/41/49/360_F_286414909_WMqfFJGRJaIdfC5lHjfprGXFl2dzT0gq.jpg")',
          backgroundSize: "cover",
          }}
      >
        <div className="absolute inset-0 bg-white opacity-30" />

        <div className="relative z-10 flex flex-col text-center max-w-3xl px-4">
          <h1 className="text-7xl font-bold tracking-tighter text-black leading-tight">
            Resources
          </h1>
          <p className="mt-6 text-2xl font-light tracking-tighter" style={{ color: 'black' }}>
            <span className="text-black">Explore opportunities, take action, and find the support you need—all in one place</span>
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
        "Connect with passionate organizations in Washington that are working to improve healthcare equity and cancer awareness.",
      icon:
        "https://cdn-icons-png.flaticon.com/512/7847/7847753.png",
      link: "https://nohla.org/"
    },
    {
      title: "Join a Petition",
      subtitle:
        "Your voice matters! Take action today by signing a petition or reaching out to lawmakers who can make a real impact on healthcare policies.",
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
      className="max-w-full"
    >
      <section className="px-4 py-12 md:p-16 w-full font-inter">
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
    title: "Studies and Education",
    sections: [
      {
        title: "National Breast Cancer Foundation",
        description:
        "NBCF's mission is to help women by providing help and inspiring hope to those affected by breast cancer. Provides educational articles and support services",
        link: "https://www.nationalbreastcancer.org",
      },
      {
        title: "National Cancer Institute: Breast Cancer",
        description:
        "Information on breast cancer screening, treatment, causes and prevention, and more.",
        link: "https://www.cancer.gov/types/breast",
      },
    ],
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="max-w-full"
    >
      <section className="p-16 font-inter w-full">
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
      <div className="flex flex-col items-start w-full ">
        <div className="flex flex-col self-stretch pb-4 w-full font-semibold">
          <h3 className="text-left w-full">Contact Us</h3>
        </div>
        <div className="flex flex-col items-start">
          <a href="mailto:halleee0415@gmail.com" className="text-left mt-3 text-black hover:text-gray-600">
            halleee0415@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function ResourcesPage() {
  return (
    <div className="font-inter w-full min-h-screen">
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