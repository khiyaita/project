import React from "react";

const CategoryButton = ({ icon, text }) => {
  return (
    <div className="rounded shadow border-gray-100 hover:bg-red-500 hover:text-white justify-center w-[150px] h-[125px] items-center flex flex-col">
      <i className={`bi ${icon}`}></i>
      <p className="text-base mt-2">{text}</p>
    </div>
  );
};
export default CategoryButton;
