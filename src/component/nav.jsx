import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCarts } from "../api/Carts";
import { getWishlists } from "../api/Wishlists";
import { getUser } from "../api/User";

function Nav() {
  const pathname = useLocation().pathname;
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartsResponse = await getCarts();
        const wishlistsResponse = await getWishlists();
        const userResponse = await getUser(id);
        setCart(cartsResponse.filter((product) => product.user_id === +id));
        setWishlist(
          wishlistsResponse.filter((product) => product.user_id === +id)
        );
        setUser(userResponse);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 md:py-6">
      <h4 className="font-bold text-lg md:text-xl">Exclusive</h4>

      <ul className="flex justify-around md:justify-start mt-4 md:mt-0 space-x-4">
        <li>
          <Link
            to="/"
            className={`text-black hover:text-black-700 underline ${
              pathname === "/" ? "underline" : "no-underline"
            }`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`text-black hover:text-black-700 ${
              pathname === "/contact" ? "underline" : "no-underline"
            }`}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`text-black hover:text-black-700 ${
              pathname === "/about" ? "underline" : "no-underline"
            }`}
          >
            À propos
          </Link>
        </li>
        <li>
          <Link
            to="/sign-up"
            className={`text-black hover:text-black-700 ${
              pathname === "/sign-up" ? "underline" : "no-underline"
            }`}
          >
            S'inscrire
          </Link>
        </li>
      </ul>
      <div className="flex items-center mt-4 md:mt-0">
        <div className="relative mr-4">
          <input
            className="bg-color w-full px-3 py-2 placeholder-gray-600 rounded-md text-sm focus:bg-white text-black"
            placeholder="Que recherchez-vous ?"
          />
          <i className="bi bi-search absolute top-1/2 right-1 transform -translate-y-1/2"></i>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          <Link to="/wishlist" className="text-black">
            <i className="bi bi-heart text-lg "></i>
            <span className="text-xs px-1 text-white bg-red-500 rounded-full">
              {wishlist.length}
            </span>
          </Link>
          <Link to="/cart" className="text-black">
            <i className="bi bi-cart3 text-lg"></i>
            <span className="text-xs px-1 text-white bg-red-500 rounded-full">
              {cart.length}
            </span>
          </Link>
          {id ? (
            <button
              onClick={() => {
                localStorage.removeItem("user_id");
              }}
            >
              Déconnexion
            </button>
          ) : (
            <Link to={'log-in'}>Connexion</Link>
          )}
          <Link to={`/account`} className="text-black relative">
            <i className="bi bi-person text-xl"></i>
            <span className="text-xs px-1 text-white bg-red-500 rounded absolute">
              {user.name}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
