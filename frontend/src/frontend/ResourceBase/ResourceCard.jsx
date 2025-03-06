import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const ResourceCard = ({ title, description, icon }) => {
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

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      className="flex flex-col p-6 rounded-xl bg-white bg-opacity-60 shadow-lg h-[260px]"
    >
      <div className="text-3xl font-semibold tracking-tight leading-7">
        {title}
      </div>
      {description && (
        <div className="mt-2 text-gray-700 text-lg">
          {description}
        </div>
      )}
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="w-12 h-12 mt-4"
        />
      )}
    </motion.div>
  );
};

export default ResourceCard;
