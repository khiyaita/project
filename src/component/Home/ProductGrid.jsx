import React from "react";
import { Link } from "react-router-dom"; 

const ProductGrid = ({ title ,imageSrc ,category}) => {
  
  return (
    <div style={{backgroundImage:`url(${imageSrc})`, backgroundSize: 'cover'}} className="bg-black rounded text-gray-100 flex h-full flex-col justify-end px-10 p-6 relative">
  <div className="relative z-10">
    <h2 className="text-lg font-semibold">{category}</h2>
    <p className="text-sm my-4 ">{title}</p>
    <Link to={`products/${category}`} className="underline">
      Shop Now
    </Link>
  </div>
</div>

  );
};
export default ProductGrid;
