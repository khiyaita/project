import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProduct } from "../../Admin/api/Products";
import { addToWishlist, getWishlists, removeFromWishlist } from "../../Admin/api/Wishlists";

const ProductList = ({ id, imageSrc, title, price, discount, isNew }) => {
  const [wishlist, setWishlist] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct(id);
        const responseW = await getWishlists();
        setWishlist(responseW);
        setProduct(response);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    fetchData();
  }, []);

  const handleWishlistClick = (e, product) => {
    e.preventDefault();

    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  return (
    <Link to={`/productDetails/${id}`}>
      <div
        key={id}
        className="shadow-lg rounded-lg overflow-hidden w-64 mx-2 relative"
      >
        <div className="relative  flex justify-center">
          <img
            className="h-56 object-cover object-center bg-gray-50"
            src={imageSrc[3]}
            alt={title}
          />
          {discount !== 0.00 && (
            <div className="bg-red-500 w-12 h-6 absolute top-4 left-3 text-white rounded text-sm text-center">
              -{discount}%
            </div>
          )}
          {isNew && (
            <div className="bg-green-500 w-12 h-6 absolute top-4 left-3 text-white rounded text-sm text-center">
              NOUVEAU
            </div>
          )}
        </div>
        <div className="flex flex-col absolute top-4 right-4">
          <div className="bg-white border rounded-full p-1 mb-2">
            {wishlist.some((item) => item.id === product.id) ? (
              <button onClick={(e) => handleWishlistClick(e, product)}>
                <i className="bi bi-heart-fill px-1 text-black"></i>
              </button>
            ) : (
              <button onClick={(e) => handleWishlistClick(e, product)}>
                <i className="bi bi-heart px-1 text-black"></i>
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">{title}</h2>
          <div className="text-sm mt-2 text-gray-600">
            <span className="text-red-500">${price}</span>
            {discount && (
              <s className="ml-1">${price + price * (discount / 100)}</s>
            )}
          </div>
          <div className="text-sm mt-2 text-gray-600">
            <div className="flex">
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    className={`bi ${
                      product.rating >= i
                        ? "bi-star-fill text-yellow-400"
                        : product.rating >= i - 0.5
                        ? "bi-star-half text-yellow-400"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
              </>{" "}
              ({(product.rating * 100).toFixed(0)}%){" "}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
