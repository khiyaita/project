import React from "react";

const Feature = ({ iconClass, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <i
        className={`bg-black text-white rounded-full border-8 border-gray-200 p-1 px-2 bi ${iconClass}`}
      ></i>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xs ">{description}</p>
    </div>
  );
};
export default Feature;
