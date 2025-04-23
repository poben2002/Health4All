import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// const ResourceCard = ({ title, description, icon }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { triggerOnce: true, threshold: 0.5 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
//     } else {
//       controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
//     }
//   }, [isInView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       animate={controls}
//       initial={{ opacity: 0, y: 50 }}
//       className="flex flex-col p-6 rounded-xl bg-white bg-opacity-60 shadow-lg h-[260px]"
//     >
//       <div className="text-3xl font-semibold tracking-tight leading-7">
//         {title}
//       </div>
//       {description && (
//         <div className="mt-2 text-gray-700 text-lg">
//           {description}
//         </div>
//       )}
//       {icon && (
//         <img
//         loading="lazy"
//         src={icon}
//         alt=""
//         className="w-12 h-12 mt-4 transform transition-transform duration-300 hover:scale-110"
//       />
      
//       )}
//     </motion.div>
//   );
// };

// export default ResourceCard;
function ResourceCard({ title, subtitle, icon, color}) {
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
      // className="flex flex-col p-6 rounded-xl bg-white bg-opacity-60 shadow-lg h-[260px]"
    >
    <div
      className={`rounded-3xl p-6 w-full sm:w-[300px] h-[280px] flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-xl bg-white`}
      style={{ backgroundColor: "#f2f7f6" }}
    >
      <div className="flex justify-center items-center">
        <img
          src={icon}
          alt=""
          className="w-24 h-24 transition-transform duration-300 hover:-translate-y-2 hover:rotate-1"
        />
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-800">Featured Resource</p>
        <h3 className="text-lg font-bold text-black leading-snug">
          {title}
        </h3>
        <p className="text-sm mt-1 text-gray-700">{subtitle}</p>
      </div>
    </div>
    </motion.div>
  );
}

export default ResourceCard;
