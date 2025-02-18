import React from "react";

const ResourceCard = ({ title, image, alt, description, icon }) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-xl bg-white bg-opacity-60 shadow-lg max-w-sm mx-auto my-4">
      {image && (
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <div className="text-2xl font-semibold tracking-tight leading-7 mt-4">
        {title}
      </div>
      {description && (
        <div className="text-center mt-2 text-gray-700">
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
    </div>
  );
};

export default ResourceCard;