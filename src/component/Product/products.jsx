import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProducts } from "../../api/Products";
import { getCategories } from "../../api/Categories";
import {
  addToWishlist,
  getWishlists,
  removeFromWishlist,
} from "../../api/Wishlists";
import { addToCarts } from "../../api/Carts";

const Products = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts();
        const categoriesResponse = await getCategories();
        const wishlistsResponse = await getWishlists();
        setProducts(productsResponse);
        setCategories(categoriesResponse);
        setWishlists(wishlistsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  const addToCart = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await addToCarts({
        user_id: 2,
        product_id: productId,
        quantity: 1,
      });
      console.log("Added to cart:", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
    <div className="container my-4 mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="flex justify-center md:justify-start mt-2 md:mt-0 space-x-4">
        <li>
          <Link
            to={`/products/all`}
            className={`text-black hover:text-black-700 ${
              category === "all" ? "underline" : "no-underline"
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/products/${cat.name}`}
              className={`text-black hover:text-black-700 ${
                category === cat.name ? "underline" : "no-underline"
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {products
          .filter(
            (product) => category === "all" || product.category === category
          )
          .map((product) => (
            <div
              key={product.id}
              className="shadow-lg rounded-lg overflow-hidden relative border border-gray-200"
            >
              <Link to={`/productDetails/${product.id}`} className="block">
                <div className="relative flex justify-center">
                  <img
                    className="h-56 object-cover object-center bg-gray-50"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  {product.rating && (
                    <div className="bg-red-500 w-12 h-6 absolute top-4 left-3 text-white rounded text-sm text-center">
                      -{Math.round(product.rating * 10)}%
                      {/* -{product.discountPercentage}% */}
                    </div>
                  )}
                  <div className="flex flex-col absolute top-4 right-4">
                    <div className="bg-white border rounded-full p-1 mb-2">
                      {wishlist.some((item) => item.id === product.id) ? (
                        <button
                          onClick={(e) => handleWishlistClick(e, product)}
                        >
                          <i className="bi bi-heart-fill px-1 text-black"></i>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleWishlistClick(e, product)}
                        >
                          <i className="bi bi-heart px-1 text-black"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full bg-gray-900 py-1 text-white text-center">
                    <button
                      className="text-white bg-black px-4 py-1 rounded"
                      onClick={(e) => {
                        addToCart(e, product.id);
                      }}
                    >
                      <i className="mr-2 bi bi-cart3"></i>Add to cart
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <div className="text-sm mt-2 text-gray-600">
                    <span className="text-red-500">${product.price} </span>
                    <s>${product.price + 90}</s>
                  </div>
                  <div className="text-sm mt-2 text-gray-600">
                    <div className="flex">
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
                      ))}{" "}
                      ({(product.rating * 100).toFixed(0)})
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
