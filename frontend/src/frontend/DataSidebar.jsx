import React from 'react';

const communityData = [
  { name: 'Ravenna', value: 185 },
  { name: 'Laurelhurst', value: 185 },
  { name: 'Magnolia', value: 185 },
  { name: 'Harrison/Denny-Blaine', value: 185 },
  { name: 'SODO', value: 185 },
  { name: 'Rainier Beach', value: 185 },
  { name: 'Industrial District', value: 185 },
  { name: 'Lower Queen Anne', value: 185 }
];

function DataSidebar() {
  return (
    <div className="flex flex-col grow shrink rounded-none min-w-[240px] w-[381px] max-md:max-w-full">
      <div className="flex gap-4 pt-11 pr-1.5 pb-2.5 pl-6 border border-black border-solid bg-zinc-100 max-md:pl-5">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="flex flex-col pr-7 pl-1.5 w-full leading-tight text-black max-md:pr-5 max-md:max-w-full">
            <div className="self-start text-xl font-semibold tracking-tight">
              % with Breast Cancer
            </div>
            <div className="flex self-end p-px mt-2 max-w-full text-base tracking-tight whitespace-nowrap bg-white rounded-xl border border-black border-solid w-[362px]">
              <div className="px-1.5 pt-1 pb-2.5 bg-white rounded-xl max-md:pr-5">
                0%
              </div>
              <div className="flex shrink-0 h-6 bg-gray-300 w-[89px]" />
              <div className="flex shrink-0 h-6 bg-slate-400 w-[91px]" />
              <div className="px-9 pt-1 pb-2.5 bg-blue-400 rounded-none max-md:pl-5">
                13%
              </div>
            </div>
          </div>
          <div className="shrink-0 mt-3.5 h-px border border-solid border-black border-opacity-10 max-md:max-w-full" />
          <div className="self-start mt-20 text-base tracking-tight leading-tight text-black max-md:mt-10">
            Community Reporting Area
          </div>
          <div className="shrink-0 mt-1 h-px border border-black border-solid max-md:max-w-full" />
          {communityData.map((community, index) => (
            <div key={index} className="flex gap-5 justify-between px-4 py-3.5 mt-2.5 w-full bg-zinc-300 bg-opacity-40 max-md:max-w-full">
              <div className="px-2.5 pt-1 pb-3 text-sm tracking-tight leading-tight text-black whitespace-nowrap bg-zinc-300 bg-opacity-80">
                {community.name}
              </div>
              <div className="flex gap-4">
                <div className="flex shrink-0 bg-blue-400 border border-black border-solid h-[25px] w-[185px]" />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/8b5f020b1697482bb283efed7adbe58e/0280a951b82f3b419c1eed3273b5ad0c51c5b9ecaa92113bf2108a3a42d4b03b?apiKey=8b5f020b1697482bb283efed7adbe58e&"
                  alt=""
                  className="object-contain shrink-0 my-auto aspect-[1.9] w-[19px]"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 my-auto w-1.5 rounded-md bg-stone-300 h-[108px]" />
      </div>
    </div>
  );
}

export default DataSidebar;