import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';


function SubCard({ title, description, link, phone }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
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
