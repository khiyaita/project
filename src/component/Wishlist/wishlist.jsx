import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./card";
import ProductList from "./list";
import { useEffect, useState } from "react";
import { getWishlists } from "../../Admin/api/Wishlists";
import { getProducts } from "../../Admin/api/Products";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const navigate= useNavigate();
  if(user_id===null){
    navigate('/log-in')
  }
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
        setWishlist(
          filteredProducts
        );
        setProducts(response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  const ids = wishlist.map((product) => product.product_id);
  const categories = wishlist.map((product) => product.category);

  const relatedProducts = products.filter(
    (product) => categories.includes(product.category) && !ids.includes(product.id)
  );
  return (
    <>
      <div className="mx-4 md:mx-20 my-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">Ma liste de souhaits ({wishlist.length})</p>
          <button className="text-sm border border-gray-700 rounded p-1">
            <span className="mx-4">Déplacer tous dans le panier</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly md:mt-5 md:mb-5">
          {wishlist ? (
            wishlist.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.images}
                  name={product.title}
                  price={product.price - 10}
                  originalPrice={product.price}
                  discount={product.discountPercentage}
                />
              );
            })
          ) : (
            <h1> Aucun article</h1>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-5">
          <div className="flex items-center justify-start my-2">
            <div className="rounded w-4 h-8 bg-red-500 "></div>
            <p className="text-lg ml-3">Juste pour vous</p>
          </div>
          <button className="text-sm border border-gray-700 rounded p-1">
            <Link to={`/products/all`} className="mx-4 text-black">
              Voir tous
            </Link>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 md:flex-row j mt-5 mb-5">
          {relatedProducts.map((product) => (
            <ProductList
              key={product.id}
              id={product.id}
              imageSrc={product.images}
              discount={product.discountPercentage}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Wishlist;
