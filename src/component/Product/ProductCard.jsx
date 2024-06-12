import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist, getWishlists, removeFromWishlist } from "../../api/Wishlists";
import { getProduct, getProducts } from "../../api/Products";

function ProductCard({
  id,
  imageSrc,
  discount,
  productName,
  price,
  oldPrice,
  rating,
}) {
  const [wishlist, setWishlist] = useState([]);
  const product = getProduct(id);
  const user_id=localStorage.getItem('user_id')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        const responseW = await getWishlists();
        const userCartProductIds = responseW
          .filter((product) => product.user_id === +user_id)
          .map((product) => product.product_id);
        const filteredProducts = response.filter((product) =>
          userCartProductIds.includes(product.id)
        );
        setWishlist(filteredProducts);
      } catch (err) {
        console.error("Error fetching data:", err);
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
      <div className="shadow-lg rounded-lg overflow-hidden w-64 mx-2 relative">
        <div className="relative flex justify-around">
          <img
            className="h-56 object-cover object-center bg-gray-50"
            src={imageSrc}
            alt={productName}
          />
          {discount && (
            <div className="bg-red-500 w-12 h-6 absolute top-4 left-3 text-white rounded text-sm text-center">
              -{discount}%
            </div>
          )}
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
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            {productName}
          </h2>
          <div className="text-sm mt-2 text-gray-600">
            <span className="text-red-500">${price} </span>
            <s>${oldPrice}</s>
          </div>
          <div className="text-sm mt-2 text-gray-600">
            <div className="flex">
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    className={`bi ${
                      rating >= i
                        ? "bi-star-fill text-yellow-400"
                        : rating >= i - 0.5
                        ? "bi-star-half text-yellow-400"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
              </>{" "}
              {(rating * 100).toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
