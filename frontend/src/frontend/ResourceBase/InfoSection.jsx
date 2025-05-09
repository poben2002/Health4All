// import React, { useRef, useEffect } from 'react';
// import { motion, useAnimation, useInView  } from 'framer-motion';


// function InfoSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { amount: 0.5 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       console.log("coming into view");
//       controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
//     } else {
//       console.log("leaving view");
//       controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
//     }
//   }, [isInView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       className="w-full min-h-screen"
//     >
//       <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
//         <div className="flex flex-wrap gap-16 items-center w-full">
//           <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
//             <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
//               <div className="flex flex-col w-full">
//                 <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">
//                   Healthcare Access and Support
//                 </h2>
//                 <h3 className="text-2xl font-semibold text-left mt-8 mb-4 text-black">Appointments</h3>
//                 <p className="mt-2 text-xl text-left mb-2 text-black">
//                 Make an appointment for a cancer screening or regular check-up at a clinic near you. Free and low-cost options available.
//                 </p>
//                 <div className="mt-2">
//                   <button className="flex justify-start px-4 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition">
//                     Learn More
//                   </button>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-left mt-8 mb-4 text-black">Financial Assistance and Insurance Information</h3>

//                 <p className="mt-2 text-xl text-left mb-2 text-black">
//                 Worried about healthcare costs? Explore resources like Medicaid, charity care programs, and patient assistance funds that can help make screenings, treatments, and medications more affordable.
//                 </p>
//                 <div className="mt-2">
//                   <button className="flex justify-start px-4 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition">
//                     Learn More
//                   </button>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-left mt-8 mb-4 text-black">Education</h3>
//                 <p className="mt-2 text-xl text-left mb-2 text-black">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
//                   <br /><br />
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                 </p>
//                 <div className="mt-2">
//                   <button className="flex justify-start px-4 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// /*const InfoSection = ({ title, sections }) => {
//   return (
//     <div className="flex flex-col gap-4 w-500 h-auto rounded-xl bg-slate-400 p-6 pb-10">
//       <div className="text-2xl font-semibold tracking-tight leading-7 text-black">
//         {title}
//       </div>
//       {sections.map((section, index) => (
//         <div key={index} className="mt-4">
//           {section.title && (
//             <div className="text-xl leading-tight text-black">
//               {section.title}
//             </div>
//           )}
//           <div className="text-base leading-6 text-black mt-2">
//             {section.description}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }; */

// export default InfoSection;

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';


function SubCard({ title, description, link, phone }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative"> {/* Parent container set as relative */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <h4 className="text-lg font-semibold mb-2 text-black">{title}</h4>
        <p className="text-sm text-black">{description}</p>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="mb-4">{description}</p>
          {phone && (
            <p className="mb-2">
              Phone: <a href={`tel:${phone}`} className="text-blue-600 underline">{phone}</a>
            </p>
          )}
          {link && (
            <p className="mb-2">
              Website: <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link}</a>
            </p>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}




function InfoSection({ title, sections }) {
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
      className="w-full py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-start font-semibold tracking-tight text-black mb-12">
          {title}
        </h2>
        {sections.map((section, idx) => (
  <div key={idx} className="mb-10 mt-5 text-left">
    {section.title && (
      <h3 className="text-2xl font-semibold mb-4 text-black">
        {section.title}
      </h3>
    )}
    <p className="text-xl text-black mb-4">{section.description}</p>
    {section.link && (
      <a
        href={section.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition"
      >
        Learn More
      </a>
    )}
    {section.subCards && (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {section.subCards.map((card, index) => (
          <SubCard key={index} {...card} />
        ))}
      </div>
    )}
  </div>
))}

      </div>
    </motion.div>
  );
}

export default InfoSection;
