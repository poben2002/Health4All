import React from "react";

const ResourceCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col p-6 rounded-xl bg-white bg-opacity-60 shadow-lg">
      <div className="text-2xl font-semibold tracking-tight leading-7">
        {title}
      </div>
      {description && (
        <div className="mt-2 text-gray-700">
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