import React from "react";

function InfoSection({ title, items }) {
  return (
    <div className="flex absolute z-0 max-w-full h-52 rounded-xl bg-slate-400 min-h-[208px] right-[103px] top-[1113px] w-[653px]">
      <div className="absolute z-0 text-2xl font-semibold tracking-tight leading-7 text-black h-[61px] left-[79px] top-[1061px] w-[770px] max-md:max-w-full">
        {title}
      </div>
      {items.map((item, index) => (
        <div key={index} className="absolute z-0 h-11 text-base leading-6 text-black left-[125px] top-[1182px] w-[490px] max-md:max-w-full">
          {item.title && (
            <div className="absolute z-0 h-6 text-xl leading-tight text-black left-[125px] top-[1147px] w-[140px]">
              {item.title}
            </div>
          )}
          <div className="absolute right-36 z-0 text-base leading-6 text-black h-[66px] top-[1178px] w-[579px] max-md:max-w-full">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoSection;