import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

function ResourceCard({ title, subtitle, icon, link }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  const content = (
    <div
      className="rounded-3xl p-6 w-full sm:w-[300px] h-[280px] flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-xl bg-white"
      style={{ backgroundColor: "#f2f7f6" }}
    >
      <div className="flex justify-center items-center">
        <img
          src={icon}
          alt=""
          className="w-24 h-24 transition-transform duration-300 hover:-translate-y-2 hover:rotate-1"
        />
      </div>
      <div className="mt-1">
        <p className="text-sm font-medium text-gray-800">Featured Resource</p>
        <h3 className="text-lg font-bold text-black leading-snug">
          {title}
        </h3>
        <p className="text-sm mt-1 text-gray-700">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}
export default ResourceCard;
