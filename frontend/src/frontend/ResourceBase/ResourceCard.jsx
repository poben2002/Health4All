import React from "react";

function ResourceCard({ title, image, alt, description, icon }) {
  return (
    <div className="flex absolute z-0 max-w-full rounded-xl bg-white bg-opacity-60 bottom-[331px] h-[497px] left-[78px] min-h-[497px] w-[413px]">
      {image && (
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="object-contain absolute z-0 max-w-full rounded-xl aspect-[1.26] h-[519px] left-[79px] top-[338px] w-[654px]"
        />
      )}
      {title && (
        <div className="absolute left-20 z-0 h-12 text-2xl font-semibold tracking-tight leading-7 top-[290px] w-[212px]">
          {title}
        </div>
      )}
      {description && (
        <div className="absolute z-0 h-[42px] right-[119px] top-[397px] w-[616px] max-md:max-w-full">
          {description}
        </div>
      )}
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain absolute z-0 aspect-[1.16] h-[43px] right-[685px] top-[533px] w-[50px]"
        />
      )}
    </div>
  );
}

export default ResourceCard;